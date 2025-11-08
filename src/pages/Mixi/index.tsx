import React, { useEffect, useState } from 'react'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

import {
  clearFootprints,
  deleteFootprint,
  getFootprintSettings,
  getFootprints,
  updateFootprintSettings,
} from './api/footprintApi'
import {
  acceptFriendRequest,
  cancelFriendRequest,
  getFriendRequests,
  getFriends,
  rejectFriendRequest,
  removeFriend,
  searchUsers,
  sendFriendRequest,
} from './api/friendsApi'
import {
  getConversationMessages,
  getConversations,
  getOrCreateConversation,
  markConversationRead,
  sendMessage,
} from './api/messagesApi'
import {
  addComment,
  addReply,
  addThreadComment,
  addThreadReply,
  createCommunity,
  createPost,
  createThread,
  getCommunities,
  getCommunityThreads,
  getPosts,
  joinCommunity,
  leaveCommunity,
  toggleLike,
} from './api/mixiApi'
import { getProfile, updateProfile } from './api/profileApi'
import { createStatus, getStatuses, toggleStatusLike } from './api/statusApi'
import CommunityDetail from './components/Community/CommunityDetail'
import CommunityList from './components/Community/CommunityList'
import type { Community, Thread } from './components/Community/types'
import DiaryFeed, { type Post } from './components/DiaryFeed'
import type { Footprint, FootprintSettings } from './components/Footprint/types'
import MyMixi from './components/Friends/MyMixi'
import type { Friend, FriendRequest } from './components/Friends/types'
import Messages from './components/Messages/Messages'
import type { Conversation, Message } from './components/Messages/types'
import ProfilePage from './components/Profile/ProfilePage'
import type { Profile } from './components/Profile/types'
import StatusFeed from './components/StatusUpdates/StatusFeed'
import type { StatusUpdate } from './components/StatusUpdates/types'
import TabNavigation, { type Tab } from './components/TabNavigation'

interface Props {}

const CURRENT_USER_ID = 'current-user'

