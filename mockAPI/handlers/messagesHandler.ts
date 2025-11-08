import { HttpResponse } from 'msw'
import type { ResponseResolver } from 'msw'

import type { Conversation, Message } from '@/pages/Mixi/components/Messages/types'

import { mockConversations, mockMessages } from '../fixtures/messagesData'

const CURRENT_USER_ID = 'current-user'

// In-memory stores (simulating database)
const conversations: Conversation[] = [...mockConversations]
const messages: Record<string, Message[]> = { ...mockMessages }
let messageIdCounter = 1000
let conversationIdCounter = 100

// GET /api/mixi/conversations - Get user's conversations
export const getConversationsHandler: ResponseResolver = async ({ request }) => {
  const url = new URL((request as Request).url)
  const limit = parseInt(url.searchParams.get('limit') || '50', 10)
  const offset = parseInt(url.searchParams.get('offset') || '0', 10)

  // Sort by updatedAt (most recent first)
  const sortedConversations = [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  const paginatedConversations = sortedConversations.slice(offset, offset + limit)

  return HttpResponse.json(
    {
      conversations: paginatedConversations,
      total: conversations.length,
      limit,
      offset,
    },
    { status: 200 }
  )
}

// GET /api/mixi/conversations/:id/messages - Get messages in a conversation
export const getConversationMessagesHandler: ResponseResolver = async ({ params, request }) => {
  const conversationId = (params as { id: string }).id
  const url = new URL((request as Request).url)
  const limit = parseInt(url.searchParams.get('limit') || '50', 10)
  const offset = parseInt(url.searchParams.get('offset') || '0', 10)

  const conversationMessages = messages[conversationId] || []

  // Sort by createdAt (oldest first for chat)
  const sortedMessages = [...conversationMessages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  const paginatedMessages = sortedMessages.slice(offset, offset + limit)

  return HttpResponse.json(
    {
      messages: paginatedMessages,
      total: conversationMessages.length,
      limit,
      offset,
    },
    { status: 200 }
  )
}

// POST /api/mixi/conversations - Create or get existing conversation
export const getOrCreateConversationHandler: ResponseResolver = async ({ request }) => {
  const body = (await (request as Request).json()) as { participantId: string }

  // Check if conversation already exists
  const existingConversation = conversations.find(
    (c) => c.participant.id === body.participantId
  )

  if (existingConversation) {
    return HttpResponse.json({ conversation: existingConversation }, { status: 200 })
  }

  // Create new conversation
  // In a real app, we'd fetch the participant's user data
  const participant = {
    id: body.participantId,
    name: `User ${body.participantId}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${body.participantId}`,
  }

  const newConversation: Conversation = {
    id: `conv${conversationIdCounter++}`,
    participant,
    unreadCount: 0,
    updatedAt: new Date().toISOString(),
  }

  conversations.push(newConversation)
  messages[newConversation.id] = []

  return HttpResponse.json({ conversation: newConversation }, { status: 201 })
}

// POST /api/mixi/conversations/:id/messages - Send a message
export const sendMessageHandler: ResponseResolver = async ({ params, request }) => {
  const conversationId = (params as { id: string }).id
  const body = (await (request as Request).json()) as {
    content: string
    images?: string[]
    links?: Array<{ url: string; title: string }>
  }

  const conversation = conversations.find((c) => c.id === conversationId)
  if (!conversation) {
    return HttpResponse.json({ error: 'Conversation not found' }, { status: 404 })
  }

  const sender = {
    id: CURRENT_USER_ID,
    name: 'You',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
  }

  const newMessage: Message = {
    id: `msg${messageIdCounter++}`,
    conversationId,
    sender,
    content: body.content,
    images: body.images,
    links: body.links,
    createdAt: new Date().toISOString(),
    read: false,
  }

  // Add message to conversation
  if (!messages[conversationId]) {
    messages[conversationId] = []
  }
  messages[conversationId].push(newMessage)

  // Update conversation
  const conversationIndex = conversations.findIndex((c) => c.id === conversationId)
  conversations[conversationIndex] = {
    ...conversations[conversationIndex],
    lastMessage: newMessage,
    updatedAt: new Date().toISOString(),
  }

  return HttpResponse.json({ message: newMessage }, { status: 201 })
}

// PUT /api/mixi/conversations/:id/read - Mark conversation as read
export const markConversationReadHandler: ResponseResolver = async ({ params }) => {
  const conversationId = (params as { id: string }).id
  const conversationIndex = conversations.findIndex((c) => c.id === conversationId)

  if (conversationIndex === -1) {
    return HttpResponse.json({ error: 'Conversation not found' }, { status: 404 })
  }

  // Mark all messages as read
  const conversationMessages = messages[conversationId] || []
  const now = new Date().toISOString()
  messages[conversationId] = conversationMessages.map((msg) => {
    if (msg.sender.id !== CURRENT_USER_ID && !msg.read) {
      return {
        ...msg,
        read: true,
        readAt: now,
      }
    }
    return msg
  })

  // Update conversation unread count
  conversations[conversationIndex] = {
    ...conversations[conversationIndex],
    unreadCount: 0,
  }

  return HttpResponse.json({ conversation: conversations[conversationIndex] }, { status: 200 })
}

