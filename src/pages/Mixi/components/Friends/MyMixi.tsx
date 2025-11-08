
import { Users, UserPlus, Inbox } from 'lucide-react'
import React, { useState } from 'react'

import FriendList from './FriendList'
import FriendRequestList from './FriendRequestList'
import FriendSearch from './FriendSearch'
import type { Friend, FriendRequest, FriendStatus, User } from './types'

interface MyMixiProps {
  friends: Friend[]
  friendRequests: FriendRequest[]
  onRemoveFriend: (friendId: string) => void
  onAcceptRequest: (requestId: string) => void
  onRejectRequest: (requestId: string) => void
  onCancelRequest: (requestId: string) => void
  onAddFriend: (userId: string) => void
  searchUsers: (query: string) => Promise<{ users: (User & { friendStatus: FriendStatus })[] }>
}

type Tab = 'friends' | 'requests' | 'search'

const MyMixi: React.FC<MyMixiProps> = ({
  friends,
  friendRequests,
  onRemoveFriend,
  onAcceptRequest,
  onRejectRequest,
  onCancelRequest,
  onAddFriend,
  searchUsers,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('friends')

  const tabs: Array<{ id: Tab; label: string; icon: React.ReactNode; count?: number }> = [
    { id: 'friends', label: 'Friends', icon: <Users className="w-5 h-5" />, count: friends.length },
    {
      id: 'requests',
      label: 'Requests',
      icon: <Inbox className="w-5 h-5" />,
      count: friendRequests.length,
    },
    { id: 'search', label: 'Find Friends', icon: <UserPlus className="w-5 h-5" /> },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">MyMixi</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your friends and connections</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors min-h-[44px] border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'friends' && (
          <FriendList friends={friends} onRemoveFriend={onRemoveFriend} />
        )}
        {activeTab === 'requests' && (
          <FriendRequestList
            requests={friendRequests}
            onAccept={onAcceptRequest}
            onReject={onRejectRequest}
            onCancel={onCancelRequest}
          />
        )}
        {activeTab === 'search' && (
          <FriendSearch
            onAddFriend={onAddFriend}
            onCancelRequest={onCancelRequest}
            searchUsers={searchUsers}
          />
        )}
      </div>
    </div>
  )
}

export default MyMixi

