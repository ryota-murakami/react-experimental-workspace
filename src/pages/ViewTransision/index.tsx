import React, { useState, useDeferredValue, startTransition, useCallback, useMemo } from 'react'

import { Page } from '@/components/Page'

import styles from './ViewTransision.module.css'

// Utility function to handle View Transitions
const withViewTransition = (callback: () => void) => {
  if ('startViewTransition' in document) {
    (document as any).startViewTransition(callback)
  } else {
    callback()
  }
}

// Mock YouTube video data
const mockVideos = [
  {
    id: 'video1',
    title: 'React 18 New Features Explained',
    thumbnail: 'https://img.youtube.com/vi/8pDqJVdNa44/maxresdefault.jpg',
    duration: '12:34',
    channel: 'React Conf',
    views: '45K views',
    category: 'react'
  },
  {
    id: 'video2',
    title: 'Building Beautiful UIs with Tailwind CSS',
    thumbnail: 'https://img.youtube.com/vi/UBOj6rqRUME/maxresdefault.jpg',
    duration: '8:45',
    channel: 'Design Academy',
    views: '28K views',
    category: 'css'
  },
  {
    id: 'video3',
    title: 'JavaScript ES2024 New Features',
    thumbnail: 'https://img.youtube.com/vi/q8dH71FxMaI/maxresdefault.jpg',
    duration: '15:22',
    channel: 'JS Mastery',
    views: '67K views',
    category: 'javascript'
  },
  {
    id: 'video4',
    title: 'TypeScript Best Practices for React',
    thumbnail: 'https://img.youtube.com/vi/CnzTy_CRMcY/maxresdefault.jpg',
    duration: '22:18',
    channel: 'Code with Tim',
    views: '33K views',
    category: 'typescript'
  },
  {
    id: 'video5',
    title: 'Node.js Performance Optimization',
    thumbnail: 'https://img.youtube.com/vi/FJqqXQeZqls/maxresdefault.jpg',
    duration: '18:56',
    channel: 'Backend Guru',
    views: '41K views',
    category: 'nodejs'
  },
  {
    id: 'video6',
    title: 'Building REST APIs with Express',
    thumbnail: 'https://img.youtube.com/vi/L72fhGm1tfE/maxresdefault.jpg',
    duration: '25:43',
    channel: 'API Masters',
    views: '52K views',
    category: 'nodejs'
  },
  {
    id: 'video7',
    title: 'React Component Testing with Jest',
    thumbnail: 'https://img.youtube.com/vi/3e1GHCA3GP0/maxresdefault.jpg',
    duration: '14:32',
    channel: 'Testing Pro',
    views: '19K views',
    category: 'react'
  },
  {
    id: 'video8',
    title: 'Advanced CSS Grid Techniques',
    thumbnail: 'https://img.youtube.com/vi/EiNiSFIPIQE/maxresdefault.jpg',
    duration: '11:27',
    channel: 'CSS Ninja',
    views: '36K views',
    category: 'css'
  }
]

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  channel: string
  views: string
  category: string
}

interface VideoCardProps {
  video: Video
  onClick: (video: Video) => void
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const handleClick = useCallback(() => {
    withViewTransition(() => onClick(video))
  }, [video, onClick])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }, [handleClick])

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer ${styles['video-card']}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${video.title} by ${video.channel}`}
      style={{ viewTransitionName: `video-${video.id}` }}
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-48 object-cover ${styles['video-thumbnail']}`}
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          {video.duration}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-gray-600 text-sm mb-1">{video.channel}</p>
        <p className="text-gray-500 text-sm">{video.views}</p>
      </div>
    </div>
  )
}

interface VideoOverlayProps {
  video: Video | null
  onClose: () => void
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ video, onClose }) => {
  const handleBackdropClick = useCallback(() => {
    onClose()
  }, [onClose])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  if (!video) return null

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 ${styles['overlay-enter']}`}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label="Close video overlay"
      tabIndex={0}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-title"
        style={{ viewTransitionName: `video-${video.id}` }}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-all"
          >
            ×
          </button>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
        <div className="p-6">
          <h2 id="video-title" className="text-2xl font-bold mb-4">{video.title}</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium">{video.channel}</span>
            <span className="text-gray-600">{video.views}</span>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-gray-700">
              This is a placeholder for the video player. In a real implementation,
              you would embed the actual YouTube video player here.
            </p>
            <div className="mt-4 flex items-center justify-center bg-gray-300 h-32 rounded">
              <span className="text-gray-600">Video Player Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ViewTransision: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const deferredSearchQuery = useDeferredValue(searchQuery)
  const deferredCategory = useDeferredValue(selectedCategory)

  const categories = useMemo(() => ['all', 'react', 'javascript', 'typescript', 'css', 'nodejs'], [])

  const filteredVideos = useMemo(() => {
    return mockVideos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
                           video.channel.toLowerCase().includes(deferredSearchQuery.toLowerCase())
      const matchesCategory = deferredCategory === 'all' || video.category === deferredCategory
      return matchesSearch && matchesCategory
    })
  }, [deferredSearchQuery, deferredCategory])

  const handleSearch = useCallback((value: string) => {
    withViewTransition(() => {
      startTransition(() => {
        setSearchQuery(value)
      })
    })
  }, [])

  const handleCategoryChange = useCallback((category: string) => {
    withViewTransition(() => {
      startTransition(() => {
        setSelectedCategory(category)
      })
    })
  }, [])

  const handleVideoClick = useCallback((video: Video) => {
    startTransition(() => {
      setSelectedVideo(video)
    })
  }, [])

  const handleCloseOverlay = useCallback(() => {
    withViewTransition(() => {
      startTransition(() => {
        setSelectedVideo(null)
      })
    })
  }, [])

  return (
    <Page.Container>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              YouTube Video Explorer
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Experience smooth View Transitions while filtering and exploring videos
            </p>
          </header>

          {/* Search and Filter Controls */}
          <div className="mb-8 space-y-4">
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className={`w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${styles['search-input']}`}
              />
            </div>

            <div className="flex justify-center">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${styles['category-button']} ${
                      selectedCategory === category
                        ? `bg-blue-500 text-white ${styles.active}`
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Showing {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Video Grid */}
          <div className={`${styles['video-grid']} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={handleVideoClick}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No videos found matching your criteria</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
            </div>
          )}
        </div>

        {/* Video Overlay */}
        <VideoOverlay video={selectedVideo} onClose={handleCloseOverlay} />
      </div>
    </Page.Container>
  )
}

export default ViewTransision
