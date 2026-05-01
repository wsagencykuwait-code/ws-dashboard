import { getClient } from '../actions'
import Link from 'next/link'
import ClientEditor from './ClientEditor'

export default async function ClientFormPage({ params }) {
  const { id } = await params
  
  const isNew = id === 'new'
  const client = await getClient(id)

  if (!isNew && !client) {
    return <div className="p-8 text-center font-bold">العميل غير موجود</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <h1 className="text-3xl font-black text-black">
            {isNew ? 'إضافة عميل جديد' : 'تعديل العميل'}
          </h1>
          <Link href="/clients" className="mt-4 md:mt-0 text-sm font-bold text-gray-500 hover:text-black transition-colors">
            &larr; العودة للعملاء
          </Link>
        </header>
        <ClientEditor id={id} client={client} isNew={isNew} />
      </div>
    </div>
  )
}
