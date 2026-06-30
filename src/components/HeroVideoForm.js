'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { updateVideoUrlAction } from '@/app/heroActions'

export default function HeroVideoForm({ currentVideoUrl }) {
  const [url, setUrl] = useState(currentVideoUrl)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await updateVideoUrlAction(url)
      toast.success('تم حفظ الرابط بنجاح')
    } catch (error) {
      console.error(error)
      toast.error('حدث خطأ أثناء حفظ الرابط')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
      <input
        type="url"
        name="video_url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="أدخل رابط الفيديو (مثال: https://example.com/video.mp4)"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-left"
        dir="ltr"
        required
      />
      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`px-6 py-2.5 text-sm font-bold text-white bg-black rounded-lg transition-colors flex items-center justify-center min-w-[120px] ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800'
        }`}
      >
        {isSubmitting ? 'جاري الحفظ...' : 'حفظ الرابط'}
      </button>
    </form>
  )
}
