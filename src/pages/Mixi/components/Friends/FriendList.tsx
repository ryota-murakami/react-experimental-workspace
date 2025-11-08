import { Users } from 'lucide-react'
import React from 'react'


import FriendCard from './FriendCard'
import type { Friend } from './types'

interface FriendListProps {
  friends: Friend[]
  onRemoveFriend: (friendId: string) => void
}

const FriendList: React.FC<FriendListProps> = ({ friends, onRemoveFriend }) => {
  if (friends.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg">No friends yet</p>
        <p className="text-sm mt-2">Start connecting with people!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          My Friends ({friends.length})
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {friends.map((friend) => (
          <FriendCard
            key={friend.id}
            user={friend.user}
            friend={friend}
            onRemoveFriend={() => onRemoveFriend(friend.id)}
            showMutualFriends
          />
        ))}
      </div>
    </div>
  )
}

export default FriendList

