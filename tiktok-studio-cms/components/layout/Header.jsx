"use client"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end">
        <button className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
          <span className="text-white font-semibold">U</span>
        </button>
      </div>
    </header>
  )
}
