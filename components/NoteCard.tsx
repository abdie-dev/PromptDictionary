'use client'

import { useState } from 'react'
import { Copy, Trash2, Check } from 'lucide-react'

interface Note {
  id: string
  content: string
  created_at: string
}

interface NoteCardProps {
  note: Note
  onDelete: (id: string) => Promise<void>
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const [copied, setCopied] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(note.content)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = note.content
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      await onDelete(note.id)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="group relative rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md">
      <p className="whitespace-pre-wrap break-words pr-20 text-sm leading-relaxed text-zinc-800">
        {note.content}
      </p>

      <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={handleCopy}
          className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          title="Salin"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
          title="Hapus"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
