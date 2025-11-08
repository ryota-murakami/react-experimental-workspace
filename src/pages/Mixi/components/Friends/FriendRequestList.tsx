import { UserPlus, Inbox, Send } from 'lucide-react'
import React, { useState } from 'react'

import FriendCard from './FriendCard'
import type { FriendRequest } from './types'

interface FriendRequestListProps {
  requests: FriendRequest[]
  onAccept: (requestId: string) => void
  onReject: (requestId: string) => void
  onCancel: (requestId: string) => void
}

const FriendRequestList: React.FC<FriendRequestListProps> = ({
  requests,
  onAccept,
  onReject,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received')

  const receivedRequests = requests.filter((r) => r.to.id === 'current-user')
  const sentRequests = requests.filter((r) => r.from.id === 'current-user')

  if (requests.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg">No pending requests</p>
        <p className="text-sm mt-2">Friend requests will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('received')}
          className={`px-4 py-2 text-sm font-medium transition-colors min-h-[44px] border-b-2 ${
            activeTab === 'received'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Inbox className="w-4 h-4 inline mr-2" />
          Received ({receivedRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-2 text-sm font-medium transition-colors min-h-[44px] border-b-2 ${
            activeTab === 'sent'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Send className="w-4 h-4 inline mr-2" />
          Sent ({sentRequests.length})
        </button>
      </div>

      {/* Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeTab === 'received' &&
          receivedRequests.map((request) => (
            <FriendCard
              key={request.id}
              user={{ ...request.from, friendStatus: 'pending_received' }}
              onAcceptRequest={() => onAccept(request.id)}
              onRejectRequest={() => onReject(request.id)}
            />
          ))}
        {activeTab === 'sent' &&
          sentRequests.map((request) => (
            <FriendCard
              key={request.id}
              user={{ ...request.to, friendStatus: 'pending_sent' }}
              onCancelRequest={() => onCancel(request.id)}
            />
          ))}
      </div>
    </div>
  )
}

export default FriendRequestList

