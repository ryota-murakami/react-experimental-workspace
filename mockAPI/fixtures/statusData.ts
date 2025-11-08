import type { StatusUpdate } from '@/pages/Mixi/components/StatusUpdates/types'

import { extendedUsers } from './friendsData'

const CURRENT_USER_ID = 'current-user'

// Mock status updates
export const mockStatusUpdates: StatusUpdate[] = [
  {
    id: 'status1',
    author: extendedUsers[0], // Sakura Tanaka
    content: 'Just finished reading an amazing book! 📚 The Art of Simple Living is truly inspiring.',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    likes: 5,
    liked: false,
  },
  {
    id: 'status2',
    author: extendedUsers[1], // Hiroshi Yamada
    content: 'Beautiful sunset today! 🌅 Sometimes the simple moments are the best.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 12,
    liked: true,
  },
  {
    id: 'status3',
    author: extendedUsers[2], // Yuki Nakamura
    content: 'Coffee and coding ☕️ Perfect morning routine.',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likes: 8,
    liked: false,
  },
  {
    id: 'status4',
    author: {
      id: CURRENT_USER_ID,
      name: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
    },
    content: 'Working on a new project. Excited to share it soon!',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    likes: 3,
    liked: false,
  },
]

