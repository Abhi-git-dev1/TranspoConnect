const Document = require('../models/Document');
const Notification = require('../models/Notification');
const Driver = require('../models/Driver');

// Upload documents
exports.uploadDocuments = async (req, res) => {
  try {
    const driverId = req.user.userId;
    const files = req.files || {};

    // Mock file URL generation (in production, use Cloudinary)
    const generateMockURL = (fieldName, fileName) => {
      return `https://api.transpoconnect.com/uploads/${driverId}/${fieldName}/${fileName}`;
    };

    let document = await Document.findOne({ driverId });

    if (!document) {
      document = new Document({ driverId });
    }

    // Update document URLs
    if (files.drivingLicense) {
      document.drivingLicenseURL = generateMockURL('license', files.drivingLicense[0].filename);
    }
    if (files.rc) {
      document.rcURL = generateMockURL('rc', files.rc[0].filename);
    }
    if (files.insurance) {
      document.insuranceURL = generateMockURL('insurance', files.insurance[0].filename);
    }
    if (files.aadhaar) {
      document.aadhaarURL = generateMockURL('aadhaar', files.aadhaar[0].filename);
    }
    if (files.profilePhoto) {
      document.profilePhotoURL = generateMockURL('photo', files.profilePhoto[0].filename);
    }

    document.verificationStatus = 'pending';
    await document.save();

    // Create notification
    await Notification.create({
      userId: driverId,
      userType: 'driver',
      title: 'Documents Submitted',
      message: 'Your documents have been submitted for verification. Please wait for admin approval.',
      type: 'document_verified',
      relatedId: document._id,
    });

    res.json({
      success: true,
      message: 'Documents uploaded successfully',
      document: {
        id: document._id,
        verificationStatus: document.verificationStatus,
        drivingLicenseURL: document.drivingLicenseURL,
        rcURL: document.rcURL,
        insuranceURL: document.insuranceURL,
        aadhaarURL: document.aadhaarURL,
        profilePhotoURL: document.profilePhotoURL,
      },
    });
  } catch (error) {
    console.error('Upload documents error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload documents' });
  }
};

// Get driver documents
exports.getDocuments = async (req, res) => {
  try {
    const driverId = req.user.userId;

    const document = await Document.findOne({ driverId });

    if (!document) {
      return res.status(404).json({ success: false, message: 'No documents found' });
    }

    res.json({
      success: true,
      document: {
        id: document._id,
        verificationStatus: document.verificationStatus,
        rejectionReason: document.rejectionReason,
        drivingLicenseURL: document.drivingLicenseURL,
        rcURL: document.rcURL,
        insuranceURL: document.insuranceURL,
        aadhaarURL: document.aadhaarURL,
        profilePhotoURL: document.profilePhotoURL,
        createdAt: document.createdAt,
        verifiedAt: document.verifiedAt,
      },
    });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch documents' });
  }
};

// Admin: Get pending documents
exports.getPendingDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ verificationStatus: 'pending' })
      .populate('driverId', 'name phoneNumber email vehicleType city')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      documents,
      count: documents.length,
    });
  } catch (error) {
    console.error('Get pending documents error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch documents' });
  }
};

// Admin: Approve document
exports.approveDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const adminId = req.user.userId;

    const document = await Document.findByIdAndUpdate(
      documentId,
      {
        verificationStatus: 'approved',
        verifiedAt: new Date(),
        verifiedBy: adminId,
      },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    // Update driver verification status
    await Driver.findByIdAndUpdate(document.driverId, {
      verificationStatus: 'approved',
    });

    // Create notification
    await Notification.create({
      userId: document.driverId,
      userType: 'driver',
      title: 'Documents Approved',
      message: 'Your documents have been approved! You can now accept rides.',
      type: 'document_verified',
      relatedId: document._id,
    });

    res.json({
      success: true,
      message: 'Document approved successfully',
      document,
    });
  } catch (error) {
    console.error('Approve document error:', error);
    res.status(500).json({ success: false, message: 'Failed to approve document' });
  }
};

// Admin: Reject document
exports.rejectDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { rejectionReason } = req.body;
    const adminId = req.user.userId;

    const document = await Document.findByIdAndUpdate(
      documentId,
      {
        verificationStatus: 'rejected',
        rejectionReason,
        verifiedAt: new Date(),
        verifiedBy: adminId,
      },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    // Create notification
    await Notification.create({
      userId: document.driverId,
      userType: 'driver',
      title: 'Documents Rejected',
      message: `Your documents have been rejected. Reason: ${rejectionReason}. Please resubmit.`,
      type: 'document_rejected',
      relatedId: document._id,
    });

    res.json({
      success: true,
      message: 'Document rejected successfully',
      document,
    });
  } catch (error) {
    console.error('Reject document error:', error);
    res.status(500).json({ success: false, message: 'Failed to reject document' });
  }
};
