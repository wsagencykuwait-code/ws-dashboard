'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateVideoUrlAction(newUrl) {
  const supabase = await createClient()
  
  const { data: existing } = await supabase.from('hero_video').select('id').limit(1).maybeSingle()
  if (existing) {
    const { error } = await supabase.from('hero_video').update({ video_url: newUrl }).eq('id', existing.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('hero_video').insert({ video_url: newUrl })
    if (error) throw new Error(error.message)
  }
  revalidatePath('/')
  return { success: true }
}
