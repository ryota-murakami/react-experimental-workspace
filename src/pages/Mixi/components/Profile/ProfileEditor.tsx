import { Save, X } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'


import HobbiesEditor from './HobbiesEditor'
import type { Profile } from './types'

interface ProfileEditorProps {
  profile: Profile
  onSave: (updates: Partial<Profile>) => void
  onCancel: () => void
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onSave, onCancel }) => {
  const [bio, setBio] = useState(profile.bio)
  const [hobbies, setHobbies] = useState(profile.hobbies)
  const [icon, setIcon] = useState(profile.icon)

  const handleSave = () => {
    onSave({
      bio,
      hobbies,
      icon,
    })
  }

  const hasChanges =
    bio !== profile.bio ||
    JSON.stringify(hobbies.sort()) !== JSON.stringify(profile.hobbies.sort()) ||
    icon !== profile.icon

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Edit Profile</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            size="sm"
            className="min-h-[36px]"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            size="sm"
            className="min-h-[36px]"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Avatar/Icon */}
      <div>
        <label htmlFor="profile-icon" className="block text-sm font-medium text-foreground mb-2">
          Profile Icon
        </label>
        <div className="flex items-center gap-4">
          <img
            src={icon}
            alt="Profile icon"
            className="w-20 h-20 rounded-full object-cover border-2 border-border"
          />
          <div className="flex-1">
            <input
              id="profile-icon"
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Icon URL"
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm min-h-[44px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter a URL for your profile icon
            </p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-foreground mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setBio(e.target.value)
            }
          }}
          rows={4}
          maxLength={500}
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none min-h-[100px]"
          placeholder="Tell us about yourself..."
        />
        <p className="text-xs text-muted-foreground mt-1">{bio.length}/500 characters</p>
      </div>

      {/* Hobbies */}
      <div>
        <label htmlFor="hobbies-editor" className="block text-sm font-medium text-foreground mb-2">
          Hobbies
        </label>
        <div id="hobbies-editor">
          <HobbiesEditor hobbies={hobbies} onChange={setHobbies} maxHobbies={10} />
        </div>
      </div>
    </div>
  )
}

export default ProfileEditor

