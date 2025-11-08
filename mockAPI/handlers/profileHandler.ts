import { HttpResponse } from 'msw'
import type { ResponseResolver } from 'msw'

import type { Profile } from '@/pages/Mixi/components/Profile/types'

import { mockProfile } from '../fixtures/profileData'

// In-memory store (simulating database)
let profile: Profile = { ...mockProfile }

// GET /api/mixi/profile - Get user's profile
export const getProfileHandler: ResponseResolver = async () => {
  // In a real app, we'd fetch by userId from request params
  // For now, return the current user's profile
  return HttpResponse.json({ profile }, { status: 200 })
}

// PUT /api/mixi/profile - Update user's profile
export const updateProfileHandler: ResponseResolver = async ({ request }) => {
  const body = (await (request as Request).json()) as Partial<Profile>

  // Validate bio length (optional limit)
  if (body.bio && body.bio.length > 500) {
    return HttpResponse.json({ error: 'Bio must be 500 characters or less' }, { status: 400 })
  }

  // Validate hobbies count
  if (body.hobbies && body.hobbies.length > 10) {
    return HttpResponse.json({ error: 'Maximum 10 hobbies allowed' }, { status: 400 })
  }

  // Update profile
  profile = {
    ...profile,
    ...body,
    updatedAt: new Date().toISOString(),
  }

  return HttpResponse.json({ profile }, { status: 200 })
}

