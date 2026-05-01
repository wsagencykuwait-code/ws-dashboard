'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getClients() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching clients:', error)
    return []
  }
  return data
}

export async function getClient(id) {
  if (id === 'new') return null
  
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching client:', error)
    return null
  }
  return data
}

export async function saveClient(formData) {
  const supabase = await createClient()
  
  const originalId = formData.get('originalId')
  const newId = formData.get('id')
  const isNew = originalId === 'new'
  
  const clientData = {
    src: formData.get('src') || null,
    alt: formData.get('alt') || null,
  }

  // If the user provided an explicit ID to change the order
  if (newId) {
    clientData.id = parseInt(newId, 10)
  }

  let result;
  
  if (isNew) {
    result = await supabase.from('clients').insert([clientData])
  } else {
    // We update based on the originalId in case they changed the ID for reordering
    result = await supabase.from('clients').update(clientData).eq('id', originalId)
  }

  if (result.error) {
    console.error('Error saving client:', result.error)
    return { error: 'فشل حفظ العميل' }
  }

  revalidatePath('/clients')
  return { success: true }
}

export async function deleteClient(id) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting client:', error)
    return { error: 'فشل حذف العميل' }
  }

  revalidatePath('/clients')
  return { success: true }
}
