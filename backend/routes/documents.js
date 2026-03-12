const express = require('express');
const router = express.Router();
const multer = require('multer');
const documentController = require('../controllers/documentController');
const { authMiddleware } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// All document routes require authentication
router.use(authMiddleware);

// Driver routes
router.post(
  '/upload',
  upload.fields([
    { name: 'drivingLicense', maxCount: 1 },
    { name: 'rc', maxCount: 1 },
    { name: 'insurance', maxCount: 1 },
    { name: 'aadhaar', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 },
  ]),
  documentController.uploadDocuments
);
router.get('/', documentController.getDocuments);

// Admin routes
router.get('/pending', documentController.getPendingDocuments);
router.patch('/:documentId/approve', documentController.approveDocument);
router.patch('/:documentId/reject', documentController.rejectDocument);

module.exports = router;
