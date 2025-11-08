import { HttpResponse } from 'msw'
import type { ResponseResolver } from 'msw'

import type { Friend, FriendRequest, FriendStatus } from '@/pages/Mixi/components/Friends/types'

import { extendedUsers, mockFriendRequests, mockFriends } from '../fixtures/friendsData'

const CURRENT_USER_ID = 'current-user'

// In-memory stores (simulating database)
const friends: Friend[] = [...mockFriends]
const friendRequests: FriendRequest[] = [...mockFriendRequests]
let requestIdCounter = 100

// GET /api/mixi/friends - Get user's friends list
export const getFriendsHandler: ResponseResolver = async ({ request }) => {
  const url = new URL((request as Request).url)
  const userId = url.searchParams.get('userId') || CURRENT_USER_ID

  const userFriends = friends.filter((f) => f.user.id === userId || f.user.id === CURRENT_USER_ID)

  return HttpResponse.json({ friends: userFriends }, { status: 200 })
}

// GET /api/mixi/friends/requests - Get friend requests
export const getFriendRequestsHandler: ResponseResolver = async ({ request }) => {
  const url = new URL((request as Request).url)
  const type = url.searchParams.get('type') || 'all' // 'sent', 'received', 'all'

  let filteredRequests = friendRequests.filter((r) => r.status === 'pending')

  if (type === 'sent') {
    filteredRequests = filteredRequests.filter((r) => r.from.id === CURRENT_USER_ID)
  } else if (type === 'received') {
    filteredRequests = filteredRequests.filter((r) => r.to.id === CURRENT_USER_ID)
  }

  return HttpResponse.json({ requests: filteredRequests }, { status: 200 })
}

