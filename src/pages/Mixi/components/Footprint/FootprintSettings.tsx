import { Trash2, Shield } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'


import type { FootprintSettings } from './types'

interface FootprintSettingsProps {
  settings: FootprintSettings
  onUpdate: (settings: Partial<FootprintSettings>) => void
  onClearAll: () => void
  hasFootprints: boolean
}

const FootprintSettings: React.FC<FootprintSettingsProps> = ({
  settings,
  onUpdate,
  onClearAll,
  hasFootprints,
}) => {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Privacy Settings</h3>
      </div>

      {/* Enable/Disable Tracking */}
      <div className="flex items-center justify-between py-2">
        <div>
          <p className="font-medium text-foreground">Track Profile Visits</p>
          <p className="text-sm text-muted-foreground mt-1">
            Record when someone visits your profile
          </p>
        </div>
        <button
          onClick={() => onUpdate({ enabled: !settings.enabled })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors min-w-[44px] min-h-[44px] ${
            settings.enabled ? 'bg-primary' : 'bg-muted'
          }`}
          role="switch"
          aria-checked={settings.enabled}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Show Visit Count */}
      {settings.enabled && (
        <div className="flex items-center justify-between py-2">
          <label htmlFor="show-visit-count" className="flex-1 cursor-pointer">
            <p className="font-medium text-foreground">Show Visit Count</p>
            <p className="text-sm text-muted-foreground mt-1">
              Display how many times each person has visited
            </p>
          </label>
          <button
            id="show-visit-count"
            onClick={() => onUpdate({ showVisitCount: !settings.showVisitCount })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onUpdate({ showVisitCount: !settings.showVisitCount })
              }
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors min-w-[44px] min-h-[44px] ${
              settings.showVisitCount ? 'bg-primary' : 'bg-muted'
            }`}
            role="switch"
            aria-checked={settings.showVisitCount}
            tabIndex={0}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.showVisitCount ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      )}

      {/* Clear All */}
      {hasFootprints && (
        <div className="pt-4 border-t border-border">
          <Button
            onClick={onClearAll}
            variant="outline"
            className="w-full min-h-[44px] text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All Footprints
          </Button>
        </div>
      )}
    </div>
  )
}

export default FootprintSettings

