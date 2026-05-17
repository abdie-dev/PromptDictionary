'use client'

import { FormEvent, useState } from 'react'
import { Plus } from 'lucide-react'

interface NoteInputProps {
  onSubmit: (content: string) => Promise<void>
}

export default function NoteInput({ onSubmit }: NoteInputProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      await onSubmit(content)
      setContent('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis catatan..."
        rows={4}
        className="w-full resize-none rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          {loading ? 'Menyimpan...' : 'Tambah Note'}
        </button>
      </div>
    </form>
  )
}
