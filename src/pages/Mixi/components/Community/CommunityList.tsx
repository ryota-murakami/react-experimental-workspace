import { Plus, Users } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'


import CommunityCard from './CommunityCard'
import CommunityCreator from './CommunityCreator'
import type { Community } from './types'

interface CommunityListProps {
  communities: Community[]
  onCreateCommunity: (data: Omit<Community, 'id' | 'createdAt' | 'memberCount' | 'threadCount' | 'isMember'>) => void
  onJoinCommunity: (communityId: string) => void
  onLeaveCommunity: (communityId: string) => void
  onSelectCommunity: (communityId: string) => void
}

const CommunityList: React.FC<CommunityListProps> = ({
  communities,
  onCreateCommunity,
  onJoinCommunity,
  onLeaveCommunity,
  onSelectCommunity,
}) => {
  const [showCreator, setShowCreator] = useState(false)

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Communities</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Join communities based on shared interests
          </p>
        </div>
        <Button onClick={() => setShowCreator(true)} size="lg" className="min-h-[44px]">
          <Plus className="w-5 h-5 mr-2" />
          Create Community
        </Button>
      </div>

      {/* Community Creator Modal */}
      {showCreator && (
        <CommunityCreator
          onCreate={(data) => {
            onCreateCommunity(data)
            setShowCreator(false)
          }}
          onCancel={() => setShowCreator(false)}
        />
      )}

      {/* Communities Grid */}
      {communities.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No communities yet</p>
          <p className="text-sm mt-2">Create the first community to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
              onJoin={() => onJoinCommunity(community.id)}
              onLeave={() => onLeaveCommunity(community.id)}
              onClick={() => onSelectCommunity(community.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommunityList

