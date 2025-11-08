
import { MessageSquare } from 'lucide-react'
import React from 'react'

import StatusCard from './StatusCard'
import StatusCreator from './StatusCreator'
import type { StatusUpdate } from './types'

interface StatusFeedProps {
  statuses: StatusUpdate[]
  onCreate: (status: Omit<StatusUpdate, 'id' | 'createdAt' | 'likes' | 'liked'>) => void
  onLike: (statusId: string) => void
}

const StatusFeed: React.FC<StatusFeedProps> = ({ statuses, onCreate, onLike }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Status Creator */}
      <StatusCreator onCreate={onCreate} />

      {/* Status Feed */}
      <div className="space-y-3">
        {statuses.map((status) => (
          <StatusCard key={status.id} status={status} onLike={() => onLike(status.id)} />
        ))}
      </div>

      {statuses.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No status updates yet</p>
          <p className="text-sm mt-2">Share what's on your mind!</p>
        </div>
      )}
    </div>
  )
}

export default StatusFeed

