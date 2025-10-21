"use client"

export default function CoverImageSelector({ files, selected, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {files.map((file, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`relative w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
            selected === index ? "border-pink-500" : "border-transparent"
          }`}
        >
          {file.type === "video" ? (
            <video src={file.url} className="w-full h-full object-cover" />
          ) : (
            <img src={file.url || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          )}
          {selected === index && (
            <div className="absolute inset-0 bg-pink-500 bg-opacity-20 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </button>
      ))}
      <button className="w-24 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors flex-shrink-0">
        <span className="text-gray-400 text-sm">Sửa ảnh bìa</span>
      </button>
    </div>
  )
}
