import { Heart, MessageCircle, MoreVertical, Share2 } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import CommentThread from './CommentThread'
import type { Post } from './DiaryFeed'

interface PostCardProps {
  post: Post
  onLike: () => void
  onCommentAdd: (content: string) => void
  onReplyAdd: (commentId: string, content: string) => void
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onCommentAdd,
  onReplyAdd,
}) => {
  const [showComments, setShowComments] = useState(false)
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
    setShowComments(true)
  }

  return (
    <article className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{post.author.name}</h3>
              <span className="text-xs text-muted-foreground">·</span>
              <time className="text-sm text-muted-foreground">{formatTime(post.createdAt)}</time>
            </div>
            {post.visibility !== 'public' && (
              <div className="mt-1">
                <span className="text-xs text-muted-foreground capitalize">
                  {post.visibility === 'friends' ? 'Friends only' : 'Limited visibility'}
                </span>
              </div>
            )}
          </div>
          <button
            className="p-2 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="More options"
          >
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
            {post.images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Post ${idx + 1}`}
                className="w-full h-48 object-cover"
              />
            ))}
          </div>
        )}

        {/* Links */}
        {post.links && post.links.length > 0 && (
          <div className="mt-4 space-y-2">
            {post.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <p className="font-medium text-foreground">{link.title}</p>
                <p className="text-sm text-muted-foreground mt-1 truncate">{link.url}</p>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex items-center gap-6">
          <button
            onClick={onLike}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors min-h-[44px]',
              post.liked
                ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20'
                : 'text-muted-foreground hover:bg-muted'
            )}
          >
            <Heart className={cn('w-5 h-5', post.liked && 'fill-current')} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors min-h-[44px]"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{post.comments.length}</span>
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors min-h-[44px]"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Comment Input */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-border">
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
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
            </form>

            {/* Comments */}
            {post.comments.length > 0 && (
              <div className="mt-4 space-y-4">
                {post.comments.map((comment) => (
                  <CommentThread
                    key={comment.id}
                    comment={comment}
                    onReply={(content) => onReplyAdd(comment.id, content)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default PostCard

