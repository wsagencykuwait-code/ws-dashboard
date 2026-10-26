import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import HeroVideoForm from '@/components/HeroVideoForm'
import LocationSelector from '@/components/LocationSelector'
import { getClientLocationAction } from '@/app/locationActions'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: heroVideoData } = await supabase.from('hero_video').select('video_url').limit(1).maybeSingle()
  const currentVideoUrl = heroVideoData?.video_url || ''

  let currentLocation = 'none'
  try { currentLocation = await getClientLocationAction() } catch (_) {}

  const handleSignOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <h1 className="text-3xl font-black text-black">لوحة التحكم</h1>
          <div className="flex items-center space-x-4 space-x-reverse mt-4 md:mt-0">
            <span className="text-sm font-medium text-gray-600" dir="ltr">
              {user.email}
            </span>
            <form action={handleSignOut}>
              <button 
                className="px-5 py-2 text-sm font-bold text-white bg-black rounded hover:bg-gray-800 transition-colors"
                type="submit"
              >
                تسجيل الخروج
              </button>
            </form>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow">
            <h2 className="mb-4 text-2xl font-bold text-black">إدارة المشاريع</h2>
            <p className="mb-6 text-gray-600">إضافة، تعديل، أو حذف مشاريع معرض الأعمال الخاصة بك.</p>
            <a href="/projects" className="inline-block px-5 py-2.5 text-sm font-bold text-black border-2 border-black rounded hover:bg-black hover:text-white transition-colors">
              الذهاب إلى المشاريع
            </a>
          </div>
          <div className="p-8 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow">
            <h2 className="mb-4 text-2xl font-bold text-black">إدارة العملاء</h2>
            <p className="mb-6 text-gray-600">إضافة، تعديل، أو حذف شركاء النجاح ليتم عرضهم في الصفحة الرئيسية.</p>
            <a href="/clients" className="inline-block px-5 py-2.5 text-sm font-bold text-black border-2 border-black rounded hover:bg-black hover:text-white transition-colors">
              الذهاب إلى العملاء
            </a>
          </div>
          
          <div className="p-8 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow md:col-span-2">
            <h2 className="mb-4 text-2xl font-bold text-black">رابط فيديو البداية (Hero Video)</h2>
            <p className="mb-6 text-gray-600">تعديل رابط الفيديو المعروض في بداية الصفحة الرئيسية للموقع.</p>
            <HeroVideoForm currentVideoUrl={currentVideoUrl} />
          </div>

          <div className="p-8 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow md:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-black">قيود الموقع الجغرافي</h2>
            <LocationSelector initialLocation={currentLocation} />
          </div>
        </main>
      </div>
    </div>
  )
}
