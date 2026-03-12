'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Driving License', status: 'approved', number: 'DL-0001234', expiry: '2025-12-31' },
    { id: 2, name: 'Vehicle Registration', status: 'approved', number: 'KA-01-AB-1234', expiry: '2024-06-30' },
    { id: 3, name: 'Insurance', status: 'pending', number: 'INS-789456', expiry: '2024-08-15' },
    { id: 4, name: 'PAN Card', status: 'approved', number: 'AAAPA1234A', expiry: 'N/A' }
  ])

  const [uploadModal, setUploadModal] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return '✓'
      case 'pending':
        return '⏳'
      case 'rejected':
        return '✗'
      default:
        return '?'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Verification</h1>
        <p className="text-gray-600">Upload and manage your verification documents</p>
      </div>

      {/* Verification Status Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Overall Status</p>
              <h3 className="text-2xl font-bold text-green-700">✓ Verified</h3>
              <p className="text-sm text-gray-600 mt-1">3 of 4 documents approved</p>
            </div>
            <div className="text-6xl">✓</div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📄</span>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-600">Number: {doc.number}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 ml-11">Expires: {doc.expiry}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-lg font-medium text-center ${getStatusColor(doc.status)}`}>
                    <div className="text-xl mb-1">{getStatusIcon(doc.status)}</div>
                    <div className="text-xs uppercase">{doc.status}</div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="border-2">View</Button>
                    {doc.status === 'pending' || doc.status === 'rejected' ? (
                      <Button
                        onClick={() => {
                          setSelectedDoc(doc.name)
                          setUploadModal(true)
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Re-upload
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Document */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Additional Documents</CardTitle>
          <CardDescription>Add any other required documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              setSelectedDoc('')
              setUploadModal(true)
            }}
            className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 py-6"
          >
            + Upload New Document
          </Button>
        </CardContent>
      </Card>

      {/* Upload Modal */}
      {uploadModal && (
        <Card className="border-2 border-red-600">
          <CardHeader className="bg-red-50">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Upload Document</CardTitle>
                <CardDescription>{selectedDoc || 'Select document type'}</CardDescription>
              </div>
              <button
                onClick={() => setUploadModal(false)}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {!selectedDoc && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                <select
                  defaultValue=""
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                >
                  <option value="">Select a document type</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Vehicle Registration">Vehicle Registration</option>
                  <option value="Insurance">Insurance</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Aadhar">Aadhar Card</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Number</label>
              <Input
                placeholder="Enter document number"
                className="py-2 border-2 border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-red-600">
                <p className="text-4xl mb-2">📎</p>
                <p className="font-medium text-gray-900">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-600">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Documents are verified within 24 hours. Ensure clear, unblurred photos.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setUploadModal(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
              >
                Upload Document
              </Button>
              <Button
                onClick={() => setUploadModal(false)}
                variant="outline"
                className="w-full border-2 py-6"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Document Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-gray-900 mb-1">Driving License</p>
            <p className="text-sm text-gray-600">Valid government-issued driving license (Front & Back)</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-1">Vehicle Registration</p>
            <p className="text-sm text-gray-600">Original vehicle registration certificate (Front & Back)</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-1">Insurance</p>
            <p className="text-sm text-gray-600">Current vehicle insurance policy document</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-1">PAN Card</p>
            <p className="text-sm text-gray-600">PAN card for tax identification (Front & Back)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
