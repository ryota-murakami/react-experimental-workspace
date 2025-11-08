import { Image, Link as LinkIcon, Lock, Users, Globe } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import type { Post } from './DiaryFeed'

type Visibility = 'public' | 'friends' | 'specific'

interface PostCreatorProps {
  onCreate: (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'liked' | 'comments'>) => void
}

const PostCreator: React.FC<PostCreatorProps> = ({ onCreate }) => {
  const [content, setContent] = useState('')
  const [visibility, setVisibility] = useState<Visibility>('public')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    onCreate({
      author: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      },
      content: content.trim(),
      visibility,
    })

    setContent('')
    setIsExpanded(false)
  }

  const visibilityOptions: Array<{ value: Visibility; label: string; icon: React.ReactNode }> = [
    { value: 'public', label: 'Public', icon: <Globe className="w-4 h-4" /> },
    { value: 'friends', label: 'Friends', icon: <Users className="w-4 h-4" /> },
    { value: 'specific', label: 'Specific', icon: <Lock className="w-4 h-4" /> },
  ]

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="What's on your mind?"
          className="w-full min-h-[100px] p-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none text-base leading-relaxed"
          rows={isExpanded ? 4 : 3}
        />

        {/* Visibility Selector */}
        {isExpanded && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Visibility:</span>
            <div className="flex gap-2">
              {visibilityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setVisibility(option.value)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px]',
                    visibility === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {isExpanded && (
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex gap-2">
              <button
                type="button"
                className="p-3 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Add image"
              >
                <Image className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                type="button"
                className="p-3 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Add link"
              >
                <LinkIcon className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <Button type="submit" disabled={!content.trim()} size="lg" className="min-h-[44px] px-6">
              Post
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}

export default PostCreator

