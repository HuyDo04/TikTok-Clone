"use client"

import { useState, useRef, useEffect } from "react"
import SceneLayout from "@/component/LiveStudio/SceneLayout"
import VideoPreview from "@/component/LiveStudio/VideoPreview"
import ToolsPanel from "@/component/LiveStudio/ToolsPanel"
import ChatPanel from "@/component/LiveStudio/ChatPanel"
import GoLiveButton from "@/component/LiveStudio/GoLiveButton"
import "@/assets/live-studio.css"

function LiveStudio() {
  const [isLive, setIsLive] = useState(false)
  const [stream, setStream] = useState(null)
  const videoRef = useRef(null)
  const [liveChat, setLiveChat] = useState([])

  const startLive = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }

      setStream(mediaStream)
      setIsLive(true)

      // Thêm comment mẫu khi bắt đầu live
      setLiveChat([{ id: 1, username: "Người xem 1", message: "Chào bạn!", timestamp: "Vừa xong" }])
    } catch (error) {
      console.error("Lỗi truy cập camera:", error)
      alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.")
    }
  }

  const stopLive = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsLive(false)
    setLiveChat([])
  }

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const handleSendChat = (message) => {
    const newChat = {
      id: liveChat.length + 1,
      username: "Bạn",
      message: message,
      timestamp: "Vừa xong",
    }
    setLiveChat([...liveChat, newChat])
  }

  return (
    <div className="live-studio">
      <div className="container">
        <SceneLayout />

        <div className="main-content">
          <VideoPreview videoRef={videoRef} isLive={isLive} />
          <GoLiveButton isLive={isLive} onStartLive={startLive} onStopLive={stopLive} />
        </div>

        <div className="right-panel">
          <ToolsPanel />
          <ChatPanel chat={liveChat} onSendMessage={handleSendChat} isLive={isLive} />
        </div>
      </div>
    </div>
  )
}

export default LiveStudio
