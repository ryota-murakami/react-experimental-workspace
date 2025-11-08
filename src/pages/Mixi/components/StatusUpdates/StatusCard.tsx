import { Heart } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import type { StatusUpdate } from './types'

interface StatusCardProps {
  status: StatusUpdate
  onLike: () => void
}

const StatusCard: React.FC<StatusCardProps> = ({ status, onLike }) => {
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

  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <img
          src={status.author.avatar}
          alt={status.author.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{status.author.name}</h3>
            <time className="text-xs text-muted-foreground">{formatTime(status.createdAt)}</time>
          </div>
          <p className="text-foreground leading-relaxed whitespace-pre-wrap mb-3">
            {status.content}
          </p>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLike}
              className={cn(
                'flex items-center gap-1 px-3 py-2 rounded-lg min-h-[36px]',
                status.liked && 'text-red-500 hover:text-red-600'
              )}
            >
              <Heart className={cn('w-4 h-4', status.liked && 'fill-current')} />
              {status.likes > 0 && <span className="text-sm">{status.likes}</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusCard

