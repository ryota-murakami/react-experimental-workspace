import { Search, UserPlus } from 'lucide-react'
import React, { useState, useEffect } from 'react'

import FriendCard from './FriendCard'
import type { FriendStatus, User } from './types'

interface FriendSearchProps {
  onAddFriend: (userId: string) => void
  onCancelRequest: (userId: string) => void
  searchUsers: (query: string) => Promise<{ users: (User & { friendStatus: FriendStatus })[] }>
}

const FriendSearch: React.FC<FriendSearchProps> = ({
  onAddFriend,
  onCancelRequest,
  searchUsers,
}) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<(User & { friendStatus: FriendStatus })[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await searchUsers(query)
        setResults(response.users)
      } catch (err) {
        console.error('Search failed:', err)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, searchUsers])

  const handleAddFriend = (userId: string) => {
    onAddFriend(userId)
    // Remove from results after sending request
    setResults((prev) => prev.filter((u) => u.id !== userId))
  }

  const handleCancelRequest = (userId: string) => {
    onCancelRequest(userId)
    // Update status in results
    setResults((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, friendStatus: 'none' } : u))
    )
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for people..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[44px]"
        />
      </div>

      {/* Results */}
      {loading && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Searching...</p>
        </div>
      )}

      {!loading && query.trim() && results.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No users found</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((user) => (
            <FriendCard
              key={user.id}
              user={user}
              onAddFriend={
                user.friendStatus === 'none' ? () => handleAddFriend(user.id) : undefined
              }
              onCancelRequest={
                user.friendStatus === 'pending_sent' ? () => handleCancelRequest(user.id) : undefined
              }
              showMutualFriends
            />
          ))}
        </div>
      )}

      {!query.trim() && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Find Friends</p>
          <p className="text-sm mt-2">Search for people by name or interests</p>
        </div>
      )}
    </div>
  )
}

export default FriendSearch

