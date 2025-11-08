import { UserPlus, UserCheck, UserX, X, Users } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'

import type { Friend, FriendStatus, User } from './types'

interface FriendCardProps {
  user: User & { friendStatus?: FriendStatus }
  friend?: Friend
  onAddFriend?: () => void
  onAcceptRequest?: () => void
  onRejectRequest?: () => void
  onCancelRequest?: () => void
  onRemoveFriend?: () => void
  showMutualFriends?: boolean
}

const FriendCard: React.FC<FriendCardProps> = ({
  user,
  friend,
  onAddFriend,
  onAcceptRequest,
  onRejectRequest,
  onCancelRequest,
  onRemoveFriend,
  showMutualFriends = false,
}) => {
  const friendStatus = user.friendStatus || (friend ? 'friends' : 'none')

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">{user.name}</h3>
          {user.bio && (
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{user.bio}</p>
          )}
          {showMutualFriends && user.mutualFriends !== undefined && user.mutualFriends > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
              <Users className="w-3 h-3" />
              <span>{user.mutualFriends} mutual friends</span>
            </div>
          )}
          {friend && (
            <p className="text-xs text-muted-foreground">
              Friends since {new Date(friend.since).toLocaleDateString()}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            {friendStatus === 'none' && onAddFriend && (
              <Button
                onClick={onAddFriend}
                size="sm"
                className="flex-1 min-h-[44px]"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Friend
              </Button>
            )}
            {friendStatus === 'pending_sent' && onCancelRequest && (
              <Button
                onClick={onCancelRequest}
                variant="outline"
                size="sm"
                className="flex-1 min-h-[44px]"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel Request
              </Button>
            )}
            {friendStatus === 'pending_received' && (
              <>
                {onAcceptRequest && (
                  <Button
                    onClick={onAcceptRequest}
                    size="sm"
                    className="flex-1 min-h-[44px]"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                )}
                {onRejectRequest && (
                  <Button
                    onClick={onRejectRequest}
                    variant="outline"
                    size="sm"
                    className="min-h-[44px]"
                  >
                    <UserX className="w-4 h-4" />
                  </Button>
                )}
              </>
            )}
            {friendStatus === 'friends' && onRemoveFriend && (
              <Button
                onClick={onRemoveFriend}
                variant="outline"
                size="sm"
                className="flex-1 min-h-[44px]"
              >
                <UserX className="w-4 h-4 mr-2" />
                Remove Friend
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendCard

