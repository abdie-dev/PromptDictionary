'use client'

import { useState, useEffect, useCallback } from 'react'
import { getSupabase } from '@/lib/supabase'
import NoteInput from '@/components/NoteInput'
import NoteCard from '@/components/NoteCard'

interface Note {
  id: string
  content: string
  created_at: string
}

export default function NotesClient() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNotes = useCallback(async () => {
    const { data, error } = await getSupabase()
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setNotes(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const addNote = useCallback(async (content: string) => {
    const { data, error } = await getSupabase()
      .from('notes')
      .insert({ content })
      .select()
      .single()

    if (error) throw new Error(error.message)
    if (data) {
      setNotes(prev => [data, ...prev])
    }
  }, [])

  const deleteNote = useCallback(async (id: string) => {
    const { error } = await getSupabase().from('notes').delete().eq('id', id)
    if (error) throw new Error(error.message)
    setNotes(prev => prev.filter(n => n.id !== id))
  }, [])

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Enigma
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Catatan sederhana
        </p>
      </header>

      <NoteInput onSubmit={addNote} />

      <section className="mt-8 space-y-3">
        {loading ? (
          <p className="py-12 text-center text-sm text-zinc-400">
            Memuat...
          </p>
        ) : notes.length === 0 ? (
          <p className="py-12 text-center text-sm text-zinc-400">
            Belum ada catatan
          </p>
        ) : (
          notes.map(note => (
            <NoteCard key={note.id} note={note} onDelete={deleteNote} />
          ))
        )}
      </section>
    </main>
  )
}
