
import { Eye, Footprints } from 'lucide-react'
import React from 'react'

import FootprintCard from './FootprintCard'
import FootprintSettingsComponent from './FootprintSettings'
import type { Footprint, FootprintSettings } from './types'

interface FootprintListProps {
  footprints: Footprint[]
  settings: FootprintSettings
  onDelete: (footprintId: string) => void
  onClearAll: () => void
  onUpdateSettings: (settings: Partial<FootprintSettings>) => void
}

const FootprintList: React.FC<FootprintListProps> = ({
  footprints,
  settings,
  onDelete,
  onClearAll,
  onUpdateSettings,
}) => {
  if (!settings.enabled) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <FootprintSettingsComponent
          settings={settings}
          onUpdate={onUpdateSettings}
          onClearAll={onClearAll}
          hasFootprints={footprints.length > 0}
        />
        <div className="text-center py-12 text-muted-foreground">
          <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Footprint tracking is disabled</p>
          <p className="text-sm mt-2">Enable tracking to see who visits your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Settings */}
      <FootprintSettingsComponent
        settings={settings}
        onUpdate={onUpdateSettings}
        onClearAll={onClearAll}
        hasFootprints={footprints.length > 0}
      />

      {/* Footprints List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Recent Visitors ({footprints.length})
          </h2>
        </div>

        {footprints.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Footprints className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No footprints yet</p>
            <p className="text-sm mt-2">Visitors will appear here when they view your profile</p>
          </div>
        ) : (
          <div className="space-y-3">
            {footprints.map((footprint) => (
              <FootprintCard
                key={footprint.id}
                footprint={footprint}
                onDelete={() => onDelete(footprint.id)}
                showVisitCount={settings.showVisitCount}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FootprintList

