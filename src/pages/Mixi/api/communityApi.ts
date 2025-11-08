import type { Community, Thread } from '../components/Community/types'

const API_BASE = '/api/mixi'

interface GetCommunitiesResponse {
  communities: Community[]
}

interface GetCommunityThreadsResponse {
  threads: Thread[]
  total: number
  limit: number
  offset: number
}

interface CreateCommunityRequest {
  name: string
  description: string
  icon?: string
  category?: string
  createdBy: {
    id: string
    name: string
    avatar: string
  }
}

interface CreateThreadRequest {
  title: string
  content: string
  authorId: string
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
 * Fetch all communities
 */
export async function getCommunities(params?: {
  category?: string
  joined?: boolean
}): Promise<GetCommunitiesResponse> {
  const searchParams = new URLSearchParams()
  if (params?.category) searchParams.set('category', params.category)
  if (params?.joined) searchParams.set('joined', 'true')

  const response = await fetch(`${API_BASE}/communities?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch communities')
  }
  return response.json()
}

/**
 * Fetch a single community by ID
 */
export async function getCommunity(communityId: string): Promise<{ community: Community }> {
  const response = await fetch(`${API_BASE}/communities/${communityId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch community')
  }
  return response.json()
}

/**
 * Create a new community
 */
export async function createCommunity(data: CreateCommunityRequest): Promise<{ community: Community }> {
  const response = await fetch(`${API_BASE}/communities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create community')
  }
  return response.json()
}

/**
 * Join a community
 */
export async function joinCommunity(communityId: string): Promise<{ community: Community }> {
  const response = await fetch(`${API_BASE}/communities/${communityId}/join`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Failed to join community')
  }
  return response.json()
}

/**
 * Leave a community
 */
export async function leaveCommunity(communityId: string): Promise<{ community: Community }> {
  const response = await fetch(`${API_BASE}/communities/${communityId}/leave`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Failed to leave community')
  }
  return response.json()
}

/**
 * Fetch threads in a community
 */
export async function getCommunityThreads(
  communityId: string,
  params?: { limit?: number; offset?: number }
): Promise<GetCommunityThreadsResponse> {
  const searchParams = new URLSearchParams()
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.offset) searchParams.set('offset', params.offset.toString())

  const response = await fetch(
    `${API_BASE}/communities/${communityId}/threads?${searchParams.toString()}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch threads')
  }
  return response.json()
}

/**
 * Fetch a single thread by ID
 */
export async function getThread(threadId: string): Promise<{ thread: Thread }> {
  const response = await fetch(`${API_BASE}/threads/${threadId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch thread')
  }
  return response.json()
}

/**
 * Create a new thread in a community
 */
export async function createThread(
  communityId: string,
  data: CreateThreadRequest
): Promise<{ thread: Thread }> {
  const response = await fetch(`${API_BASE}/communities/${communityId}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create thread')
  }
  return response.json()
}

/**
 * Add a comment to a thread
 */
export async function addThreadComment(
  threadId: string,
  data: AddCommentRequest
): Promise<{ comment: Thread['comments'][0] }> {
  const response = await fetch(`${API_BASE}/threads/${threadId}/comments`, {
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
 * Add a reply to a thread comment
 */
export async function addThreadReply(
  threadId: string,
  commentId: string,
  data: AddReplyRequest
): Promise<{ reply: Thread['comments'][0] }> {
  const response = await fetch(`${API_BASE}/threads/${threadId}/comments/${commentId}/replies`, {
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

