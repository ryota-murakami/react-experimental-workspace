import { Calendar, User } from 'lucide-react'

import type { BlogPost } from '../../../mockAPI/fixtures/blogPostsData'

import { LikeButton } from './LikeButton'

interface PostProps {
  post: BlogPost
  onLike: (postId: number) => Promise<void>
}

/**
 * Post component for displaying a single blog post
 *
 * Contains the LikeButton component which demonstrates useOptimistic.
 * The card-style layout shows post metadata including title, content,
 * author, creation date, and like button.
 *
 * @param post - The blog post data to display
 * @param onLike - Callback function to handle like action
 *
 * @example
 * <Post
 *   post={{ id: 1, title: 'Hello', content: '...', ... }}
 *   onLike={handleLike}
 * />
 */
export function Post({ post, onLike }: PostProps) {
  /**
   * Format date to Japanese locale
   * @param dateString - ISO date string
   * @returns Formatted date string in Japanese format
   */
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h2>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.createdAt)}
          </span>
        </div>
      </header>

      {/* Content */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {post.content}
      </p>

      {/* Footer with LikeButton */}
      <footer className="flex items-center justify-between pt-4 border-t border-gray-100">
        <LikeButton
          postId={post.id}
          likes={post.likes}
          liked={post.liked}
          onLike={onLike}
        />
        <span className="text-xs text-gray-400">
          Post #{post.id}
        </span>
      </footer>
    </article>
  )
}
