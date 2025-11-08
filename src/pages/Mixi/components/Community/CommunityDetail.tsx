

import { ArrowLeft, Plus, Users, MessageSquare } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import ThreadCard from './ThreadCard'
import ThreadCreator from './ThreadCreator'
import ThreadDetail from './ThreadDetail'
import type { Community, Thread } from './types'

interface CommunityDetailProps {
  community: Community
  threads: Thread[]
  selectedThreadId?: string
  onBack: () => void
  onCreateThread: (title: string, content: string) => void
  onSelectThread: (threadId: string) => void
  onCommentAdd: (threadId: string, content: string) => void
  onReplyAdd: (threadId: string, commentId: string, content: string) => void
}

const CommunityDetail: React.FC<CommunityDetailProps> = ({
  community,
  threads,
  selectedThreadId,
  onBack,
  onCreateThread,
  onSelectThread,
  onCommentAdd,
  onReplyAdd,
}) => {
  const [showThreadCreator, setShowThreadCreator] = useState(false)

  const selectedThread = selectedThreadId ? threads.find((t) => t.id === selectedThreadId) : null

  if (selectedThread) {
    return (
      <ThreadDetail
        thread={selectedThread}
        onBack={() => onSelectThread('')}
        onCommentAdd={(content) => onCommentAdd(selectedThread.id, content)}
        onReplyAdd={(commentId, content) => onReplyAdd(selectedThread.id, commentId, content)}
      />
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-4xl">{community.icon || '👥'}</div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{community.name}</h2>
              {community.category && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {community.category}
                </span>
              )}
            </div>
          </div>
          <p className="text-muted-foreground mb-4">{community.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{community.memberCount} members</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{community.threadCount} threads</span>
            </div>
          </div>
        </div>
      </div>

      {/* Create Thread Button */}
      {community.isMember && (
        <div className="flex justify-end">
          <Button
            onClick={() => setShowThreadCreator(true)}
            size="lg"
            className="min-h-[44px]"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Thread
          </Button>
        </div>
      )}

      {/* Thread Creator */}
      {showThreadCreator && (
        <ThreadCreator
          onCreate={(title, content) => {
            onCreateThread(title, content)
            setShowThreadCreator(false)
          }}
          onCancel={() => setShowThreadCreator(false)}
        />
      )}

      {/* Threads List */}
      {threads.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No threads yet</p>
          <p className="text-sm mt-2">
            {community.isMember
              ? 'Start the first discussion thread!'
              : 'Join this community to start discussions'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} onClick={() => onSelectThread(thread.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommunityDetail

