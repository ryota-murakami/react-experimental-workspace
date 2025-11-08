import type { Footprint, FootprintSettings } from '../components/Footprint/types'

const API_BASE = '/api/mixi'

interface GetFootprintsResponse {
  footprints: Footprint[]
  total: number
  limit: number
  offset: number
}

/**
 * Fetch user's footprints (visit records)
 */
export async function getFootprints(params?: {
  limit?: number
  offset?: number
}): Promise<GetFootprintsResponse> {
  const searchParams = new URLSearchParams()
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.offset) searchParams.set('offset', params.offset.toString())

  const response = await fetch(`${API_BASE}/footprints?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch footprints')
  }
  return response.json()
}

/**
 * Record a visit (when someone visits your profile)
 */
export async function recordVisit(visitorId: string): Promise<{ footprint: Footprint }> {
  const response = await fetch(`${API_BASE}/footprints`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ visitorId }),
  })
  if (!response.ok) {
    throw new Error('Failed to record visit')
  }
  return response.json()
}

/**
 * Delete a specific footprint
 */
export async function deleteFootprint(footprintId: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE}/footprints/${footprintId}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete footprint')
  }
  return response.json()
}

/**
 * Clear all footprints
 */
export async function clearFootprints(): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE}/footprints`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to clear footprints')
  }
  return response.json()
}

/**
 * Get footprint settings
 */
export async function getFootprintSettings(): Promise<{ settings: FootprintSettings }> {
  const response = await fetch(`${API_BASE}/footprints/settings`)
  if (!response.ok) {
    throw new Error('Failed to fetch footprint settings')
  }
  return response.json()
}

/**
 * Update footprint settings
 */
export async function updateFootprintSettings(
  settings: Partial<FootprintSettings>
): Promise<{ settings: FootprintSettings }> {
  const response = await fetch(`${API_BASE}/footprints/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  })
  if (!response.ok) {
    throw new Error('Failed to update footprint settings')
  }
  return response.json()
}