const Mixi: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState<Tab>('diary')
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Community state
  const [communities, setCommunities] = useState<Community[]>([])
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null)
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const [threads, setThreads] = useState<Thread[]>([])
  const [communitiesLoading, setCommunitiesLoading] = useState(false)

  // Friends state
  const [friends, setFriends] = useState<Friend[]>([])
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([])
  const [friendsLoading, setFriendsLoading] = useState(false)

  // Footprint state
  const [footprints, setFootprints] = useState<Footprint[]>([])
  const [footprintSettings, setFootprintSettings] = useState<FootprintSettings>({
    enabled: true,
    showVisitCount: true,
  })
  const [footprintsLoading, setFootprintsLoading] = useState(false)

  // Messages state
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const [conversationMessages, setConversationMessages] = useState<Message[]>([])
  const [messagesLoading, setMessagesLoading] = useState(false)

  // Status Updates state
  const [statuses, setStatuses] = useState<StatusUpdate[]>([])
  const [statusesLoading, setStatusesLoading] = useState(false)

  // Profile state
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileLoading, setProfileLoading] = useState(false)

  // Fetch posts and statuses on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setStatusesLoading(true)
        const [postsResponse, statusesResponse] = await Promise.all([
          getPosts({ limit: 50 }),
          getStatuses({ limit: 50 }),
        ])
        setPosts(postsResponse.posts)
        setStatuses(statusesResponse.statuses)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load feed')
      } finally {
        setLoading(false)
        setStatusesLoading(false)
      }
    }

    fetchData()
  }, [])

  // Fetch communities when community tab is active
  useEffect(() => {
    if (activeTab === 'community' && communities.length === 0) {
      const fetchCommunities = async () => {
        try {
          setCommunitiesLoading(true)
          const response = await getCommunities()
          setCommunities(response.communities)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load communities')
        } finally {
          setCommunitiesLoading(false)
        }
      }
      fetchCommunities()
    }
  }, [activeTab, communities.length])

  // Fetch threads when a community is selected
  useEffect(() => {
    if (selectedCommunityId) {
      const fetchThreads = async () => {
        try {
          const response = await getCommunityThreads(selectedCommunityId, { limit: 50 })
          setThreads(response.threads)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load threads')
        }
      }
      fetchThreads()
    }
  }, [selectedCommunityId])

  // Fetch friends when mymixi tab is active
  useEffect(() => {
    if (activeTab === 'mymixi') {
      const fetchFriendsData = async () => {
        try {
          setFriendsLoading(true)
          const [friendsResponse, requestsResponse] = await Promise.all([
            getFriends(),
            getFriendRequests(),
          ])
          setFriends(friendsResponse.friends)
          setFriendRequests(requestsResponse.requests)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load friends data')
        } finally {
          setFriendsLoading(false)
        }
      }
      fetchFriendsData()
    }
  }, [activeTab])

  // Fetch footprints when profile tab is active
  useEffect(() => {
    if (activeTab === 'profile') {
      const fetchFootprintsData = async () => {
        try {
          setFootprintsLoading(true)
          const [footprintsResponse, settingsResponse] = await Promise.all([
            getFootprints({ limit: 50 }),
            getFootprintSettings(),
          ])
          setFootprints(footprintsResponse.footprints)
          setFootprintSettings(settingsResponse.settings)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load footprints')
        } finally {
          setFootprintsLoading(false)
        }
      }
      fetchFootprintsData()
    }
  }, [activeTab])

  // Fetch profile when profile tab is active
  useEffect(() => {
    if (activeTab === 'profile' && !profile) {
      const fetchProfile = async () => {
        try {
          setProfileLoading(true)
          const response = await getProfile()
          setProfile(response.profile)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load profile')
        } finally {
          setProfileLoading(false)
        }
      }
      fetchProfile()
    }
  }, [activeTab, profile])

  // Fetch conversations when messages tab is active
  useEffect(() => {
    if (activeTab === 'messages' && conversations.length === 0) {
      const fetchConversations = async () => {
        try {
          setMessagesLoading(true)
          const response = await getConversations({ limit: 50 })
          setConversations(response.conversations)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load conversations')
        } finally {
          setMessagesLoading(false)
        }
      }
      fetchConversations()
    }
  }, [activeTab, conversations.length])

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (selectedConversationId) {
      const fetchMessages = async () => {
        try {
          const response = await getConversationMessages(selectedConversationId, { limit: 100 })
          setConversationMessages(response.messages)
          // Mark conversation as read
          await markConversationRead(selectedConversationId)
          // Update conversation in list
          setConversations((prev) =>
            prev.map((c) =>
              c.id === selectedConversationId ? { ...c, unreadCount: 0 } : c
            )
          )
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load messages')
        }
      }
      fetchMessages()
    } else {
      setConversationMessages([])
    }
  }, [selectedConversationId])

  const handlePostCreate = async (
    postData: Omit<Post, 'id' | 'createdAt' | 'likes' | 'liked' | 'comments'>
  ) => {
    try {
      const response = await createPost({
        ...postData,
        author: {
          id: CURRENT_USER_ID,
          name: 'You',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        },
      })
      setPosts([response.post, ...posts])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
    }
  }

  const handlePostLike = async (postId: string) => {
    try {
      const response = await toggleLike(postId)
      setPosts(
        posts.map((post) => (post.id === postId ? response.post : post))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle like')
    }
  }

  const handleCommentAdd = async (postId: string, content: string) => {
    try {
      const response = await addComment(postId, {
        content,
        authorId: CURRENT_USER_ID,
      })
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, response.comment],
            }
          }
          return post
        })
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add comment')
    }
  }

  const handleReplyAdd = async (postId: string, commentId: string, content: string) => {
    try {
      const response = await addReply(postId, commentId, {
        content,
        authorId: CURRENT_USER_ID,
      })
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.map((comment) => {
                if (comment.id === commentId) {
                  return {
                    ...comment,
                    replies: [...(comment.replies || []), response.reply],
                  }
                }
                return comment
              }),
            }
          }
          return post
        })
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add reply')
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'diary':
        if (loading) {
          return (
            <div className="w-full max-w-2xl mx-auto py-12 text-center text-muted-foreground">
              <p className="text-lg">Loading posts...</p>
            </div>
          )
        }

        if (error) {
          return (
            <div className="w-full max-w-2xl mx-auto py-12 text-center">
              <p className="text-lg text-destructive">Error: {error}</p>
            </div>
          )
        }

        return (
          <div className="w-full max-w-2xl mx-auto space-y-8">
            {/* Status Updates Section */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Status Updates</h2>
              {statusesLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Loading status updates...</p>
                </div>
              ) : (
                <StatusFeed
                  statuses={statuses}
                  onCreate={async (statusData) => {
                    try {
                      const response = await createStatus({
                        content: statusData.content,
                        author: statusData.author,
                      })
                      setStatuses([response.status, ...statuses])
                    } catch (err) {
                      setError(err instanceof Error ? err.message : 'Failed to create status')
                    }
                  }}
                  onLike={async (statusId) => {
                    try {
                      const response = await toggleStatusLike(statusId)
                      setStatuses(
                        statuses.map((s) => (s.id === statusId ? response.status : s))
                      )
                    } catch (err) {
                      setError(err instanceof Error ? err.message : 'Failed to toggle like')
                    }
                  }}
                />
              )}
            </div>

            {/* Diary Posts Section */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Diary</h2>
              <DiaryFeed
                posts={posts}
                onPostCreate={handlePostCreate}
                onPostLike={handlePostLike}
                onCommentAdd={handleCommentAdd}
                onReplyAdd={handleReplyAdd}
              />
            </div>
          </div>
        )
      case 'community':
        if (selectedCommunityId) {
          const selectedCommunity = communities.find((c) => c.id === selectedCommunityId)
          if (!selectedCommunity) {
            setSelectedCommunityId(null)
            return null
          }

          return (
            <CommunityDetail
              community={selectedCommunity}
              threads={threads}
              selectedThreadId={selectedThreadId || undefined}
              onBack={() => {
                setSelectedCommunityId(null)
                setSelectedThreadId(null)
              }}
              onCreateThread={async (title, content) => {
                try {
                  const response = await createThread(selectedCommunityId, {
                    title,
                    content,
                    authorId: CURRENT_USER_ID,
                  })
                  setThreads([response.thread, ...threads])
                  setSelectedThreadId(response.thread.id)
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Failed to create thread')
                }
              }}
              onSelectThread={(threadId) => setSelectedThreadId(threadId || null)}
              onCommentAdd={async (threadId, content) => {
                try {
                  const response = await addThreadComment(threadId, {
                    content,
                    authorId: CURRENT_USER_ID,
                  })
                  setThreads(
                    threads.map((thread) => {
                      if (thread.id === threadId) {
                        return {
                          ...thread,
                          comments: [...thread.comments, response.comment],
                          commentCount: thread.commentCount + 1,
                        }
                      }
                      return thread
                    })
                  )
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Failed to add comment')
                }
              }}
              onReplyAdd={async (threadId, commentId, content) => {
                try {
                  const response = await addThreadReply(threadId, commentId, {
                    content,
                    authorId: CURRENT_USER_ID,
                  })
                  setThreads(
                    threads.map((thread) => {
                      if (thread.id === threadId) {
                        return {
                          ...thread,
                          comments: thread.comments.map((comment) => {
                            if (comment.id === commentId) {
                              return {
                                ...comment,
                                replies: [...(comment.replies || []), response.reply],
                              }
                            }
                            return comment
                          }),
                        }
                      }
                      return thread
                    })
                  )
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Failed to add reply')
                }
              }}
            />
          )
        }

        if (communitiesLoading) {
          return (
            <div className="w-full max-w-4xl mx-auto py-12 text-center text-muted-foreground">
              <p className="text-lg">Loading communities...</p>
            </div>
          )
        }

        return (
          <CommunityList
            communities={communities}
            onCreateCommunity={async (data) => {
              try {
                const response = await createCommunity(data)
                setCommunities([response.community, ...communities])
                setSelectedCommunityId(response.community.id)
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to create community')
              }
            }}
            onJoinCommunity={async (communityId) => {
              try {
                const response = await joinCommunity(communityId)
                setCommunities(
                  communities.map((c) => (c.id === communityId ? response.community : c))
                )
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to join community')
              }
            }}
            onLeaveCommunity={async (communityId) => {
              try {
                const response = await leaveCommunity(communityId)
                setCommunities(
                  communities.map((c) => (c.id === communityId ? response.community : c))
                )
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to leave community')
              }
            }}
            onSelectCommunity={(communityId) => setSelectedCommunityId(communityId)}
          />
        )
      case 'mymixi':
        if (friendsLoading) {
          return (
            <div className="w-full max-w-4xl mx-auto py-12 text-center text-muted-foreground">
              <p className="text-lg">Loading friends...</p>
            </div>
          )
        }

        return (
          <MyMixi
            friends={friends}
            friendRequests={friendRequests}
            onRemoveFriend={async (friendId) => {
              try {
                await removeFriend(friendId)
                setFriends(friends.filter((f) => f.id !== friendId))
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to remove friend')
              }
            }}
            onAcceptRequest={async (requestId) => {
              try {
                const response = await acceptFriendRequest(requestId)
                setFriends([...friends, response.friend])
                setFriendRequests(
                  friendRequests.map((r) => (r.id === requestId ? response.request : r))
                )
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to accept request')
              }
            }}
            onRejectRequest={async (requestId) => {
              try {
                const response = await rejectFriendRequest(requestId)
                setFriendRequests(
                  friendRequests.map((r) => (r.id === requestId ? response.request : r))
                )
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to reject request')
              }
            }}
            onCancelRequest={async (requestId) => {
              try {
                await cancelFriendRequest(requestId)
                setFriendRequests(friendRequests.filter((r) => r.id !== requestId))
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to cancel request')
              }
            }}
            onAddFriend={async (userId) => {
              try {
                const response = await sendFriendRequest(userId)
                setFriendRequests([...friendRequests, response.request])
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to send friend request')
              }
            }}
            searchUsers={searchUsers}
          />
        )
      case 'messages':
        if (messagesLoading && conversations.length === 0) {
          return (
            <div className="w-full max-w-2xl mx-auto py-12 text-center text-muted-foreground">
              <p className="text-lg">Loading messages...</p>
            </div>
          )
        }

        return (
          <Messages
            conversations={conversations}
            selectedConversationId={selectedConversationId || undefined}
            selectedConversationMessages={conversationMessages}
            onSelectConversation={(conversationId) =>
              setSelectedConversationId(conversationId || null)
            }
            onSendMessage={async (conversationId, content, images, links) => {
              try {
                const response = await sendMessage(conversationId, {
                  content,
                  images,
                  links,
                })
                setConversationMessages([...conversationMessages, response.message])
                // Update conversation in list
                setConversations(
                  conversations.map((c) =>
                    c.id === conversationId
                      ? {
                          ...c,
                          lastMessage: response.message,
                          updatedAt: response.message.createdAt,
                        }
                      : c
                  )
                )
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to send message')
              }
            }}
            onCreateConversation={async () => {
              // For now, create a conversation with the first friend
              // In a real app, this would open a user picker
              if (friends.length > 0) {
                try {
                  const response = await getOrCreateConversation(friends[0].user.id)
                  setConversations([response.conversation, ...conversations])
                  setSelectedConversationId(response.conversation.id)
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Failed to create conversation')
                }
              }
            }}
            currentUserId={CURRENT_USER_ID}
          />
        )
      case 'profile':
        if (profileLoading || footprintsLoading || !profile) {
          return (
            <div className="w-full max-w-4xl mx-auto py-12 text-center text-muted-foreground">
              <p className="text-lg">Loading profile...</p>
            </div>
          )
        }

        return (
          <ProfilePage
            profile={profile}
            onUpdateProfile={async (updates) => {
              try {
                const response = await updateProfile(updates)
                setProfile(response.profile)
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to update profile')
              }
            }}
            footprints={footprints}
            footprintSettings={footprintSettings}
            onDeleteFootprint={async (footprintId) => {
              try {
                await deleteFootprint(footprintId)
                setFootprints(footprints.filter((f) => f.id !== footprintId))
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to delete footprint')
              }
            }}
            onClearFootprints={async () => {
              try {
                await clearFootprints()
                setFootprints([])
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to clear footprints')
              }
            }}
            onUpdateFootprintSettings={async (settings) => {
              try {
                const response = await updateFootprintSettings(settings)
                setFootprintSettings(response.settings)
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to update settings')
              }
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <Page.Container className="pb-8">
      <Header>
        <Header.H1>Mixi</Header.H1>
      </Header>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="container mx-auto px-4 py-8">{renderTabContent()}</div>
    </Page.Container>
  )
}

export default Mixi
