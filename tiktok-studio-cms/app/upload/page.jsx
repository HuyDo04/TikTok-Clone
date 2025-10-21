"use client"
import Sidebar from "../../components/layout/Sidebar"
import Header from "../../components/layout/Header"
import UploadForm from "../../components/upload/UploadForm"

export default function UploadPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <UploadForm />
          </div>
        </main>
      </div>
    </div>
  )
}
