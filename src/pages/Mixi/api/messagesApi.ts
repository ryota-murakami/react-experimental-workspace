import type { Conversation, Message } from '../components/Messages/types'

const API_BASE = '/api/mixi'

interface GetConversationsResponse {
  conversations: Conversation[]
  total: number
  limit: number
  offset: number
}

interface GetMessagesResponse {
  messages: Message[]
  total: number
  limit: number
  offset: number
}

interface SendMessageRequest {
  content: string
  images?: string[]
  links?: Array<{ url: string; title: string }>
}

/**
 * Fetch user's conversations
 */
export async function getConversations(params?: {
  limit?: number
  offset?: number
}): Promise<GetConversationsResponse> {
  const searchParams = new URLSearchParams()
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.offset) searchParams.set('offset', params.offset.toString())

  const response = await fetch(`${API_BASE}/conversations?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch conversations')
  }
  return response.json()
}

/**
 * Get or create a conversation with a user
 */
export async function getOrCreateConversation(
  participantId: string
): Promise<{ conversation: Conversation }> {
  const response = await fetch(`${API_BASE}/conversations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ participantId }),
  })
  if (!response.ok) {
    throw new Error('Failed to get or create conversation')
  }
  return response.json()
}

/**
 * Fetch messages in a conversation
 */
export async function getConversationMessages(
  conversationId: string,
  params?: { limit?: number; offset?: number }
): Promise<GetMessagesResponse> {
  const searchParams = new URLSearchParams()
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.offset) searchParams.set('offset', params.offset.toString())

  const response = await fetch(
    `${API_BASE}/conversations/${conversationId}/messages?${searchParams.toString()}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch messages')
  }
  return response.json()
}

/**
 * Send a message in a conversation
 */
export async function sendMessage(
  conversationId: string,
  data: SendMessageRequest
): Promise<{ message: Message }> {
  const response = await fetch(`${API_BASE}/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to send message')
  }
  return response.json()
}

/**
 * Mark conversation as read
 */
export async function markConversationRead(
  conversationId: string
): Promise<{ conversation: Conversation }> {
  const response = await fetch(`${API_BASE}/conversations/${conversationId}/read`, {
    method: 'PUT',
  })
  if (!response.ok) {
    throw new Error('Failed to mark conversation as read')
  }
  return response.json()
}

