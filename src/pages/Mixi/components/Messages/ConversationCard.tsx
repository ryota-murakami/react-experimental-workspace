import React from 'react'

import { cn } from '@/lib/utils'

import type { Conversation } from './types'

interface ConversationCardProps {
  conversation: Conversation
  onClick: () => void
}

const ConversationCard: React.FC<ConversationCardProps> = ({ conversation, onClick }) => {
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
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className={cn(
        'bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow cursor-pointer',
        conversation.unreadCount > 0 && 'bg-primary/5 border-primary/20'
      )}
    >
      <div className="flex items-start gap-4">
        <img
          src={conversation.participant.avatar}
          alt={conversation.participant.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-foreground">{conversation.participant.name}</h3>
            {conversation.lastMessage && (
              <time className="text-xs text-muted-foreground flex-shrink-0">
                {formatTime(conversation.lastMessage.createdAt)}
              </time>
            )}
          </div>
          {conversation.lastMessage && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {conversation.lastMessage.sender.id === 'current-user' ? 'You: ' : ''}
              {conversation.lastMessage.content}
            </p>
          )}
        </div>
        {conversation.unreadCount > 0 && (
          <div className="bg-primary text-primary-foreground rounded-full min-w-[20px] h-5 px-2 flex items-center justify-center text-xs font-medium flex-shrink-0">
            {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
          </div>
        )}
      </div>
    </div>
  )
}

export default ConversationCard

