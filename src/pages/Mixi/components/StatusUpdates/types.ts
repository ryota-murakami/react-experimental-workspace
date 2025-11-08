export interface User {
  id: string
  name: string
  avatar: string
}

export interface StatusUpdate {
  id: string
  author: User
  content: string
  createdAt: string
  likes: number
  liked: boolean
}

