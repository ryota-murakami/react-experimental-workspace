export interface User {
  id: string
  name: string
  avatar: string
}

export interface Footprint {
  id: string
  visitor: User
  visitedAt: string
  visitCount: number
  lastVisitAt: string
}

export interface FootprintSettings {
  enabled: boolean
  showVisitCount: boolean
}

