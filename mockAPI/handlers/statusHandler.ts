import { HttpResponse } from 'msw'
import type { ResponseResolver } from 'msw'

import type { StatusUpdate } from '@/pages/Mixi/components/StatusUpdates/types'

import { mockStatusUpdates } from '../fixtures/statusData'

// In-memory stores (simulating database)
const statusUpdates: StatusUpdate[] = [...mockStatusUpdates]
let statusIdCounter = 100

// GET /api/mixi/statuses - Get status updates
export const getStatusesHandler: ResponseResolver = async ({ request }) => {
  const url = new URL((request as Request).url)
  const limit = parseInt(url.searchParams.get('limit') || '50', 10)
  const offset = parseInt(url.searchParams.get('offset') || '0', 10)
  const userId = url.searchParams.get('userId')

  let filteredStatuses = [...statusUpdates]

  // Filter by user if userId provided
  if (userId) {
    filteredStatuses = filteredStatuses.filter((s) => s.author.id === userId)
  }

  // Sort by createdAt (most recent first)
  const sortedStatuses = filteredStatuses.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const paginatedStatuses = sortedStatuses.slice(offset, offset + limit)

  return HttpResponse.json(
    {
      statuses: paginatedStatuses,
      total: filteredStatuses.length,
      limit,
      offset,
    },
    { status: 200 }
  )
}

// POST /api/mixi/statuses - Create a status update
export const createStatusHandler: ResponseResolver = async ({ request }) => {
  const body = (await (request as Request).json()) as {
    content: string
    author: { id: string; name: string; avatar: string }
  }

  // Validate content length (280 characters max)
  if (body.content.length > 280) {
    return HttpResponse.json({ error: 'Status update must be 280 characters or less' }, { status: 400 })
  }

  if (!body.content.trim()) {
    return HttpResponse.json({ error: 'Content cannot be empty' }, { status: 400 })
  }

  const newStatus: StatusUpdate = {
    id: `status${statusIdCounter++}`,
    author: body.author,
    content: body.content.trim(),
    createdAt: new Date().toISOString(),
    likes: 0,
    liked: false,
  }

  statusUpdates.unshift(newStatus)

  return HttpResponse.json({ status: newStatus }, { status: 201 })
}

// PUT /api/mixi/statuses/:id/like - Toggle like on a status
export const toggleStatusLikeHandler: ResponseResolver = async ({ params }) => {
  const statusId = (params as { id: string }).id
  const statusIndex = statusUpdates.findIndex((s) => s.id === statusId)

  if (statusIndex === -1) {
    return HttpResponse.json({ error: 'Status not found' }, { status: 404 })
  }

  const status = statusUpdates[statusIndex]
  const wasLiked = status.liked

  statusUpdates[statusIndex] = {
    ...status,
    liked: !wasLiked,
    likes: wasLiked ? status.likes - 1 : status.likes + 1,
  }

  return HttpResponse.json({ status: statusUpdates[statusIndex] }, { status: 200 })
}

