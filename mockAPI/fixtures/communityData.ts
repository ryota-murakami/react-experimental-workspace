import type { Community, Thread } from '@/pages/Mixi/components/Community/types'

import { mockUsers } from './mixiData'

export const mockCommunities: Community[] = [
  {
    id: 'comm1',
    name: 'Book Lovers',
    description: 'Share your favorite books and discover new reads together!',
    icon: '📚',
    memberCount: 245,
    threadCount: 89,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: mockUsers[0],
    isMember: true,
    role: 'member',
    category: 'Books',
  },
  {
    id: 'comm2',
    name: 'Photography Enthusiasts',
    description: 'Showcase your photos and get feedback from fellow photographers.',
    icon: '📷',
    memberCount: 512,
    threadCount: 156,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: mockUsers[2],
    isMember: true,
    role: 'moderator',
    category: 'Photography',
  },
  {
    id: 'comm3',
    name: 'Sustainable Living',
    description: 'Tips and discussions about eco-friendly lifestyle choices.',
    icon: '🌱',
    memberCount: 189,
    threadCount: 67,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: mockUsers[3],
    isMember: false,
    category: 'Lifestyle',
  },
]

export const mockThreads: Thread[] = [
  {
    id: 'thread1',
    communityId: 'comm1',
    title: 'What are you reading this month?',
    content:
      'I just started "The Seven Husbands of Evelyn Hugo" and I\'m already hooked! What books are you all reading?',
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    commentCount: 12,
    lastCommentAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    pinned: false,
    locked: false,
    comments: [
      {
        id: 'c1',
        author: mockUsers[1],
        content: 'I\'m reading "Klara and the Sun" by Kazuo Ishiguro. Highly recommend!',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [
          {
            id: 'r1',
            author: mockUsers[0],
            content: 'I loved that book! The perspective is so unique.',
            createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
    ],
  },
  {
    id: 'thread2',
    communityId: 'comm1',
    title: 'Book Recommendations for Beginners',
    content: 'Looking for easy-to-read books to get back into reading. Any suggestions?',
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    commentCount: 8,
    lastCommentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    pinned: true,
    locked: false,
    comments: [],
  },
  {
    id: 'thread3',
    communityId: 'comm2',
    title: 'Sunset Photography Tips',
    content: 'Share your best tips for capturing beautiful sunsets!',
    author: mockUsers[2],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    commentCount: 5,
    lastCommentAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    pinned: false,
    locked: false,
    comments: [],
  },
]

