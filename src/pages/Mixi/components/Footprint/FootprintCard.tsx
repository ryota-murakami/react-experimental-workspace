import { X, Eye } from 'lucide-react'
import React from 'react'

import type { Footprint } from './types'

interface FootprintCardProps {
  footprint: Footprint
  onDelete: () => void
  showVisitCount?: boolean
}

const FootprintCard: React.FC<FootprintCardProps> = ({
  footprint,
  onDelete,
  showVisitCount = true,
}) => {
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
      <div className="flex items-center gap-4">
        <img
          src={footprint.visitor.avatar}
          alt={footprint.visitor.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{footprint.visitor.name}</h3>
            {showVisitCount && footprint.visitCount > 1 && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {footprint.visitCount} visits
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="w-3 h-3" />
            <time>{formatTime(footprint.lastVisitAt)}</time>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground"
          title="Remove footprint"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default FootprintCard

