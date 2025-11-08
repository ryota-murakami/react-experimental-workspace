import type { Post } from '@/pages/Mixi/components/DiaryFeed'

// Mock users
export const mockUsers = [
  {
    id: 'user1',
    name: 'Sakura Tanaka',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura',
  },
  {
    id: 'user2',
    name: 'Hiroshi Yamada',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi',
  },
  {
    id: 'user3',
    name: 'Yuki Nakamura',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki',
  },
  {
    id: 'user4',
    name: 'Kenji Sato',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji',
  },
  {
    id: 'current-user',
    name: 'You',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
  },
]

// Mock posts data
export const mockPosts: Post[] = [
  {
    id: '1',
    author: mockUsers[0],
    content:
      'Just finished reading a great book! 📚\n\nHighly recommend "The Art of Simple Living" by Shunmyo Masuno. It really helped me find peace in my daily routine.',
    visibility: 'public',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 12,
    liked: false,
    comments: [
      {
        id: 'c1',
        author: mockUsers[1],
        content: "Sounds interesting! I'll add it to my reading list.",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        replies: [
          {
            id: 'r1',
            author: mockUsers[0],
            content: 'Let me know what you think when you finish it!',
            createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          },
        ],
      },
    ],
  },
  {
    id: '2',
    author: mockUsers[2],
    content:
      'Beautiful sunset today 🌅\n\nSometimes the simplest moments are the most precious.',
    visibility: 'friends',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 8,
    liked: true,
    images: ['https://picsum.photos/800/600?random=1'],
    comments: [],
  },
  {
    id: '3',
    author: mockUsers[3],
    content: 'Found an amazing article about sustainable living.',
    visibility: 'public',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: 5,
    liked: false,
    links: [
      {
        url: 'https://example.com/sustainable-living',
        title: '10 Ways to Live More Sustainably',
      },
    ],
    comments: [
      {
        id: 'c2',
        author: mockUsers[0],
        content: 'Thanks for sharing! This is really helpful.',
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
]

