import { HttpResponse } from 'msw'
import type { ResponseResolver } from 'msw'

import type { Community, Thread } from '@/pages/Mixi/components/Community/types'

import { mockCommunities, mockThreads } from '../fixtures/communityData'
import { mockUsers } from '../fixtures/mixiData'


// In-memory stores (simulating database)
const communities: Community[] = [...mockCommunities]
const threads: Thread[] = [...mockThreads]
let communityIdCounter = 100
let threadIdCounter = 1000

// GET /api/mixi/communities - Get all communities
export const getCommunitiesHandler: ResponseResolver = async ({ request }) => {
  const url = new URL((request as Request).url)
  const category = url.searchParams.get('category')
  const joined = url.searchParams.get('joined') === 'true'

  let filteredCommunities = [...communities]

  if (category) {
    filteredCommunities = filteredCommunities.filter((c) => c.category === category)
  }

  if (joined) {
    filteredCommunities = filteredCommunities.filter((c) => c.isMember)
  }

  return HttpResponse.json({ communities: filteredCommunities }, { status: 200 })
}

// GET /api/mixi/communities/:id - Get single community
export const getCommunityHandler: ResponseResolver = async ({ params }) => {
  const communityId = (params as { id: string }).id
  const community = communities.find((c) => c.id === communityId)

  if (!community) {
    return HttpResponse.json({ error: 'Community not found' }, { status: 404 })
  }

  return HttpResponse.json({ community }, { status: 200 })
}

// POST /api/mixi/communities - Create new community
export const createCommunityHandler: ResponseResolver = async ({ request }) => {
  const body = (await (request as Request).json()) as Omit<
    Community,
    'id' | 'createdAt' | 'memberCount' | 'threadCount' | 'isMember'
  >

  const newCommunity: Community = {
    ...body,
    id: `comm${communityIdCounter++}`,
    createdAt: new Date().toISOString(),
    memberCount: 1,
    threadCount: 0,
    isMember: true,
    role: 'admin',
  }

  communities.push(newCommunity)

  return HttpResponse.json({ community: newCommunity }, { status: 201 })
}

// POST /api/mixi/communities/:id/join - Join community
export const joinCommunityHandler: ResponseResolver = async ({ params }) => {
  const communityId = (params as { id: string }).id
  const communityIndex = communities.findIndex((c) => c.id === communityId)

  if (communityIndex === -1) {
    return HttpResponse.json({ error: 'Community not found' }, { status: 404 })
  }

  const community = communities[communityIndex]
  if (community.isMember) {
    return HttpResponse.json({ error: 'Already a member' }, { status: 400 })
  }

  communities[communityIndex] = {
    ...community,
    isMember: true,
    memberCount: community.memberCount + 1,
    role: 'member',
  }

  return HttpResponse.json({ community: communities[communityIndex] }, { status: 200 })
}

// POST /api/mixi/communities/:id/leave - Leave community
export const leaveCommunityHandler: ResponseResolver = async ({ params }) => {
  const communityId = (params as { id: string }).id
  const communityIndex = communities.findIndex((c) => c.id === communityId)

  if (communityIndex === -1) {
    return HttpResponse.json({ error: 'Community not found' }, { status: 404 })
  }

  const community = communities[communityIndex]
  if (!community.isMember) {
    return HttpResponse.json({ error: 'Not a member' }, { status: 400 })
  }

  communities[communityIndex] = {
    ...community,
    isMember: false,
    memberCount: Math.max(0, community.memberCount - 1),
    role: undefined,
  }

  return HttpResponse.json({ community: communities[communityIndex] }, { status: 200 })
}

