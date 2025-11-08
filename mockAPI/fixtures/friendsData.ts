import type { Friend, FriendRequest, User } from '@/pages/Mixi/components/Friends/types'

import { mockUsers } from './mixiData'

// Extended users with bio
export const extendedUsers: User[] = [
  ...mockUsers,
  {
    id: 'user5',
    name: 'Emi Suzuki',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emi',
    bio: 'Love reading and photography',
  },
  {
    id: 'user6',
    name: 'Takeshi Watanabe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Takeshi',
    bio: 'Tech enthusiast and coffee lover',
  },
]

// Mock friends (mutual connections)
export const mockFriends: Friend[] = [
  {
    id: 'friend1',
    user: extendedUsers[0], // Sakura Tanaka
    since: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    mutualFriends: [extendedUsers[1], extendedUsers[2]],
  },
  {
    id: 'friend2',
    user: extendedUsers[2], // Yuki Nakamura
    since: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    mutualFriends: [extendedUsers[0]],
  },
]

// Mock friend requests
export const mockFriendRequests: FriendRequest[] = [
  {
    id: 'req1',
    from: extendedUsers[3], // Kenji Sato
    to: extendedUsers[4], // current-user
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: 'req2',
    from: extendedUsers[4], // current-user
    to: extendedUsers[5], // Emi Suzuki
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  },
]