// POST /api/mixi/friends/requests - Send friend request
export const sendFriendRequestHandler: ResponseResolver = async ({ request }) => {
  const body = (await (request as Request).json()) as { toUserId: string }

  // Check if already friends
  const isAlreadyFriend = friends.some(
    (f) =>
      (f.user.id === CURRENT_USER_ID && f.user.id === body.toUserId) ||
      (f.user.id === body.toUserId && f.user.id === CURRENT_USER_ID)
  )

  if (isAlreadyFriend) {
    return HttpResponse.json({ error: 'Already friends' }, { status: 400 })
  }

  // Check if request already exists
  const existingRequest = friendRequests.find(
    (r) =>
      ((r.from.id === CURRENT_USER_ID && r.to.id === body.toUserId) ||
        (r.from.id === body.toUserId && r.to.id === CURRENT_USER_ID)) &&
      r.status === 'pending'
  )

  if (existingRequest) {
    return HttpResponse.json({ error: 'Friend request already exists' }, { status: 400 })
  }

  const fromUser = extendedUsers.find((u) => u.id === CURRENT_USER_ID) || extendedUsers[4]
  const toUser = extendedUsers.find((u) => u.id === body.toUserId)

  if (!toUser) {
    return HttpResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const newRequest: FriendRequest = {
    id: `req${requestIdCounter++}`,
    from: fromUser,
    to: toUser,
    createdAt: new Date().toISOString(),
    status: 'pending',
  }

  friendRequests.push(newRequest)

  return HttpResponse.json({ request: newRequest }, { status: 201 })
}

// POST /api/mixi/friends/requests/:id/accept - Accept friend request
export const acceptFriendRequestHandler: ResponseResolver = async ({ params }) => {
  const requestId = (params as { id: string }).id
  const requestIndex = friendRequests.findIndex((r) => r.id === requestId)

  if (requestIndex === -1) {
    return HttpResponse.json({ error: 'Friend request not found' }, { status: 404 })
  }

  const request = friendRequests[requestIndex]

  if (request.to.id !== CURRENT_USER_ID) {
    return HttpResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  if (request.status !== 'pending') {
    return HttpResponse.json({ error: 'Request already processed' }, { status: 400 })
  }

  // Update request status
  friendRequests[requestIndex] = {
    ...request,
    status: 'accepted',
  }

  // Create friendship
  const newFriend: Friend = {
    id: `friend${Date.now()}`,
    user: request.from,
    since: new Date().toISOString(),
    mutualFriends: [],
  }

  friends.push(newFriend)

  return HttpResponse.json({ friend: newFriend, request: friendRequests[requestIndex] }, { status: 200 })
}

// POST /api/mixi/friends/requests/:id/reject - Reject friend request
export const rejectFriendRequestHandler: ResponseResolver = async ({ params }) => {
  const requestId = (params as { id: string }).id
  const requestIndex = friendRequests.findIndex((r) => r.id === requestId)

  if (requestIndex === -1) {
    return HttpResponse.json({ error: 'Friend request not found' }, { status: 404 })
  }

  const request = friendRequests[requestIndex]

  if (request.to.id !== CURRENT_USER_ID) {
    return HttpResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  friendRequests[requestIndex] = {
    ...request,
    status: 'rejected',
  }

  return HttpResponse.json({ request: friendRequests[requestIndex] }, { status: 200 })
}

// DELETE /api/mixi/friends/requests/:id - Cancel friend request
export const cancelFriendRequestHandler: ResponseResolver = async ({ params }) => {
  const requestId = (params as { id: string }).id
  const requestIndex = friendRequests.findIndex((r) => r.id === requestId)

  if (requestIndex === -1) {
    return HttpResponse.json({ error: 'Friend request not found' }, { status: 404 })
  }

  const request = friendRequests[requestIndex]

  if (request.from.id !== CURRENT_USER_ID) {
    return HttpResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  friendRequests.splice(requestIndex, 1)

  return HttpResponse.json({ message: 'Request cancelled' }, { status: 200 })
}

// DELETE /api/mixi/friends/:id - Remove friend
export const removeFriendHandler: ResponseResolver = async ({ params }) => {
  const friendId = (params as { id: string }).id
  const friendIndex = friends.findIndex((f) => f.id === friendId)

  if (friendIndex === -1) {
    return HttpResponse.json({ error: 'Friend not found' }, { status: 404 })
  }

  friends.splice(friendIndex, 1)

  return HttpResponse.json({ message: 'Friend removed' }, { status: 200 })
}

// GET /api/mixi/users/search - Search users
export const searchUsersHandler: ResponseResolver = async ({ request }) => {
  const url = new URL((request as Request).url)
  const query = url.searchParams.get('q') || ''

  if (!query.trim()) {
    return HttpResponse.json({ users: [] }, { status: 200 })
  }

  const filteredUsers = extendedUsers.filter(
    (u) =>
      u.id !== CURRENT_USER_ID &&
      (u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.bio?.toLowerCase().includes(query.toLowerCase()))
  )

  // Add friend status
  const usersWithStatus = filteredUsers.map((user) => {
    const isFriend = friends.some((f) => f.user.id === user.id)
    const sentRequest = friendRequests.some(
      (r) => r.from.id === CURRENT_USER_ID && r.to.id === user.id && r.status === 'pending'
    )
    const receivedRequest = friendRequests.some(
      (r) => r.from.id === user.id && r.to.id === CURRENT_USER_ID && r.status === 'pending'
    )

    let friendStatus: FriendStatus = 'none'
    if (isFriend) {
      friendStatus = 'friends'
    } else if (sentRequest) {
      friendStatus = 'pending_sent'
    } else if (receivedRequest) {
      friendStatus = 'pending_received'
    }

    return {
      ...user,
      friendStatus,
    }
  })

  return HttpResponse.json({ users: usersWithStatus }, { status: 200 })
}

// GET /api/mixi/friends/mutual/:userId - Get mutual friends
export const getMutualFriendsHandler: ResponseResolver = async ({ params }) => {
  const userId = (params as { userId: string }).userId

  const userFriends = friends.filter((f) => f.user.id === userId).map((f) => f.user.id)
  const currentUserFriends = friends.filter((f) => f.user.id === CURRENT_USER_ID).map((f) => f.user.id)

  const mutualFriendIds = userFriends.filter((id) => currentUserFriends.includes(id))
  const mutualFriends = extendedUsers.filter((u) => mutualFriendIds.includes(u.id))

  return HttpResponse.json({ mutualFriends }, { status: 200 })
}

