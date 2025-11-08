import type { Profile } from '@/pages/Mixi/components/Profile/types'

const CURRENT_USER_ID = 'current-user'

// Mock profile data
export const mockProfile: Profile = {
  id: 'profile1',
  userId: CURRENT_USER_ID,
  bio: 'Love reading books, taking photos, and exploring new places. Always learning something new!',
  hobbies: ['Reading', 'Photography', 'Travel', 'Coding', 'Coffee'],
  icon: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
  name: 'You',
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
}

