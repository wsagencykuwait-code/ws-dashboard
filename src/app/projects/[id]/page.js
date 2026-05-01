import { getProject, saveProject, deleteContent } from './actions'
import Link from 'next/link'

export default async function ProjectFormPage({ params }) {
  // Extract id from params Promise in Next.js 15+ 
  const { id } = await params
  
  const isNew = id === 'new'
  const { project, content } = await getProject(id)

  if (!isNew && !project) {
    return <div className="p-8 text-center font-bold">المشروع غير موجود</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="flex items-center space-x-4 space-x-reverse">
            <h1 className="text-3xl font-black text-black">
              {isNew ? 'إضافة مشروع جديد' : 'تعديل المشروع'}
            </h1>
          </div>
          <Link href="/projects" className="mt-4 md:mt-0 text-sm font-bold text-gray-500 hover:text-black transition-colors">
            &larr; العودة للمشاريع
          </Link>
        </header>

        <form key={project?.id || 'new'} action={saveProject} className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8 space-y-8">
          <input type="hidden" name="id" value={id} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Arabic Fields */}
            <div className="space-y-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-black border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                المحتوى العربي
              </h3>
              <div>
                <label className="block mb-2 font-bold text-sm text-gray-700" htmlFor="title_ar">العنوان (عربي)</label>
                <input defaultValue={project?.title_ar || ''} id="title_ar" name="title_ar" type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all" />
              </div>
              <div>
                <label className="block mb-2 font-bold" htmlFor="description_ar">الوصف (عربي)</label>
                <textarea defaultValue={project?.description_ar || ''} id="description_ar" name="description_ar" rows={4} className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-black bg-white" />
              </div>
              <div>
                <label className="block mb-2 font-bold" htmlFor="client_ar">العميل (عربي)</label>
                <input defaultValue={project?.client_ar || ''} id="client_ar" name="client_ar" type="text" className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-black bg-white" />
              </div>
              <div>
                <label className="block mb-2 font-bold" htmlFor="service_ar">الخدمة (عربي)</label>
                <input defaultValue={project?.service_ar || ''} id="service_ar" name="service_ar" type="text" className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-black bg-white" />
              </div>
            </div>

            {/* English Fields */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-200" dir="ltr">
              <h3 className="text-xl font-bold border-b border-gray-200 pb-2 text-right">English Content</h3>
              <div>
                <label className="block mb-2 font-bold text-right" htmlFor="title_en">Title (English)</label>
                <input defaultValue={project?.title_en || ''} id="title_en" name="title_en" type="text" className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-black bg-white text-right" />
              </div>
              <div>
                <label className="block mb-2 font-bold text-right" htmlFor="description_en">Description (English)</label>
                <textarea defaultValue={project?.description_en || ''} id="description_en" name="description_en" rows={4} className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-black bg-white text-right" />
              </div>
              <div>
                <label className="block mb-2 font-bold text-right" htmlFor="client_en">Client (English)</label>
                <input defaultValue={project?.client_en || ''} id="client_en" name="client_en" type="text" className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-black bg-white text-right" />
              </div>
              <div>
                <label className="block mb-2 font-bold text-right" htmlFor="service_en">Service (English)</label>
                <input defaultValue={project?.service_en || ''} id="service_en" name="service_en" type="text" className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-black bg-white text-right" />
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Media and Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-bold" htmlFor="imageUrl">رابط الصورة الرئيسية (Image URL)</label>
              <input defaultValue={project?.imageUrl || ''} id="imageUrl" name="imageUrl" type="text" dir="ltr" className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-black bg-white" placeholder="https://..." />
              {project?.imageUrl && (
                <div className="mt-4">
                  <img src={project.imageUrl} alt="Preview" className="h-32 object-contain border border-gray-200 rounded" />
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-bold" htmlFor="reating">التقييم (Rating)</label>
                <input defaultValue={project?.reating || ''} id="reating" name="reating" type="number" step="0.1" min="0" max="5" dir="ltr" className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-black bg-white" />
              </div>
              <div className="flex items-center space-x-3 space-x-reverse pt-4">
                <input defaultChecked={project?.featured} id="featured" name="featured" type="checkbox" className="w-5 h-5 accent-black cursor-pointer" />
                <label className="font-bold cursor-pointer select-none" htmlFor="featured">تعيين كمشروع مميز (Featured)</label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" className="px-8 py-3.5 font-bold text-white bg-black rounded-xl hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg transition-all">
              حفظ المشروع
            </button>
          </div>
        </form>

        {!isNew && (
          <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-black text-black mb-2">محتوى المشروع (تفاصيل الصفحة)</h2>
                <p className="text-gray-600">هنا يمكنك إدارة الكتل النصية والصور والفيديوهات الخاصة بتفاصيل المشروع.</p>
              </div>
              <Link href={`/projects/${project.id}/content/new`} className="mt-4 md:mt-0 px-6 py-3 text-sm font-bold text-white bg-black rounded-xl hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                + إضافة كتلة محتوى جديدة
              </Link>
            </div>

            {content.length === 0 ? (
              <div className="p-8 text-center text-gray-500 bg-white border border-gray-200 rounded-lg">
                لا يوجد محتوى مضاف حتى الآن.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {content.map((block) => (
                  <div key={block.id} className="p-4 bg-white border border-gray-200 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <h4 className="font-bold text-lg">{block.title_ar || block.title_en || block.imageTitle_ar || 'بدون عنوان'}</h4>
                      <p className="text-sm text-gray-500 truncate max-w-xl">{block.text_ar || block.description_ar || block.text || 'لا يوجد نص'}</p>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse mt-4 md:mt-0">
                      <Link href={`/projects/${project.id}/content/${block.id}`} className="font-bold text-black border-b border-black hover:text-gray-600 hover:border-gray-600 transition-colors">
                        تعديل / إضافة وسائط
                      </Link>
                      <form action={async () => {
                        'use server'
                        await deleteContent(block.id, project.id)
                      }}>
                        <button type="submit" className="font-bold text-red-600 border-b border-red-600 hover:text-red-800 hover:border-red-800 transition-colors">
                          حذف
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
