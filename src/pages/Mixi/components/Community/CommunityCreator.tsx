import { X } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'


import type { Community } from './types'

interface CommunityCreatorProps {
  onCreate: (data: Omit<Community, 'id' | 'createdAt' | 'memberCount' | 'threadCount' | 'isMember'>) => void
  onCancel: () => void
}

const CommunityCreator: React.FC<CommunityCreatorProps> = ({ onCreate, onCancel }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !description.trim()) return

    onCreate({
      name: name.trim(),
      description: description.trim(),
      icon: icon.trim() || undefined,
      category: category.trim() || undefined,
      createdBy: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      },
    })

    setName('')
    setDescription('')
    setIcon('')
    setCategory('')
  }

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-foreground">Create Community</h3>
        <button
          onClick={onCancel}
          className="p-2 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="community-name" className="block text-sm font-medium text-foreground mb-2">
            Name *
          </label>
          <input
            id="community-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Community name"
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[44px]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="community-description"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Description *
          </label>
          <textarea
            id="community-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this community about?"
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="community-icon" className="block text-sm font-medium text-foreground mb-2">
              Icon (emoji)
            </label>
            <input
              id="community-icon"
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="📚"
              maxLength={2}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[44px] text-center text-2xl"
            />
          </div>

          <div>
            <label
              htmlFor="community-category"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Category
            </label>
            <input
              id="community-category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Books, Photography"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[44px]"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 min-h-[44px]">
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim() || !description.trim()} className="flex-1 min-h-[44px]">
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CommunityCreator

