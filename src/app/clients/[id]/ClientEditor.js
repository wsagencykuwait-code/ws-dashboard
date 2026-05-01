'use client'

import { saveClient } from '../actions'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ClientEditor({ id, client, isNew }) {
  const router = useRouter()
  const handleSave = async (formData) => {
    try {
      await toast.promise(saveClient(formData).then(res => {
        if(res?.error) throw new Error(res.error)
        return res
      }), {
        loading: 'جاري الحفظ...',
        success: 'تم الحفظ بنجاح!',
        error: 'حدث خطأ أثناء الحفظ',
      })
      router.push('/clients')
    } catch(err) {}
  }

  return (
    <form key={client?.id || 'new'} action={handleSave} className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <input type="hidden" name="originalId" value={id} />

      <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 mb-6">
        <h3 className="text-xl font-black mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          ترتيب الظهور (ID)
        </h3>
        <p className="text-sm text-gray-500 mb-4">يتم عرض العملاء في الصفحة الرئيسية بناءً على هذا الرقم (من الأصغر للأكبر). يمكنك تغييره لإعادة الترتيب.</p>
        <input 
          defaultValue={client?.id || ''} 
          id="id" 
          name="id" 
          type="number" 
          dir="ltr"
          placeholder="مثال: 1"
          className="w-full md:w-1/3 p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all" 
        />
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="src">رابط الشعار (Image URL أو مسار الصورة)</label>
          <input 
            defaultValue={client?.src || ''} 
            id="src" 
            name="src" 
            type="text" 
            dir="ltr"
            placeholder="/images/Clients/1.jpeg"
            required
            className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all" 
          />
          {client?.src && (
            <div className="mt-4 p-4 bg-white rounded-xl inline-block border border-gray-100 shadow-sm">
              <img src={client.src} alt="Preview" className="h-20 object-contain" />
            </div>
          )}
        </div>

        <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="alt">النص البديل (Alt Text)</label>
          <input 
            defaultValue={client?.alt || ''} 
            id="alt" 
            name="alt" 
            type="text" 
            dir="ltr"
            placeholder="client-1"
            className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all" 
          />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="px-10 py-3.5 font-bold text-white bg-black rounded-xl hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all">
          حفظ العميل
        </button>
      </div>
    </form>
  )
}
