import { Check, CheckCheck } from 'lucide-react'
import React from 'react'


import { cn } from '@/lib/utils'

import type { Message } from './types'

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  return (
    <div className={cn('flex w-full', isOwn ? 'justify-end' : 'justify-start')}>
      <div className={cn('flex flex-col max-w-[70%]', isOwn ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-2 shadow-sm',
            isOwn
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-muted text-foreground rounded-bl-md'
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

          {/* Images */}
          {message.images && message.images.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Attachment ${idx + 1}`}
                  className="rounded-lg max-w-full h-auto max-h-64 object-cover"
                />
              ))}
            </div>
          )}

          {/* Links */}
          {message.links && message.links.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'block p-3 rounded-lg border transition-colors',
                    isOwn
                      ? 'border-primary-foreground/20 hover:bg-primary-foreground/10'
                      : 'border-border hover:bg-muted/80'
                  )}
                >
                  <p className="font-medium text-sm">{link.title}</p>
                  <p className="text-xs opacity-70 mt-1 truncate">{link.url}</p>
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1 px-1">
          <time className="text-xs text-muted-foreground">{formatTime(message.createdAt)}</time>
          {isOwn && (
            <span className="text-xs text-muted-foreground">
              {message.read ? (
                <CheckCheck className="w-3 h-3 text-primary" />
              ) : (
                <Check className="w-3 h-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble

