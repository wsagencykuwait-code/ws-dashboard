import { getProjects, deleteProject } from './actions'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="flex items-center space-x-4 space-x-reverse">
            <h1 className="text-3xl font-black text-black">المشاريع</h1>
            <Link href="/" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">
              العودة للرئيسية &larr;
            </Link>
          </div>
          <Link href="/projects/new" className="mt-4 md:mt-0 px-5 py-2.5 text-sm font-bold text-white bg-black rounded hover:bg-gray-800 transition-colors">
            + إضافة مشروع جديد
          </Link>
        </header>

        <main className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          {projects.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              لا توجد مشاريع مضافة حتى الآن.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right text-black">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-bold">الصورة</th>
                    <th scope="col" className="px-6 py-4 font-bold">العنوان (عربي)</th>
                    <th scope="col" className="px-6 py-4 font-bold">العنوان (إنجليزي)</th>
                    <th scope="col" className="px-6 py-4 font-bold">الخدمة</th>
                    <th scope="col" className="px-6 py-4 font-bold text-center">مميز</th>
                    <th scope="col" className="px-6 py-4 font-bold text-left">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {project.imageUrl ? (
                          <img src={project.imageUrl} alt={project.title_ar} className="w-16 h-16 object-cover rounded border border-gray-200" />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">بدون صورة</div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-bold">{project.title_ar || '-'}</td>
                      <td className="px-6 py-4">{project.title_en || '-'}</td>
                      <td className="px-6 py-4">{project.service_ar || project.service || '-'}</td>
                      <td className="px-6 py-4 text-center">
                        {project.featured ? (
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-black rounded">نعم</span>
                        ) : (
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black bg-gray-200 rounded">لا</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-left">
                        <div className="flex items-center justify-end space-x-3 space-x-reverse">
                          <Link href={`/projects/${project.id}`} className="font-bold text-black border-b border-black hover:text-gray-600 hover:border-gray-600 transition-colors">
                            تعديل
                          </Link>
                          <form action={async () => {
                            'use server'
                            await deleteProject(project.id)
                          }}>
                            <button type="submit" className="font-bold text-red-600 border-b border-red-600 hover:text-red-800 hover:border-red-800 transition-colors">
                              حذف
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
