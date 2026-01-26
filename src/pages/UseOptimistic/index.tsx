import axios from 'axios'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useCallback, useEffect, useState } from 'react'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

import type { BlogPost } from '../../../mockAPI/fixtures/blogPostsData'

import { Post } from './Post'

/** Total number of pages for pagination */
const TOTAL_PAGES = 10

interface PostsResponse {
  posts: BlogPost[]
  page: number
  totalPages: number
  totalPosts: number
}

/**
 * UseOptimistic experiment page
 *
 * Demonstrates React 19's useOptimistic hook with a blog post list.
 * Features:
 * - Optimistic like updates with 1000ms API delay
 * - URL-based pagination using nuqs
 * - Responsive card grid layout
 *
 * The API intentionally has a 1000ms delay to clearly demonstrate
 * the optimistic update effect - the UI updates immediately while
 * the server request is still pending.
 */
export default function UseOptimistic() {
  // URL-based page state using nuqs
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  )

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(TOTAL_PAGES)

  /**
   * Fetch posts from the API
   * Uses MSW mock handler with 1000ms delay
   */
  const fetchPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get<PostsResponse>('/api/blog/posts', {
        params: { page },
      })
      setPosts(response.data.posts)
      setTotalPages(response.data.totalPages)
    } catch (err) {
      setError('Failed to load posts. Please try again.')
      console.error('Error fetching posts:', err)
    } finally {
      setIsLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  /**
   * Handle like action for a post
   * The LikeButton component uses useOptimistic to show immediate feedback
   *
   * @param postId - ID of the post to like/unlike
   */
  const handleLike = async (postId: number): Promise<void> => {
    try {
      const response = await axios.put(`/api/blog/posts/${postId}/like`)

      // Update local state with server response
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === postId
            ? { ...post, liked: response.data.liked, likes: response.data.likes }
            : post
        )
      )
    } catch (err) {
      console.error('Error toggling like:', err)
      // Note: useOptimistic will automatically revert the optimistic state on error
      throw err // Re-throw to trigger optimistic revert
    }
  }

  /**
   * Navigate to previous page
   */
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  /**
   * Navigate to next page
   */
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  /**
   * Navigate to specific page
   * @param pageNumber - Target page number
   */
  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber)
  }

  return (
    <Page.Container>
      <Header>
        <Header.H1>UseOptimistic</Header.H1>
      </Header>

      {/* Explanation Section */}
      <section className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="text-sm font-semibold text-blue-800 mb-2">
          🧪 React 19 useOptimistic Demo
        </h2>
        <p className="text-sm text-blue-700">
          いいねボタンをクリックすると、APIレスポンスを待たずに即座にUIが更新されます。
          APIには意図的に1000msのディレイがあるため、楽観的更新の効果を確認できます。
          「(syncing...)」の表示中にUIが先に更新されていることに注目してください。
        </p>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Loading posts...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
          <button
            onClick={fetchPosts}
            className="ml-4 text-sm underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Posts Grid */}
      {!isLoading && !error && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <Post key={post.id} post={post} onLike={handleLike} />
            ))}
          </div>

          {/* Pagination */}
          <nav
            className="mt-8 flex items-center justify-center gap-2"
            aria-label="Pagination"
          >
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`
                p-2 rounded-lg border transition-colors
                ${
                  page === 1
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }
              `}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`
                      w-10 h-10 rounded-lg text-sm font-medium transition-colors
                      ${
                        pageNumber === page
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }
                    `}
                    aria-label={`Page ${pageNumber}`}
                    aria-current={pageNumber === page ? 'page' : undefined}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`
                p-2 rounded-lg border transition-colors
                ${
                  page === totalPages
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }
              `}
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>

          {/* Page Info */}
          <p className="mt-4 text-center text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>
        </>
      )}
    </Page.Container>
  )
}
