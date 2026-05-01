import { login } from './actions'

export default function LoginPage({ searchParams }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-black">
      <form className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-3xl font-black text-center text-black">تسجيل الدخول</h2>
        
        {searchParams?.message && (
          <div className="p-3 text-sm text-center text-white bg-black rounded">
            {searchParams.message === 'Could not authenticate user' ? 'فشلت عملية المصادقة. تحقق من البريد الإلكتروني أو كلمة المرور.' : searchParams.message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-bold text-black" htmlFor="email">البريد الإلكتروني</label>
            <input 
              className="w-full p-3 text-sm text-black border-2 border-gray-300 rounded focus:outline-none focus:border-black bg-white" 
              id="email" 
              name="email" 
              type="email" 
              placeholder="name@example.com"
              required 
              dir="ltr"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-black" htmlFor="password">كلمة المرور</label>
            <input 
              className="w-full p-3 text-sm text-black border-2 border-gray-300 rounded focus:outline-none focus:border-black bg-white" 
              id="password" 
              name="password" 
              type="password" 
              required 
              dir="ltr"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-3 pt-4">
          <button 
            className="w-full px-5 py-3 text-sm font-bold text-center text-white bg-black rounded hover:bg-gray-800 transition-colors" 
            formAction={login}
          >
            دخول
          </button>
        </div>
      </form>
    </div>
  )
}
