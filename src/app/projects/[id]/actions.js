'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getProject(id) {
  if (id === 'new') return { project: null, content: [] }
  
  const supabase = await createClient()
  const { data: project, error: projectError } = await supabase
    .from('Projects')
    .select('*')
    .eq('id', id)
    .single()

  if (projectError) {
    console.error('Error fetching project:', projectError)
    return { project: null, content: [] }
  }

  const { data: content, error: contentError } = await supabase
    .from('content')
    .select('*')
    .eq('Project_id', id)
    .order('created_at', { ascending: true })

  return { project, content: content || [] }
}

export async function saveProject(formData) {
  const supabase = await createClient()
  
  const id = formData.get('id')
  
  const projectData = {
    title_ar: formData.get('title_ar') || null,
    title_en: formData.get('title_en') || null,
    description_ar: formData.get('description_ar') || null,
    description_en: formData.get('description_en') || null,
    client_ar: formData.get('client_ar') || null,
    client_en: formData.get('client_en') || null,
    service_ar: formData.get('service_ar') || null,
    service_en: formData.get('service_en') || null,
    imageUrl: formData.get('imageUrl') || null,
    featured: formData.get('featured') === 'on',
    reating: formData.get('reating') ? parseFloat(formData.get('reating')) : null,
  }

  let result;
  
  if (id === 'new') {
    result = await supabase.from('Projects').insert([projectData]).select().single()
  } else {
    result = await supabase.from('Projects').update(projectData).eq('id', id).select().single()
  }

  if (result.error) {
    console.error('Error saving project:', result.error)
    return { error: 'فشل حفظ المشروع' }
  }

  revalidatePath('/projects')
  revalidatePath(`/projects/${result.data.id}`)
  redirect('/projects')
}

export async function deleteContent(contentId, projectId) {
  const supabase = await createClient()
  const { error } = await supabase.from('content').delete().eq('id', contentId)
  if (error) {
    console.error('Error deleting content:', error)
  }
  revalidatePath(`/projects/${projectId}`)
}
