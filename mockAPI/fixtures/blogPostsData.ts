/**
 * Blog posts fixture data for UseOptimistic experiment
 * Contains 100 posts for demonstrating pagination and optimistic updates
 */

export interface BlogPost {
  id: number
  title: string
  content: string
  author: string
  likes: number
  liked: boolean
  createdAt: string
}

/**
 * Generate mock blog posts for pagination demo
 * @param count - Number of posts to generate
 * @returns Array of mock blog posts
 */
function generateMockPosts(count: number): BlogPost[] {
  const authors = [
    'Alice Johnson',
    'Bob Smith',
    'Carol Williams',
    'David Brown',
    'Eve Davis',
    'Frank Miller',
    'Grace Wilson',
    'Henry Moore',
  ]

  const topics = [
    'React 19の新機能について',
    'TypeScriptの型システム入門',
    'Next.js App Routerの使い方',
    'Tailwind CSSでモダンなUI設計',
    'useOptimisticで楽観的更新を実装',
    'Server Componentsの基礎',
    'フロントエンドテスト戦略',
    'パフォーマンス最適化テクニック',
    'GraphQLとREST APIの比較',
    'モノレポ構成のベストプラクティス',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `${topics[i % topics.length]} #${i + 1}`,
    content: `これはブログポスト ${i + 1} のサンプルコンテンツです。useOptimistic hookを使った楽観的更新のデモンストレーションのために作成されました。APIは意図的に1000msのディレイを設けており、いいねボタンを押した際の楽観的更新の効果を確認できます。`,
    author: authors[i % authors.length],
    likes: Math.floor(Math.random() * 100),
    liked: false,
    createdAt: new Date(Date.now() - i * 3600000).toISOString(),
  }))
}

export const mockBlogPosts: BlogPost[] = generateMockPosts(100)
