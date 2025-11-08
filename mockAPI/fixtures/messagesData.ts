import type { Conversation, Message } from '@/pages/Mixi/components/Messages/types'

import { extendedUsers } from './friendsData'

const CURRENT_USER_ID = 'current-user'

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participant: extendedUsers[0], // Sakura Tanaka
    lastMessage: {
      id: 'msg1',
      conversationId: 'conv1',
      sender: extendedUsers[0],
      content: 'Thanks for the book recommendation! I started reading it yesterday.',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'conv2',
    participant: extendedUsers[2], // Yuki Nakamura
    lastMessage: {
      id: 'msg2',
      conversationId: 'conv2',
      sender: {
        id: CURRENT_USER_ID,
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      },
      content: 'Those sunset photos are amazing! What camera do you use?',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'conv3',
    participant: extendedUsers[1], // Hiroshi Yamada
    lastMessage: {
      id: 'msg3',
      conversationId: 'conv3',
      sender: extendedUsers[1],
      content: 'Hey! Are you free this weekend?',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
    },
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
]

// Mock messages for conversations
export const mockMessages: Record<string, Message[]> = {
  conv1: [
    {
      id: 'msg1-1',
      conversationId: 'conv1',
      sender: {
        id: CURRENT_USER_ID,
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      },
      content: 'Hi! I saw your post about "The Art of Simple Living". Would you recommend it?',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      readAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
    },
    {
      id: 'msg1-2',
      conversationId: 'conv1',
      sender: extendedUsers[0],
      content: 'Yes, absolutely! It\'s a wonderful book about finding peace in daily life.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: 'msg1-3',
      conversationId: 'conv1',
      sender: {
        id: CURRENT_USER_ID,
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      },
      content: 'That sounds perfect for me right now. I\'ll check it out!',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString(),
      read: true,
      readAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 20 * 60 * 1000).toISOString(),
    },
    {
      id: 'msg1-4',
      conversationId: 'conv1',
      sender: extendedUsers[0],
      content: 'Thanks for the book recommendation! I started reading it yesterday.',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ],
  conv2: [
    {
      id: 'msg2-1',
      conversationId: 'conv2',
      sender: extendedUsers[2],
      content: 'Check out this amazing sunset I captured today!',
      images: ['https://picsum.photos/800/600?random=sunset'],
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: 'msg2-2',
      conversationId: 'conv2',
      sender: {
        id: CURRENT_USER_ID,
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      },
      content: 'Those sunset photos are amazing! What camera do you use?',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      read: true,
      readAt: new Date(Date.now() - 3 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(),
    },
  ],
  conv3: [
    {
      id: 'msg3-1',
      conversationId: 'conv3',
      sender: extendedUsers[1],
      content: 'Hey! Are you free this weekend?',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
    },
  ],
}

