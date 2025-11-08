import { MessageSquare, Pin, Lock } from 'lucide-react'
import React from 'react'


import { cn } from '@/lib/utils'

import type { Thread } from './types'

interface ThreadCardProps {
  thread: Thread
  onClick: () => void
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread, onClick }) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      className={cn(
        'bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow cursor-pointer',
        thread.pinned && 'border-primary/50 bg-primary/5'
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start gap-3">
        <img
          src={thread.author.avatar}
          alt={thread.author.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {thread.pinned && (
              <Pin className="w-4 h-4 text-primary fill-current" />
            )}
            {thread.locked && (
              <Lock className="w-4 h-4 text-muted-foreground" />
            )}
            <h3 className="font-semibold text-foreground truncate">{thread.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{thread.content}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{thread.author.name}</span>
            <span>·</span>
            <time>{formatTime(thread.lastCommentAt || thread.updatedAt)}</time>
            <span>·</span>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>{thread.commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreadCard

