export interface User {
  id: string
  name: string
  avatar: string
}

export interface Comment {
  id: string
  author: User
  content: string
  createdAt: string
  replies?: Comment[]
}

export interface Thread {
  id: string
  communityId: string
  title: string
  content: string
  author: User
  createdAt: string
  updatedAt: string
  commentCount: number
  lastCommentAt?: string
  pinned: boolean
  locked: boolean
  comments: Comment[]
}

export interface Community {
  id: string
  name: string
  description: string
  icon?: string
  coverImage?: string
  memberCount: number
  threadCount: number
  createdAt: string
  createdBy: User
  isMember: boolean
  role?: 'member' | 'moderator' | 'admin'
  category?: string
}

