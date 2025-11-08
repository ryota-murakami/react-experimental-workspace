export interface User {
  id: string
  name: string
  avatar: string
}

export interface Message {
  id: string
  conversationId: string
  sender: User
  content: string
  images?: string[]
  links?: Array<{ url: string; title: string }>
  createdAt: string
  read: boolean
  readAt?: string
}

export interface Conversation {
  id: string
  participant: User
  lastMessage?: Message
  unreadCount: number
  updatedAt: string
}

