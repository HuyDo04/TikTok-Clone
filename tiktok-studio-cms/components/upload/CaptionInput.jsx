"use client"

export default function CaptionInput({ value, onChange }) {
  const maxLength = 4000

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Chú thích</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Chia sẻ thêm về video của bạn tại đây"
        maxLength={maxLength}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
      />
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <button className="hover:text-gray-700 flex items-center gap-1">
            <span>#</span> Hashtag
          </button>
          <button className="hover:text-gray-700 flex items-center gap-1">
            <span>♪</span> Nhạc nền
          </button>
        </div>
        <span className="text-sm text-gray-500">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  )
}
