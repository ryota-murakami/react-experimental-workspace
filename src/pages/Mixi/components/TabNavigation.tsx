import { BookOpen, Users, UserPlus, MessageSquare, User } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

export type Tab = 'diary' | 'community' | 'mymixi' | 'messages' | 'profile'

interface TabNavigationProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
  { id: 'diary', label: 'Diary', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'community', label: 'Community', icon: <Users className="w-5 h-5" /> },
  { id: 'mymixi', label: 'MyMixi', icon: <UserPlus className="w-5 h-5" /> },
  { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
]

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors min-h-[44px] border-b-2',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              )}
            >
              {tab.icon}
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default TabNavigation

