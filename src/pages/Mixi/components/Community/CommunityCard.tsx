import { Users, MessageSquare, ArrowRight } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'

import type { Community } from './types'

interface CommunityCardProps {
  community: Community
  onJoin: () => void
  onLeave: () => void
  onClick: () => void
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community, onJoin, onLeave, onClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      className="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl flex-shrink-0">{community.icon || '👥'}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground mb-1">{community.name}</h3>
          {community.category && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              {community.category}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{community.description}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{community.memberCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="w-4 h-4" />
          <span>{community.threadCount}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        {community.isMember ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onLeave()
              }}
              className="flex-1 min-h-[44px]"
            >
              Leave
            </Button>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onClick()
              }}
              className="min-h-[44px]"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onJoin()
            }}
            className="flex-1 min-h-[44px]"
          >
            Join
          </Button>
        )}
      </div>
    </div>
  )
}

export default CommunityCard