// GET /api/mixi/communities/:id/threads - Get threads in community
export const getCommunityThreadsHandler: ResponseResolver = async ({ params, request }) => {
  const communityId = (params as { id: string }).id
  const url = new URL((request as Request).url)
  const limit = parseInt(url.searchParams.get('limit') || '50', 10)
  const offset = parseInt(url.searchParams.get('offset') || '0', 10)

  const filteredThreads = threads.filter((t) => t.communityId === communityId)

  // Sort: pinned first, then by lastCommentAt or createdAt
  filteredThreads.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    const aTime = a.lastCommentAt || a.updatedAt
    const bTime = b.lastCommentAt || b.updatedAt
    return new Date(bTime).getTime() - new Date(aTime).getTime()
  })

  const paginatedThreads = filteredThreads.slice(offset, offset + limit)

  return HttpResponse.json(
    {
      threads: paginatedThreads,
      total: filteredThreads.length,
      limit,
      offset,
    },
    { status: 200 }
  )
}

// GET /api/mixi/threads/:id - Get single thread
export const getThreadHandler: ResponseResolver = async ({ params }) => {
  const threadId = (params as { id: string }).id
  const thread = threads.find((t) => t.id === threadId)

  if (!thread) {
    return HttpResponse.json({ error: 'Thread not found' }, { status: 404 })
  }

  return HttpResponse.json({ thread }, { status: 200 })
}

// POST /api/mixi/communities/:id/threads - Create new thread
export const createThreadHandler: ResponseResolver = async ({ params, request }) => {
  const communityId = (params as { id: string }).id
  const body = (await (request as Request).json()) as {
    title: string
    content: string
    authorId: string
  }

  const communityIndex = communities.findIndex((c) => c.id === communityId)
  if (communityIndex === -1) {
    return HttpResponse.json({ error: 'Community not found' }, { status: 404 })
  }

  const author = mockUsers.find((u) => u.id === body.authorId) || mockUsers[4]

  const newThread: Thread = {
    id: `thread${threadIdCounter++}`,
    communityId,
    title: body.title,
    content: body.content,
    author,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    commentCount: 0,
    pinned: false,
    locked: false,
    comments: [],
  }

  threads.unshift(newThread)
  communities[communityIndex] = {
    ...communities[communityIndex],
    threadCount: communities[communityIndex].threadCount + 1,
  }

  return HttpResponse.json({ thread: newThread }, { status: 201 })
}

// POST /api/mixi/threads/:id/comments - Add comment to thread
export const addThreadCommentHandler: ResponseResolver = async ({ params, request }) => {
  const threadId = (params as { id: string }).id
  const body = (await (request as Request).json()) as { content: string; authorId: string }

  const threadIndex = threads.findIndex((t) => t.id === threadId)

  if (threadIndex === -1) {
    return HttpResponse.json({ error: 'Thread not found' }, { status: 404 })
  }

  const author = mockUsers.find((u) => u.id === body.authorId) || mockUsers[4]

  const newComment: Thread['comments'][0] = {
    id: `c-${Date.now()}`,
    author,
    content: body.content,
    createdAt: new Date().toISOString(),
  }

  threads[threadIndex] = {
    ...threads[threadIndex],
    comments: [...threads[threadIndex].comments, newComment],
    commentCount: threads[threadIndex].commentCount + 1,
    updatedAt: new Date().toISOString(),
    lastCommentAt: new Date().toISOString(),
  }

  return HttpResponse.json({ comment: newComment }, { status: 201 })
}

// POST /api/mixi/threads/:threadId/comments/:commentId/replies - Add reply to thread comment
export const addThreadReplyHandler: ResponseResolver = async ({ params, request }) => {
  const { threadId, commentId } = params as { threadId: string; commentId: string }
  const body = (await (request as Request).json()) as { content: string; authorId: string }

  const threadIndex = threads.findIndex((t) => t.id === threadId)

  if (threadIndex === -1) {
    return HttpResponse.json({ error: 'Thread not found' }, { status: 404 })
  }

  const author = mockUsers.find((u) => u.id === body.authorId) || mockUsers[4]

  const newReply: Thread['comments'][0] = {
    id: `r-${Date.now()}`,
    author,
    content: body.content,
    createdAt: new Date().toISOString(),
  }

  threads[threadIndex] = {
    ...threads[threadIndex],
    comments: threads[threadIndex].comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        }
      }
      return comment
    }),
    updatedAt: new Date().toISOString(),
    lastCommentAt: new Date().toISOString(),
  }

  return HttpResponse.json({ reply: newReply }, { status: 201 })
}

