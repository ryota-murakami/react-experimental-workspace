import type { Footprint } from '@/pages/Mixi/components/Footprint/types'

import { extendedUsers } from './friendsData'

// Mock footprints (visit records)
export const mockFootprints: Footprint[] = [
  {
    id: 'fp1',
    visitor: extendedUsers[0], // Sakura Tanaka
    visitedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    visitCount: 5,
    lastVisitAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'fp2',
    visitor: extendedUsers[1], // Hiroshi Yamada
    visitedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    visitCount: 12,
    lastVisitAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'fp3',
    visitor: extendedUsers[2], // Yuki Nakamura
    visitedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    visitCount: 3,
    lastVisitAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'fp4',
    visitor: extendedUsers[3], // Kenji Sato
    visitedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    visitCount: 1,
    lastVisitAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

