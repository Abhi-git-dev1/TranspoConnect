'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function VerificationPage() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      driver: 'Raj Kumar',
      type: 'Driving License',
      number: 'DL-0001234',
      uploadDate: '2024-03-11',
      status: 'pending'
    },
    {
      id: 2,
      driver: 'Priya Singh',
      type: 'Vehicle Registration',
      number: 'KA-01-AB-1234',
      uploadDate: '2024-03-10',
      status: 'pending'
    },
    {
      id: 3,
      driver: 'Vikram Patel',
      type: 'Insurance Certificate',
      number: 'INS-789456',
      uploadDate: '2024-03-09',
      status: 'pending'
    },
    {
      id: 4,
      driver: 'Arjun Singh',
      type: 'Driving License',
      number: 'DL-0004567',
      uploadDate: '2024-03-08',
      status: 'pending'
    }
  ])

  const handleApprove = (id: number) => {
    setDocuments(prev => prev.filter(d => d.id !== id))
  }

  const handleReject = (id: number) => {
    setDocuments(prev => prev.filter(d => d.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Verification Queue</h1>
        <p className="text-gray-600">Review and approve/reject driver documents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Pending Documents</p>
            <p className="text-3xl font-bold text-yellow-600">{documents.length}</p>
            <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Avg. Review Time</p>
            <p className="text-3xl font-bold text-blue-600">4.2 hrs</p>
            <p className="text-xs text-gray-500 mt-1">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Approval Rate</p>
            <p className="text-3xl font-bold text-green-600">94%</p>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Document Queue */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="border-2 hover:border-red-300">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 pb-4 border-b">
                {/* Left Column */}
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Driver</p>
                    <p className="text-2xl font-bold text-gray-900">{doc.driver}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Document Type</p>
                      <p className="font-medium text-gray-900">{doc.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Number</p>
                      <p className="font-medium text-gray-900">{doc.number}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg h-full flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Document Preview</p>
                      <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded h-24 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-3xl">📄</p>
                          <p className="text-xs text-gray-600">View/Download</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Uploaded: {doc.uploadDate}</p>
                  </div>
                </div>
              </div>

              {/* Verification Notes */}
              <div className="mb-4 pb-4 border-b">
                <p className="text-sm text-gray-600 mb-2">Notes</p>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                  placeholder="Add verification notes or reasons for rejection..."
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => handleApprove(doc.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6 font-bold"
                >
                  ✓ Approve Document
                </Button>
                <Button
                  onClick={() => handleReject(doc.id)}
                  className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-50 py-6 font-bold"
                >
                  ✕ Reject & Request Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Processed Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Processed Documents Today</CardTitle>
          <CardDescription>Recently approved/rejected documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <p className="font-medium">Harjit Singh - Driving License</p>
              <p className="text-sm text-gray-600">Approved at 10:30 AM</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded">Approved</span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <p className="font-medium">Meera Sharma - Vehicle Reg</p>
              <p className="text-sm text-gray-600">Rejected at 9:15 AM</p>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded">Rejected</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Rohan Kumar - Insurance</p>
              <p className="text-sm text-gray-600">Approved at 8:45 AM</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded">Approved</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
