import { Edit, User } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'


import type { Profile } from './types'

interface ProfileDisplayProps {
  profile: Profile
  onEdit: () => void
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile, onEdit }) => {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6">
      <div className="flex items-start gap-6">
        <img
          src={profile.icon}
          alt={profile.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-border flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{profile.name}</h2>
              {profile.bio && (
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
              )}
            </div>
            <Button
              onClick={onEdit}
              variant="outline"
              size="sm"
              className="min-h-[36px] flex-shrink-0"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>

          {profile.hobbies && profile.hobbies.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground">Hobbies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileDisplay

