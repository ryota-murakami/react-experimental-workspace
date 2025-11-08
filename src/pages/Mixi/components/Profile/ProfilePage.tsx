
import { User } from 'lucide-react'
import React, { useState } from 'react'

import FootprintList from '../Footprint/FootprintList'
import type { Footprint, FootprintSettings } from '../Footprint/types'

import ProfileDisplay from './ProfileDisplay'
import ProfileEditor from './ProfileEditor'
import type { Profile } from './types'

interface ProfilePageProps {
  profile: Profile
  onUpdateProfile: (updates: Partial<Profile>) => void
  footprints: Footprint[]
  footprintSettings: FootprintSettings
  onDeleteFootprint: (footprintId: string) => void
  onClearFootprints: () => void
  onUpdateFootprintSettings: (settings: Partial<FootprintSettings>) => void
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  onUpdateProfile,
  footprints,
  footprintSettings,
  onDeleteFootprint,
  onClearFootprints,
  onUpdateFootprintSettings,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = (updates: Partial<Profile>) => {
    onUpdateProfile(updates)
    setIsEditing(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Profile Section */}
      {isEditing ? (
        <ProfileEditor
          profile={profile}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileDisplay profile={profile} onEdit={() => setIsEditing(true)} />
      )}

      {/* Footprints Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-foreground">Footprints</h3>
        </div>
        <FootprintList
          footprints={footprints}
          settings={footprintSettings}
          onDelete={onDeleteFootprint}
          onClearAll={onClearFootprints}
          onUpdateSettings={onUpdateFootprintSettings}
        />
      </div>
    </div>
  )
}

export default ProfilePage

