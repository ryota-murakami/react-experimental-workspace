import type { StatusUpdate } from '../components/StatusUpdates/types'

const API_BASE = '/api/mixi'

interface GetStatusesResponse {
  statuses: StatusUpdate[]
  total: number
  limit: number
  offset: number
}

interface CreateStatusRequest {
  content: string
  author: {
    id: string
    name: string
    avatar: string
  }
}

/**
 * Fetch status updates
 */
export async function getStatuses(params?: {
  limit?: number
  offset?: number
  userId?: string
}): Promise<GetStatusesResponse> {
  const searchParams = new URLSearchParams()
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.offset) searchParams.set('offset', params.offset.toString())
  if (params?.userId) searchParams.set('userId', params.userId)

  const response = await fetch(`${API_BASE}/statuses?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch status updates')
  }
  return response.json()
}

/**
 * Create a status update
 */
export async function createStatus(
  data: CreateStatusRequest
): Promise<{ status: StatusUpdate }> {
  const response = await fetch(`${API_BASE}/statuses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create status update')
  }
  return response.json()
}

/**
 * Toggle like on a status update
 */
export async function toggleStatusLike(statusId: string): Promise<{ status: StatusUpdate }> {
  const response = await fetch(`${API_BASE}/statuses/${statusId}/like`, {
    method: 'PUT',
  })
  if (!response.ok) {
    throw new Error('Failed to toggle like')
  }
  return response.json()
}

