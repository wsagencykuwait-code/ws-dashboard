'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { setClientLocationAction } from '@/app/locationActions'

const LOCATIONS = [
  {
    value: 'kuwait',
    flag: '🇰🇼',
    label: 'الكويت',
    sublabel: 'Kuwait',
    description: 'عرض المحتوى للزوار من الكويت فقط',
    gradient: 'from-[#007A3D] via-[#CE1126] to-[#000000]',
    activeGlow: 'shadow-[0_0_40px_rgba(0,122,61,0.4)]',
    activeBorder: 'border-[#007A3D]',
    activeBg: 'bg-gradient-to-br from-[#007A3D]/10 to-[#CE1126]/5',
  },
  {
    value: 'bahrain',
    flag: '🇧🇭',
    label: 'البحرين',
    sublabel: 'Bahrain',
    description: 'عرض المحتوى للزوار من البحرين فقط',
    gradient: 'from-[#CE1126] to-[#ffffff]',
    activeGlow: 'shadow-[0_0_40px_rgba(206,17,38,0.35)]',
    activeBorder: 'border-[#CE1126]',
    activeBg: 'bg-gradient-to-br from-[#CE1126]/10 to-[#CE1126]/3',
  },
  {
    value: 'none',
    flag: '🌐',
    label: 'بلا قيود',
    sublabel: 'No Restriction',
    description: 'عرض المحتوى لجميع الزوار بدون قيود',
    gradient: 'from-[#6366f1] to-[#8b5cf6]',
    activeGlow: 'shadow-[0_0_40px_rgba(99,102,241,0.4)]',
    activeBorder: 'border-[#6366f1]',
    activeBg: 'bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/5',
  },
]

export default function LocationSelector({ initialLocation }) {
  const [activeLocation, setActiveLocation] = useState(initialLocation ?? 'none')
  const [saving, setSaving] = useState(null) // which value is being saved

  const handleSelect = async (value) => {
    if (saving || value === activeLocation) return

    setSaving(value)
    try {
      await setClientLocationAction(value)
      setActiveLocation(value)
      toast.success('تم حفظ إعداد الموقع بنجاح ✓')
    } catch (err) {
      console.error(err)
      toast.error('حدث خطأ أثناء الحفظ')
    } finally {
      setSaving(null)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500 mb-2">
        اختر موقعك الجغرافى 
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {LOCATIONS.map((loc) => {
          const isActive = activeLocation === loc.value
          const isLoading = saving === loc.value

          return (
            <button
              key={loc.value}
              onClick={() => handleSelect(loc.value)}
              disabled={!!saving}
              aria-pressed={isActive}
              className={`
                relative group flex flex-col items-center justify-center gap-3
                p-6 rounded-2xl border-2 text-center
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                ${isActive
                  ? `${loc.activeBg} ${loc.activeBorder} ${loc.activeGlow} scale-[1.02]`
                  : 'bg-white border-gray-200 hover:border-gray-400 hover:shadow-md hover:scale-[1.01]'
                }
                ${saving && !isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
              )}

              {/* Flag / Spinner */}
              <span className="text-5xl leading-none transition-transform duration-300 group-hover:scale-110">
                {isLoading ? (
                  <span className="inline-block w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
                ) : (
                  loc.flag
                )}
              </span>

              {/* Labels */}
              <div>
                <p className={`text-xl font-black tracking-tight ${isActive ? 'text-black' : 'text-gray-800'}`}>
                  {loc.label}
                </p>
                <p className={`text-xs font-semibold uppercase tracking-widest mt-0.5 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                  {loc.sublabel}
                </p>
              </div>

              {/* Description */}
              <p className={`text-xs leading-relaxed ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                {loc.description}
              </p>

              {/* Active badge */}
              {isActive && (
                <span className="mt-1 inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-black text-white rounded-full">
                  ✓ مفعّل
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
