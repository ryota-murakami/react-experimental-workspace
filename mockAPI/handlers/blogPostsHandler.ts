import { delay, HttpResponse } from 'msw'
import type { ResponseResolver } from 'msw'

import { mockBlogPosts, type BlogPost } from '../fixtures/blogPostsData'

/** Items per page for pagination */
const ITEMS_PER_PAGE = 10

/** Simulated API delay in milliseconds to demonstrate optimistic updates */
const API_DELAY_MS = 1000

// In-memory store (simulating database)
const posts: BlogPost[] = [...mockBlogPosts]

/**
 * GET /api/blog/posts - Get paginated blog posts
 * @param request - HTTP request object
 * @returns Paginated posts with metadata
 * @example
 * // Request: GET /api/blog/posts?page=1
 * // Response: { posts: [...], page: 1, totalPages: 10, totalPosts: 100 }
 */
export const getBlogPostsHandler: ResponseResolver = async ({ request }) => {
  await delay(API_DELAY_MS)

  const url = new URL((request as Request).url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = ITEMS_PER_PAGE

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const paginatedPosts = posts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(posts.length / limit)

  return HttpResponse.json(
    {
      posts: paginatedPosts,
      page,
      totalPages,
      totalPosts: posts.length,
    },
    { status: 200 }
  )
}

/**
 * PUT /api/blog/posts/:id/like - Toggle like on a blog post
 * Includes 1000ms delay to demonstrate useOptimistic effect
 * @param params - Route parameters containing post ID
 * @returns Updated post with like status
 * @example
 * // Request: PUT /api/blog/posts/1/like
 * // Response: { post: { ...post, liked: true, likes: 51 }, liked: true, likes: 51 }
 */
export const toggleBlogPostLikeHandler: ResponseResolver = async ({ params }) => {
  await delay(API_DELAY_MS)

  const postId = parseInt((params as { id: string }).id, 10)
  const postIndex = posts.findIndex((p) => p.id === postId)

  if (postIndex === -1) {
    return HttpResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const post = posts[postIndex]
  const newLiked = !post.liked
  const newLikes = newLiked ? post.likes + 1 : post.likes - 1

  posts[postIndex] = {
    ...post,
    liked: newLiked,
    likes: newLikes,
  }

  return HttpResponse.json(
    {
      post: posts[postIndex],
      liked: newLiked,
      likes: newLikes,
    },
    { status: 200 }
  )
}
