import { http, HttpResponse } from 'msw'

import {
  getBlogPostsHandler,
  toggleBlogPostLikeHandler,
} from './handlers/blogPostsHandler'
import {
  addThreadCommentHandler,
  addThreadReplyHandler,
  createCommunityHandler,
  createThreadHandler,
  getCommunitiesHandler,
  getCommunityHandler,
  getCommunityThreadsHandler,
  getThreadHandler,
  joinCommunityHandler,
  leaveCommunityHandler,
} from './handlers/communityHandler'
import {
  clearFootprintsHandler,
  deleteFootprintHandler,
  getFootprintSettingsHandler,
  getFootprintsHandler,
  recordVisitHandler,
  updateFootprintSettingsHandler,
} from './handlers/footprintHandler'
import {
  acceptFriendRequestHandler,
  cancelFriendRequestHandler,
  getFriendRequestsHandler,
  getFriendsHandler,
  getMutualFriendsHandler,
  rejectFriendRequestHandler,
  removeFriendHandler,
  searchUsersHandler,
  sendFriendRequestHandler,
} from './handlers/friendsHandler'
import {
  getConversationMessagesHandler,
  getConversationsHandler,
  getOrCreateConversationHandler,
  markConversationReadHandler,
  sendMessageHandler,
} from './handlers/messagesHandler'
import {
  addCommentHandler,
  addReplyHandler,
  createPostHandler,
  getPostHandler,
  getPostsHandler,
  getUserHandler,
  toggleLikeHandler,
} from './handlers/mixiHandler'
import { getProfileHandler, updateProfileHandler } from './handlers/profileHandler'
import { searchHandler } from './handlers/searchHandler'
import { statesHandler } from './handlers/statesHandler'
import {
  createStatusHandler,
  getStatusesHandler,
  toggleStatusLikeHandler,
} from './handlers/statusHandler'
import { uploadFileHandler } from './handlers/uploadFileHandler'

export const routes = [
  // Blog Posts API routes (UseOptimistic experiment)
  http.get('/api/blog/posts', getBlogPostsHandler),
  http.put('/api/blog/posts/:id/like', toggleBlogPostLikeHandler),
  http.get('/api/search', searchHandler),
  http.get('/api/states', statesHandler),
  http.post('/api/imageUpload', () => {
    return HttpResponse.json({ message: 'ok', status: 201 })
  }),
  http.post('http://localhost:3000/api/dataForm', () => {
    return HttpResponse.json({ message: 'ok', status: 201 })
  }),
  http.post('/api/v1/uploadFiles', uploadFileHandler),
  // Mixi API routes
  http.get('/api/mixi/posts', getPostsHandler),
  http.get('/api/mixi/posts/:id', getPostHandler),
  http.post('/api/mixi/posts', createPostHandler),
  http.put('/api/mixi/posts/:id/like', toggleLikeHandler),
  http.post('/api/mixi/posts/:id/comments', addCommentHandler),
  http.post('/api/mixi/posts/:postId/comments/:commentId/replies', addReplyHandler),
  http.get('/api/mixi/users/:id', getUserHandler),
  // Community API routes
  http.get('/api/mixi/communities', getCommunitiesHandler),
  http.get('/api/mixi/communities/:id', getCommunityHandler),
  http.post('/api/mixi/communities', createCommunityHandler),
  http.post('/api/mixi/communities/:id/join', joinCommunityHandler),
  http.post('/api/mixi/communities/:id/leave', leaveCommunityHandler),
  http.get('/api/mixi/communities/:id/threads', getCommunityThreadsHandler),
  http.get('/api/mixi/threads/:id', getThreadHandler),
  http.post('/api/mixi/communities/:id/threads', createThreadHandler),
  http.post('/api/mixi/threads/:id/comments', addThreadCommentHandler),
  http.post('/api/mixi/threads/:threadId/comments/:commentId/replies', addThreadReplyHandler),
  // Friends API routes
  http.get('/api/mixi/friends', getFriendsHandler),
  http.get('/api/mixi/friends/requests', getFriendRequestsHandler),
  http.post('/api/mixi/friends/requests', sendFriendRequestHandler),
  http.post('/api/mixi/friends/requests/:id/accept', acceptFriendRequestHandler),
  http.post('/api/mixi/friends/requests/:id/reject', rejectFriendRequestHandler),
  http.delete('/api/mixi/friends/requests/:id', cancelFriendRequestHandler),
  http.delete('/api/mixi/friends/:id', removeFriendHandler),
  http.get('/api/mixi/users/search', searchUsersHandler),
  http.get('/api/mixi/friends/mutual/:userId', getMutualFriendsHandler),
  // Footprint API routes
  http.get('/api/mixi/footprints', getFootprintsHandler),
  http.post('/api/mixi/footprints', recordVisitHandler),
  http.delete('/api/mixi/footprints', clearFootprintsHandler),
  http.delete('/api/mixi/footprints/:id', deleteFootprintHandler),
  http.get('/api/mixi/footprints/settings', getFootprintSettingsHandler),
  http.put('/api/mixi/footprints/settings', updateFootprintSettingsHandler),
  // Messages API routes
  http.get('/api/mixi/conversations', getConversationsHandler),
  http.post('/api/mixi/conversations', getOrCreateConversationHandler),
  http.get('/api/mixi/conversations/:id/messages', getConversationMessagesHandler),
  http.post('/api/mixi/conversations/:id/messages', sendMessageHandler),
  http.put('/api/mixi/conversations/:id/read', markConversationReadHandler),
  // Status Updates API routes
  http.get('/api/mixi/statuses', getStatusesHandler),
  http.post('/api/mixi/statuses', createStatusHandler),
  http.put('/api/mixi/statuses/:id/like', toggleStatusLikeHandler),
  // Profile API routes
  http.get('/api/mixi/profile', getProfileHandler),
  http.put('/api/mixi/profile', updateProfileHandler),
]
