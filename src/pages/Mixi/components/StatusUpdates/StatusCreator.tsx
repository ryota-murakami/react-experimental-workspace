import { Send } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import type { StatusUpdate } from './types'

const MAX_LENGTH = 280

interface StatusCreatorProps {
  onCreate: (status: Omit<StatusUpdate, 'id' | 'createdAt' | 'likes' | 'liked'>) => void
}

const StatusCreator: React.FC<StatusCreatorProps> = ({ onCreate }) => {
  const [content, setContent] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const remainingChars = MAX_LENGTH - content.length
  const isNearLimit = remainingChars < 20

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || content.length > MAX_LENGTH) return

    onCreate({
      author: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      },
      content: content.trim(),
    })

    setContent('')
    setIsExpanded(false)
  }

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start gap-3">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <textarea
              value={content}
              onChange={(e) => {
                if (e.target.value.length <= MAX_LENGTH) {
                  setContent(e.target.value)
                }
              }}
              onFocus={() => setIsExpanded(true)}
              placeholder="What's happening?"
              className="w-full resize-none overflow-hidden bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base min-h-[44px] py-2"
              rows={isExpanded ? 3 : 1}
            />
            {isExpanded && (
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={cn(
                    'text-xs text-muted-foreground',
                    isNearLimit && 'text-warning',
                    remainingChars < 0 && 'text-destructive'
                  )}
                >
                  {remainingChars} characters remaining
                </span>
                <Button
                  type="submit"
                  disabled={!content.trim() || content.length > MAX_LENGTH}
                  size="sm"
                  className="min-h-[36px]"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default StatusCreator

