import { HttpResponse } from 'msw'
import type { ResponseResolver } from 'msw'

import type { Post } from '@/pages/Mixi/components/DiaryFeed'

import { mockPosts, mockUsers } from '../fixtures/mixiData'

// In-memory store (simulating database)
const posts: Post[] = [...mockPosts]
let postIdCounter = 100

// GET /api/mixi/posts - Get all posts
export const getPostsHandler: ResponseResolver = async ({ request }) => {
  const url = new URL((request as Request).url)
  const visibility = url.searchParams.get('visibility')
  const limit = parseInt(url.searchParams.get('limit') || '50', 10)
  const offset = parseInt(url.searchParams.get('offset') || '0', 10)

  let filteredPosts = [...posts]

  // Filter by visibility if specified
  if (visibility && visibility !== 'all') {
    filteredPosts = filteredPosts.filter((post) => post.visibility === visibility)
  }

  // Sort by createdAt (newest first)
  filteredPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // Pagination
  const paginatedPosts = filteredPosts.slice(offset, offset + limit)

  return HttpResponse.json(
    {
      posts: paginatedPosts,
      total: filteredPosts.length,
      limit,
      offset,
    },
    { status: 200 }
  )
}

// GET /api/mixi/posts/:id - Get single post
export const getPostHandler: ResponseResolver = async ({ params }) => {
  const postId = (params as { id: string }).id
  const post = posts.find((p) => p.id === postId)

  if (!post) {
    return HttpResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  return HttpResponse.json({ post }, { status: 200 })
}

// POST /api/mixi/posts - Create new post
export const createPostHandler: ResponseResolver = async ({ request }) => {
  const body = (await (request as Request).json()) as Omit<Post, 'id' | 'createdAt' | 'likes' | 'liked' | 'comments'>

  const newPost: Post = {
    ...body,
    id: (postIdCounter++).toString(),
    createdAt: new Date().toISOString(),
    likes: 0,
    liked: false,
    comments: [],
  }

  posts.unshift(newPost) // Add to beginning

  return HttpResponse.json({ post: newPost }, { status: 201 })
}

// PUT /api/mixi/posts/:id/like - Toggle like on post
export const toggleLikeHandler: ResponseResolver = async ({ params }) => {
  const postId = (params as { id: string }).id
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

// POST /api/mixi/posts/:id/comments - Add comment to post
export const addCommentHandler: ResponseResolver = async ({ params, request }) => {
  const postId = (params as { id: string }).id
  const body = (await (request as Request).json()) as { content: string; authorId: string }

  const postIndex = posts.findIndex((p) => p.id === postId)

  if (postIndex === -1) {
    return HttpResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const author = mockUsers.find((u) => u.id === body.authorId) || mockUsers[4] // Default to current user

  const newComment: Post['comments'][0] = {
    id: `c-${Date.now()}`,
    author,
    content: body.content,
    createdAt: new Date().toISOString(),
  }

  posts[postIndex] = {
    ...posts[postIndex],
    comments: [...posts[postIndex].comments, newComment],
  }

  return HttpResponse.json({ comment: newComment }, { status: 201 })
}

// POST /api/mixi/posts/:postId/comments/:commentId/replies - Add reply to comment
export const addReplyHandler: ResponseResolver = async ({ params, request }) => {
  const { postId, commentId } = params as { postId: string; commentId: string }
  const body = (await (request as Request).json()) as { content: string; authorId: string }

  const postIndex = posts.findIndex((p) => p.id === postId)

  if (postIndex === -1) {
    return HttpResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const author = mockUsers.find((u) => u.id === body.authorId) || mockUsers[4] // Default to current user

  const newReply: Post['comments'][0] = {
    id: `r-${Date.now()}`,
    author,
    content: body.content,
    createdAt: new Date().toISOString(),
  }

  posts[postIndex] = {
    ...posts[postIndex],
    comments: posts[postIndex].comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        }
      }
      return comment
    }),
  }

  return HttpResponse.json({ reply: newReply }, { status: 201 })
}

// GET /api/mixi/users/:id - Get user profile
export const getUserHandler: ResponseResolver = async ({ params }) => {
  const userId = (params as { id: string }).id
  const user = mockUsers.find((u) => u.id === userId)

  if (!user) {
    return HttpResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return HttpResponse.json({ user }, { status: 200 })
}

