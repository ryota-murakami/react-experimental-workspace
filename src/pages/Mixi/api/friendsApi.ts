import type { Friend, FriendRequest, FriendStatus, User } from '../components/Friends/types'

const API_BASE = '/api/mixi'

interface GetFriendsResponse {
  friends: Friend[]
}

interface GetFriendRequestsResponse {
  requests: FriendRequest[]
}

interface SearchUsersResponse {
  users: (User & { friendStatus: FriendStatus })[]
}

interface GetMutualFriendsResponse {
  mutualFriends: User[]
}

/**
 * Fetch user's friends list
 */
export async function getFriends(userId?: string): Promise<GetFriendsResponse> {
  const searchParams = new URLSearchParams()
  if (userId) searchParams.set('userId', userId)

  const response = await fetch(`${API_BASE}/friends?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch friends')
  }
  return response.json()
}

/**
 * Fetch friend requests
 */
export async function getFriendRequests(
  type?: 'sent' | 'received' | 'all'
): Promise<GetFriendRequestsResponse> {
  const searchParams = new URLSearchParams()
  if (type) searchParams.set('type', type)

  const response = await fetch(`${API_BASE}/friends/requests?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch friend requests')
  }
  return response.json()
}

/**
 * Send a friend request
 */
export async function sendFriendRequest(toUserId: string): Promise<{ request: FriendRequest }> {
  const response = await fetch(`${API_BASE}/friends/requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ toUserId }),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to send friend request')
  }
  return response.json()
}

/**
 * Accept a friend request
 */
export async function acceptFriendRequest(requestId: string): Promise<{
  friend: Friend
  request: FriendRequest
}> {
  const response = await fetch(`${API_BASE}/friends/requests/${requestId}/accept`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Failed to accept friend request')
  }
  return response.json()
}

/**
 * Reject a friend request
 */
export async function rejectFriendRequest(requestId: string): Promise<{ request: FriendRequest }> {
  const response = await fetch(`${API_BASE}/friends/requests/${requestId}/reject`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Failed to reject friend request')
  }
  return response.json()
}

/**
 * Cancel a sent friend request
 */
export async function cancelFriendRequest(requestId: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE}/friends/requests/${requestId}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to cancel friend request')
  }
  return response.json()
}

/**
 * Remove a friend
 */
export async function removeFriend(friendId: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE}/friends/${friendId}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to remove friend')
  }
  return response.json()
}

/**
 * Search users
 */
export async function searchUsers(query: string): Promise<SearchUsersResponse> {
  const searchParams = new URLSearchParams()
  searchParams.set('q', query)

  const response = await fetch(`${API_BASE}/users/search?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to search users')
  }
  const data = await response.json()
  return data as SearchUsersResponse
}

/**
 * Get mutual friends with a user
 */
export async function getMutualFriends(userId: string): Promise<GetMutualFriendsResponse> {
  const response = await fetch(`${API_BASE}/friends/mutual/${userId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch mutual friends')
  }
  return response.json()
}

