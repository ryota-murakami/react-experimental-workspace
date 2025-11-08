import { Reply } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'


import type { Comment } from './DiaryFeed'

interface CommentThreadProps {
  comment: Comment
  onReply: (content: string) => void
}

const CommentThread: React.FC<CommentThreadProps> = ({ comment, onReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim()) return
    onReply(replyContent.trim())
    setReplyContent('')
    setShowReplyInput(false)
  }

  return (
    <div className="space-y-3">
      {/* Main Comment */}
      <div className="flex gap-3">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm text-foreground">{comment.author.name}</span>
              <time className="text-xs text-muted-foreground">{formatTime(comment.createdAt)}</time>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{comment.content}</p>
          </div>
          <button
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded min-h-[32px]"
          >
            <Reply className="w-3 h-3" />
            Reply
          </button>

          {/* Reply Input */}
          {showReplyInput && (
            <form onSubmit={handleReplySubmit} className="mt-2 flex gap-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm min-h-[36px]"
              />
              <Button
                type="submit"
                disabled={!replyContent.trim()}
                size="sm"
                className="min-h-[36px]"
              >
                Reply
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 space-y-3 pl-4 border-l-2 border-muted">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex gap-3">
              <img
                src={reply.author.avatar}
                alt={reply.author.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">
                      {reply.author.name}
                    </span>
                    <time className="text-xs text-muted-foreground">
                      {formatTime(reply.createdAt)}
                    </time>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{reply.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentThread

