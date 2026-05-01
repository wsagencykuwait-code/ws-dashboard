'use client'

import { useState } from 'react'
import { saveContentData, deleteContentBlock } from './actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ContentEditor({ projectId, contentId, contentBlock, images, videos }) {
  const isNew = contentId === 'new'
  
  // Determine initial type
  const initialType = !isNew 
    ? (videos?.length > 0 ? 'video' : images?.length > 0 ? 'image' : 'text')
    : 'text'

  const [type, setType] = useState(initialType)

  const router = useRouter()

  const handleSave = async (formData) => {
    try {
      await toast.promise(saveContentData(formData, type).then(res => {
        if(res?.error) throw new Error(res.error)
        return res
      }), {
        loading: 'جاري الحفظ...',
        success: 'تم الحفظ بنجاح!',
        error: 'حدث خطأ أثناء الحفظ',
      })
      router.push(`/projects/${projectId}`)
    } catch(err) {}
  }

  const handleDelete = async () => {
    if (confirm('هل أنت متأكد من حذف هذه الكتلة بالكامل؟')) {
      try {
        await toast.promise(deleteContentBlock(contentId, projectId), {
          loading: 'جاري الحذف...',
          success: 'تم الحذف!',
          error: 'حدث خطأ',
        })
        router.push(`/projects/${projectId}`)
      } catch(err) {}
    }
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      
      {/* Type Selection */}
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-lg font-black mb-4">اختر نوع المحتوى</h3>
        <div className="flex gap-4">
          <label className={`flex-1 cursor-pointer p-4 border-2 rounded-xl transition-all ${type === 'text' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}>
            <input type="radio" name="contentType" value="text" checked={type === 'text'} onChange={() => setType('text')} className="hidden" />
            <div className="text-center font-bold">📝 نص (Text)</div>
          </label>
          <label className={`flex-1 cursor-pointer p-4 border-2 rounded-xl transition-all ${type === 'image' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}>
            <input type="radio" name="contentType" value="image" checked={type === 'image'} onChange={() => setType('image')} className="hidden" />
            <div className="text-center font-bold">🖼️ صورة (Image)</div>
          </label>
          <label className={`flex-1 cursor-pointer p-4 border-2 rounded-xl transition-all ${type === 'video' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}>
            <input type="radio" name="contentType" value="video" checked={type === 'video'} onChange={() => setType('video')} className="hidden" />
            <div className="text-center font-bold">🎥 فيديو (Video)</div>
          </label>
        </div>
      </div>

      <div className="p-8">
        <form action={handleSave} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <input type="hidden" name="projectId" value={projectId} />
          <input type="hidden" name="contentId" value={contentId} />

          {/* TEXT FORM */}
          {type === 'text' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Arabic */}
              <div className="space-y-5 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span> عربي
                </h3>
                <div>
                  <label className="block mb-2 font-bold text-sm text-gray-700">العنوان الأساسي</label>
                  <input defaultValue={contentBlock?.title_ar || ''} name="title_ar" type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all" />
                </div>
                <div>
                  <label className="block mb-2 font-bold text-sm text-gray-700">الوصف القصير</label>
                  <textarea defaultValue={contentBlock?.description_ar || ''} name="description_ar" rows={2} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all" />
                </div>
                <div>
                  <label className="block mb-2 font-bold text-sm text-gray-700">النص التفصيلي</label>
                  <textarea defaultValue={contentBlock?.text_ar || ''} name="text_ar" rows={5} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all" />
                </div>
              </div>

              {/* English */}
              <div className="space-y-5 bg-gray-50/50 p-6 rounded-2xl border border-gray-100" dir="ltr">
                <h3 className="text-xl font-black flex items-center gap-2 justify-end">
                  English <span className="w-2 h-2 bg-black rounded-full"></span>
                </h3>
                <div>
                  <label className="block mb-2 font-bold text-sm text-gray-700 text-right">Main Title</label>
                  <input defaultValue={contentBlock?.title_en || ''} name="title_en" type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-right" />
                </div>
                <div>
                  <label className="block mb-2 font-bold text-sm text-gray-700 text-right">Short Description</label>
                  <textarea defaultValue={contentBlock?.description_en || ''} name="description_en" rows={2} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-right" />
                </div>
                <div>
                  <label className="block mb-2 font-bold text-sm text-gray-700 text-right">Detailed Text</label>
                  <textarea defaultValue={contentBlock?.text_en || ''} name="text_en" rows={5} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-right" />
                </div>
              </div>
            </div>
          )}

          {/* IMAGE FORM */}
          {type === 'image' && (
            <div className="space-y-6">
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-4">
                <div>
                  <label className="block mb-2 font-bold text-sm text-gray-700">رابط الصورة (URL)</label>
                  <input defaultValue={images[0]?.imageUrl || ''} required name="imageUrl" type="text" dir="ltr" className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all" placeholder="https://..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-bold text-sm text-gray-700">عنوان الصورة (عربي)</label>
                    <input defaultValue={contentBlock?.imageTitle_ar || ''} name="imageTitle_ar" type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all" />
                  </div>
                  <div dir="ltr">
                    <label className="block mb-2 font-bold text-sm text-gray-700 text-right">Image Title (English)</label>
                    <input defaultValue={contentBlock?.imageTitle_en || ''} name="imageTitle_en" type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-right" />
                  </div>
                </div>
                {images[0]?.imageUrl && (
                  <div className="mt-4 border border-gray-200 rounded-xl p-2 bg-white inline-block">
                    <img src={images[0].imageUrl} alt="preview" className="h-32 object-contain rounded-lg" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIDEO FORM */}
          {type === 'video' && (
            <div className="space-y-6">
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-4">
                <div>
                  <label className="block mb-2 font-bold text-sm text-gray-700">رابط الفيديو (URL)</label>
                  <input defaultValue={videos[0]?.videoUrl || ''} required name="videoUrl" type="text" dir="ltr" className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all" placeholder="https://..." />
                </div>
                <div>
                  <label className="block mb-2 font-bold text-sm text-gray-700">نص الفيديو (اختياري)</label>
                  <input defaultValue={videos[0]?.Video_Text || ''} name="Video_Text" type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all" />
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
            {!isNew ? (
              <button type="button" onClick={handleDelete} className="px-6 py-3 font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all">
                حذف هذه الكتلة
              </button>
            ) : <div></div>}
            
            <button type="submit" className="px-10 py-3.5 font-bold text-white bg-black rounded-xl hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              حفظ الكتلة
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
