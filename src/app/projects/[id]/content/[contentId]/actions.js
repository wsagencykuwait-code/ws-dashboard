'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getContentData(contentId) {
  if (contentId === 'new') return { contentBlock: null, images: [], videos: [] }

  const supabase = await createClient()
  
  const { data: contentBlock } = await supabase
    .from('content')
    .select('*')
    .eq('id', contentId)
    .single()

  const { data: images } = await supabase
    .from('images')
    .select('*')
    .eq('content_url', contentId)

  const { data: videos } = await supabase
    .from('Vidoes')
    .select('*')
    .eq('content_id', contentId)

  return { 
    contentBlock: contentBlock || null, 
    images: images || [], 
    videos: videos || [] 
  }
}

export async function saveContentData(formData, type) {
  const supabase = await createClient()
  const projectId = formData.get('projectId')
  const contentId = formData.get('contentId')
  const isNew = contentId === 'new'

  let currentContentId = contentId

  // 1. Save or Update the base `content` record
  const contentData = {
    Project_id: projectId,
    title_ar: type === 'text' ? formData.get('title_ar') : null,
    title_en: type === 'text' ? formData.get('title_en') : null,
    description_ar: type === 'text' ? formData.get('description_ar') : null,
    description_en: type === 'text' ? formData.get('description_en') : null,
    imageTitle_ar: type === 'image' ? formData.get('imageTitle_ar') : null,
    imageTitle_en: type === 'image' ? formData.get('imageTitle_en') : null,
    text_ar: type === 'text' ? formData.get('text_ar') : null,
    text_en: type === 'text' ? formData.get('text_en') : null,
    text: type === 'text' ? formData.get('text_en') : null,
  }

  if (isNew) {
    const { data, error } = await supabase.from('content').insert([contentData]).select().single()
    if (error) { console.error('Error creating content:', error); return { error: 'Failed' } }
    currentContentId = data.id
  } else {
    await supabase.from('content').update(contentData).eq('id', currentContentId)
  }

  // 2. Handle specific type data
  if (type === 'image') {
    const imageUrl = formData.get('imageUrl')
    const imageClass = formData.get('class') || null
    
    // If updating, delete existing images to replace with new (since it's a 1-to-1 representation now)
    if (!isNew) await supabase.from('images').delete().eq('content_url', currentContentId)
    
    if (imageUrl) {
      await supabase.from('images').insert([{
        content_url: currentContentId,
        imageUrl: imageUrl,
        class: imageClass
      }])
    }
  } else if (type === 'video') {
    const videoUrl = formData.get('videoUrl')
    
    // If updating, delete existing videos
    if (!isNew) await supabase.from('Vidoes').delete().eq('content_id', currentContentId)
    
    if (videoUrl) {
      await supabase.from('Vidoes').insert([{
        content_id: currentContentId,
        videoUrl: videoUrl,
        Video_Text: formData.get('Video_Text') || null
      }])
    }
  } else {
    // If it's a text block, ensure no stale images or videos exist for this block
    if (!isNew) {
      await supabase.from('images').delete().eq('content_url', currentContentId)
      await supabase.from('Vidoes').delete().eq('content_id', currentContentId)
    }
  }

  revalidatePath(`/projects/${projectId}`)
  return { success: true, projectId }
}

export async function deleteContentBlock(contentId, projectId) {
  const supabase = await createClient()
  await supabase.from('content').delete().eq('id', contentId)
  revalidatePath(`/projects/${projectId}`)
  return { success: true, projectId }
}
