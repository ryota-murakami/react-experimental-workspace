import type { Post } from '../components/DiaryFeed'

const API_BASE = '/api/mixi'

interface GetPostsResponse {
  posts: Post[]
  total: number
  limit: number
  offset: number
}

interface CreatePostRequest {
  author: {
    id: string
    name: string
    avatar: string
  }
  content: string
  visibility: 'public' | 'friends' | 'specific'
  images?: string[]
  links?: Array<{ url: string; title: string }>
}

interface AddCommentRequest {
  content: string
  authorId: string
}

interface AddReplyRequest {
  content: string
  authorId: string
}

/**
 * Fetch all posts with optional filters
 */
export async function getPosts(params?: {
  visibility?: 'public' | 'friends' | 'specific' | 'all'
  limit?: number
  offset?: number
}): Promise<GetPostsResponse> {
  const searchParams = new URLSearchParams()
  if (params?.visibility) searchParams.set('visibility', params.visibility)
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.offset) searchParams.set('offset', params.offset.toString())

  const response = await fetch(`${API_BASE}/posts?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  return response.json()
}

/**
 * Fetch a single post by ID
 */
export async function getPost(postId: string): Promise<{ post: Post }> {
  const response = await fetch(`${API_BASE}/posts/${postId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch post')
  }
  return response.json()
}

/**
 * Create a new diary post
 */
export async function createPost(data: CreatePostRequest): Promise<{ post: Post }> {
  const response = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create post')
  }
  return response.json()
}

/**
 * Toggle like on a post
 */
export async function toggleLike(postId: string): Promise<{ post: Post; liked: boolean; likes: number }> {
  const response = await fetch(`${API_BASE}/posts/${postId}/like`, {
    method: 'PUT',
  })
  if (!response.ok) {
    throw new Error('Failed to toggle like')
  }
  return response.json()
}

/**
 * Add a comment to a post
 */
export async function addComment(
  postId: string,
  data: AddCommentRequest
): Promise<{ comment: Post['comments'][0] }> {
  const response = await fetch(`${API_BASE}/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to add comment')
  }
  return response.json()
}

/**
 * Add a reply to a comment
 */
export async function addReply(
  postId: string,
  commentId: string,
  data: AddReplyRequest
): Promise<{ reply: Post['comments'][0] }> {
  const response = await fetch(`${API_BASE}/posts/${postId}/comments/${commentId}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to add reply')
  }
  return response.json()
}

/**
 * Get user profile
 */
export async function getUser(userId: string): Promise<{ user: { id: string; name: string; avatar: string } }> {
  const response = await fetch(`${API_BASE}/users/${userId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

// Re-export community API functions
export {
  addThreadComment,
  addThreadReply,
  createCommunity,
  createThread,
  getCommunities,
  getCommunity,
  getCommunityThreads,
  joinCommunity,
  leaveCommunity,
} from './communityApi'

