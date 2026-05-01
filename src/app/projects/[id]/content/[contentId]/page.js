import { getContentData } from './actions'
import Link from 'next/link'
import ContentEditor from './ContentEditor'

export default async function ContentBlockPage({ params }) {
  const { id: projectId, contentId } = await params
  
  const isNew = contentId === 'new'
  const { contentBlock, images, videos } = await getContentData(contentId)

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="flex items-center space-x-4 space-x-reverse">
            <h1 className="text-2xl font-black text-black">
              {isNew ? 'إضافة كتلة محتوى' : 'تعديل كتلة المحتوى وإدارة الوسائط'}
            </h1>
          </div>
          <Link href={`/projects/${projectId}`} className="mt-4 md:mt-0 text-sm font-bold text-gray-500 hover:text-black transition-colors">
            &larr; العودة لتفاصيل المشروع
          </Link>
        </header>

        <ContentEditor 
          projectId={projectId} 
          contentId={contentId} 
          contentBlock={contentBlock} 
          images={images} 
          videos={videos} 
        />
      </div>
    </div>
  )
}
