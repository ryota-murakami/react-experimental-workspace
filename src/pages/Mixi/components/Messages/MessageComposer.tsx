import { Image, Link as LinkIcon, Send } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'


interface MessageComposerProps {
  onSend: (content: string, images?: string[], links?: Array<{ url: string; title: string }>) => void
  disabled?: boolean
}

const MessageComposer: React.FC<MessageComposerProps> = ({ onSend, disabled }) => {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || disabled) return

    onSend(content.trim())
    setContent('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-border bg-card p-4">
      <div className="flex items-end gap-2">
        <div className="flex gap-2 flex-shrink-0">
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Add image"
          >
            <Image className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Add link"
          >
            <LinkIcon className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none min-h-[44px] max-h-32"
        />
        <Button
          type="submit"
          disabled={!content.trim() || disabled}
          size="lg"
          className="min-h-[44px] min-w-[44px] px-4"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </form>
  )
}

export default MessageComposer

