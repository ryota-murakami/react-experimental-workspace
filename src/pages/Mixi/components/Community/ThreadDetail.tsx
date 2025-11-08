import { ArrowLeft, Pin, Lock, Reply } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import CommentThread from '../CommentThread'

import type { Comment, Thread } from './types'

interface ThreadDetailProps {
  thread: Thread
  onBack: () => void
  onCommentAdd: (content: string) => void
  onReplyAdd: (commentId: string, content: string) => void
}

const ThreadDetail: React.FC<ThreadDetailProps> = ({
  thread,
  onBack,
  onCommentAdd,
  onReplyAdd,
}) => {
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [commentInput, setCommentInput] = useState('')

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

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentInput.trim()) return
    onCommentAdd(commentInput.trim())
    setCommentInput('')
    setShowCommentInput(false)
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to threads</span>
      </button>

      {/* Thread */}
      <article className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={thread.author.avatar}
              alt={thread.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {thread.pinned && (
                  <Pin className="w-4 h-4 text-primary fill-current" />
                )}
                {thread.locked && (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
                <h1 className="text-2xl font-bold text-foreground">{thread.title}</h1>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{thread.author.name}</span>
                <span>·</span>
                <time>{formatTime(thread.createdAt)}</time>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">{thread.content}</p>
        </div>

        {/* Comments Section */}
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Comments ({thread.commentCount})
            </h2>
            {!thread.locked && (
              <Button
                onClick={() => setShowCommentInput(!showCommentInput)}
                size="sm"
                className="min-h-[44px]"
              >
                <Reply className="w-4 h-4 mr-2" />
                Add Comment
              </Button>
            )}
          </div>

          {/* Comment Input */}
          {showCommentInput && !thread.locked && (
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[44px]"
                />
                <Button type="submit" disabled={!commentInput.trim()} size="lg" className="min-h-[44px]">
                  Post
                </Button>
              </div>
            </form>
          )}

          {/* Comments */}
          {thread.comments.length > 0 ? (
            <div className="space-y-4">
              {thread.comments.map((comment) => (
                <CommentThread
                  key={comment.id}
                  comment={comment as Comment & { replies?: Comment[] }}
                  onReply={(content) => onReplyAdd(comment.id, content)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

export default ThreadDetail

