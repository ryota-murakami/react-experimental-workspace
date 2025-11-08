export interface User {
  id: string
  name: string
  avatar: string
  bio?: string
  mutualFriends?: number
}

export interface Friend {
  id: string
  user: User
  since: string
  mutualFriends: User[]
}

export interface FriendRequest {
  id: string
  from: User
  to: User
  createdAt: string
  status: 'pending' | 'accepted' | 'rejected'
}

export type FriendStatus = 'none' | 'pending_sent' | 'pending_received' | 'friends'

