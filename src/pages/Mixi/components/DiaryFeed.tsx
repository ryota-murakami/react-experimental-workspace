import React from 'react'

import PostCard from './PostCard'
import PostCreator from './PostCreator'

export interface Post {
  id: string
  author: {
    id: string
    name: string
    avatar: string
  }
  content: string
  images?: string[]
  links?: Array<{ url: string; title: string }>
  visibility: 'public' | 'friends' | 'specific'
  createdAt: string
  likes: number
  liked: boolean
  comments: Comment[]
}

export interface Comment {
  id: string
  author: {
    id: string
    name: string
    avatar: string
  }
  content: string
  createdAt: string
  replies?: Comment[]
}

interface DiaryFeedProps {
  posts: Post[]
  onPostCreate: (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'liked' | 'comments'>) => void
  onPostLike: (postId: string) => void
  onCommentAdd: (postId: string, content: string) => void
  onReplyAdd: (postId: string, commentId: string, content: string) => void
}

const DiaryFeed: React.FC<DiaryFeedProps> = ({
  posts,
  onPostCreate,
  onPostLike,
  onCommentAdd,
  onReplyAdd,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Post Creator */}
      <PostCreator onCreate={onPostCreate} />

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => onPostLike(post.id)}
            onCommentAdd={(content) => onCommentAdd(post.id, content)}
            onReplyAdd={(commentId, content) => onReplyAdd(post.id, commentId, content)}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No posts yet</p>
          <p className="text-sm mt-2">Start by creating your first diary entry!</p>
        </div>
      )}
    </div>
  )
}

export default DiaryFeed

