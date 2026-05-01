'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getProjects() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('Projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  return data
}

export async function deleteProject(id) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('Projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    return { error: 'فشل حذف المشروع' }
  }

  revalidatePath('/projects')
  return { success: true }
}
