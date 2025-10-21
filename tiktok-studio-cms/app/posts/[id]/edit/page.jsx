"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Sidebar from "../../../../components/layout/Sidebar"
import Header from "../../../../components/layout/Header"
import EditPostForm from "../../../../components/posts/EditPostForm"
import { getPostById } from "../../../../utils/mockData"

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const postData = getPostById(params.id)
    if (postData) {
      setPost(postData)
    } else {
      router.push("/posts")
    }
  }, [params.id, router])

  if (!post) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Đang tải...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <EditPostForm post={post} />
          </div>
        </main>
      </div>
    </div>
  )
}
