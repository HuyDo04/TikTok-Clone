"use client"

export default function PrivacySelector({ value, onChange }) {
  const options = [
    { value: "public", label: "Công khai", description: "Mọi người" },
    { value: "friends", label: "Bạn bè", description: "Chỉ bạn bè của bạn" },
    { value: "private", label: "Riêng tư", description: "Chỉ mình tôi" },
  ]

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Ai có thể xem video này</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} - {option.description}
          </option>
        ))}
      </select>
    </div>
  )
}
