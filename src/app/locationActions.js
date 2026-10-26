'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

const SETTINGS_ROW_ID = 1 // assumes a single row with id = 1

export async function getClientLocationAction() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('app_settings')
    .select('client_location')
    .limit(1)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data?.client_location ?? 'none'
}

export async function setClientLocationAction(location) {
  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('app_settings')
    .select('id')
    .limit(1)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase
      .from('app_settings')
      .update({ client_location: location })
      .eq('id', existing.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase
      .from('app_settings')
      .insert({ client_location: location })
    if (error) throw new Error(error.message)
  }

  revalidatePath('/')
  return { success: true }
}
