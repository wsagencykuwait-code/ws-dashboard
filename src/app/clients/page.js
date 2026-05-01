import { getClients, deleteClient } from './actions'
import Link from 'next/link'

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-gray-100 shadow-xl rounded-2xl">
          <div className="flex items-center space-x-4 space-x-reverse">
            <h1 className="text-3xl font-black text-black">العملاء</h1>
            <Link href="/" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">
              العودة للرئيسية &larr;
            </Link>
          </div>
          <Link href="/clients/new" className="mt-4 md:mt-0 px-6 py-3 text-sm font-bold text-white bg-black rounded-xl hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg transition-all">
            + إضافة عميل جديد
          </Link>
        </header>

        <main className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden">
          {clients.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              لا يوجد عملاء مضافين حتى الآن.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right text-black">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-bold">الترتيب (ID)</th>
                    <th scope="col" className="px-6 py-4 font-bold">صورة الشعار</th>
                    <th scope="col" className="px-6 py-4 font-bold">نص بديل (Alt)</th>
                    <th scope="col" className="px-6 py-4 font-bold text-left">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold">
                        <span className="bg-gray-100 px-3 py-1 rounded-lg text-gray-700">{client.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        {client.src ? (
                          <img src={client.src} alt={client.alt} className="w-16 h-16 object-contain border border-gray-100 rounded-xl bg-gray-50 p-2 shadow-sm" />
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4">{client.alt || '-'}</td>
                      <td className="px-6 py-4 text-left">
                        <div className="flex items-center justify-end space-x-3 space-x-reverse">
                          <Link href={`/clients/${client.id}`} className="px-4 py-2 text-xs font-bold text-black border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all">
                            تعديل
                          </Link>
                          <form action={async () => {
                            'use server'
                            await deleteClient(client.id)
                          }}>
                            <button type="submit" className="px-4 py-2 text-xs font-bold text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all">
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
