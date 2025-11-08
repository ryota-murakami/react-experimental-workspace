import type { Profile } from '../components/Profile/types'

const API_BASE = '/api/mixi'

/**
 * Fetch user's profile
 */
export async function getProfile(userId?: string): Promise<{ profile: Profile }> {
  const searchParams = new URLSearchParams()
  if (userId) searchParams.set('userId', userId)

  const response = await fetch(`${API_BASE}/profile?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch profile')
  }
  return response.json()
}

/**
 * Update user's profile
 */
export async function updateProfile(
  updates: Partial<Profile>
): Promise<{ profile: Profile }> {
  const response = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to update profile')
  }
  return response.json()
}

