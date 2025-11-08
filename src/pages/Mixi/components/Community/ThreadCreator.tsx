import { X } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'


interface ThreadCreatorProps {
  onCreate: (title: string, content: string) => void
  onCancel: () => void
}

const ThreadCreator: React.FC<ThreadCreatorProps> = ({ onCreate, onCancel }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    onCreate(title.trim(), content.trim())
    setTitle('')
    setContent('')
  }

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">New Discussion Thread</h3>
        <button
          onClick={onCancel}
          className="p-2 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="thread-title" className="block text-sm font-medium text-foreground mb-2">
            Title *
          </label>
          <input
            id="thread-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Thread title"
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[44px]"
            required
          />
        </div>

        <div>
          <label htmlFor="thread-content" className="block text-sm font-medium text-foreground mb-2">
            Content *
          </label>
          <textarea
            id="thread-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start the discussion..."
            rows={6}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
            required
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 min-h-[44px]">
            Cancel
          </Button>
          <Button type="submit" disabled={!title.trim() || !content.trim()} className="flex-1 min-h-[44px]">
            Create Thread
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ThreadCreator

