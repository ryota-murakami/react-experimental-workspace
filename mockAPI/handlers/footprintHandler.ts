import { HttpResponse } from 'msw'
import type { ResponseResolver } from 'msw'

import type { Footprint, FootprintSettings } from '@/pages/Mixi/components/Footprint/types'

import { mockFootprints } from '../fixtures/footprintData'

const CURRENT_USER_ID = 'current-user'

// In-memory stores (simulating database)
let footprints: Footprint[] = [...mockFootprints]
let footprintSettings: FootprintSettings = {
  enabled: true,
  showVisitCount: true,
}
let footprintIdCounter = 100

// GET /api/mixi/footprints - Get user's footprints
export const getFootprintsHandler: ResponseResolver = async ({ request }) => {
  const url = new URL((request as Request).url)
  const limit = parseInt(url.searchParams.get('limit') || '50', 10)
  const offset = parseInt(url.searchParams.get('offset') || '0', 10)

  // Sort by lastVisitAt (most recent first)
  const sortedFootprints = [...footprints].sort(
    (a, b) => new Date(b.lastVisitAt).getTime() - new Date(a.lastVisitAt).getTime()
  )

  const paginatedFootprints = sortedFootprints.slice(offset, offset + limit)

  return HttpResponse.json(
    {
      footprints: paginatedFootprints,
      total: footprints.length,
      limit,
      offset,
    },
    { status: 200 }
  )
}

// POST /api/mixi/footprints - Record a visit (when someone visits your profile)
export const recordVisitHandler: ResponseResolver = async ({ request }) => {
  if (!footprintSettings.enabled) {
    return HttpResponse.json({ message: 'Footprint tracking is disabled' }, { status: 200 })
  }

  const body = (await (request as Request).json()) as { visitorId: string }

  // Don't track self-visits
  if (body.visitorId === CURRENT_USER_ID) {
    return HttpResponse.json({ message: 'Self-visits not tracked' }, { status: 200 })
  }

  const existingFootprintIndex = footprints.findIndex((f) => f.visitor.id === body.visitorId)

  const now = new Date().toISOString()

  if (existingFootprintIndex !== -1) {
    // Update existing footprint
    footprints[existingFootprintIndex] = {
      ...footprints[existingFootprintIndex],
      visitCount: footprints[existingFootprintIndex].visitCount + 1,
      lastVisitAt: now,
    }
    return HttpResponse.json({ footprint: footprints[existingFootprintIndex] }, { status: 200 })
  } else {
    // Create new footprint
    // In a real app, we'd fetch the visitor's user data
    const visitor = {
      id: body.visitorId,
      name: `User ${body.visitorId}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${body.visitorId}`,
    }

    const newFootprint: Footprint = {
      id: `fp${footprintIdCounter++}`,
      visitor,
      visitedAt: now,
      visitCount: 1,
      lastVisitAt: now,
    }

    footprints.unshift(newFootprint)
    return HttpResponse.json({ footprint: newFootprint }, { status: 201 })
  }
}

// DELETE /api/mixi/footprints/:id - Delete a specific footprint
export const deleteFootprintHandler: ResponseResolver = async ({ params }) => {
  const footprintId = (params as { id: string }).id
  const footprintIndex = footprints.findIndex((f) => f.id === footprintId)

  if (footprintIndex === -1) {
    return HttpResponse.json({ error: 'Footprint not found' }, { status: 404 })
  }

  footprints.splice(footprintIndex, 1)

  return HttpResponse.json({ message: 'Footprint deleted' }, { status: 200 })
}

// DELETE /api/mixi/footprints - Clear all footprints
export const clearFootprintsHandler: ResponseResolver = async () => {
  footprints = []
  return HttpResponse.json({ message: 'All footprints cleared' }, { status: 200 })
}

// GET /api/mixi/footprints/settings - Get footprint settings
export const getFootprintSettingsHandler: ResponseResolver = async () => {
  return HttpResponse.json({ settings: footprintSettings }, { status: 200 })
}

// PUT /api/mixi/footprints/settings - Update footprint settings
export const updateFootprintSettingsHandler: ResponseResolver = async ({ request }) => {
  const body = (await (request as Request).json()) as Partial<FootprintSettings>

  footprintSettings = {
    ...footprintSettings,
    ...body,
  }

  return HttpResponse.json({ settings: footprintSettings }, { status: 200 })
}

