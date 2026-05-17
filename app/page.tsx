import { supabase } from '@/lib/supabase'
import NotesClient from './NotesClient'

export const dynamic = 'force-dynamic'

async function getNotes() {
  const { data } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })

  return data || []
}

export default async function Home() {
  const notes = await getNotes()
  return <NotesClient initialNotes={notes} />
}
