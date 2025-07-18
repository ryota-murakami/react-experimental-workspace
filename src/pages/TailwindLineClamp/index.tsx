import React from 'react'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

interface Props {}

const TailwindLineClamp: React.FC<Props> = () => {
  return (
    <Page.Container>
      <Header>
        <Header.H1>Tailwind CSS line-clamp デモ</Header.H1>
      </Header>
      <div className="bg-gray-50 p-8">
        <div className="mx-auto max-w-4xl">
          {/* デモセクション */}
          <div className="space-y-8">
            {/* 比較デモ */}
            <section className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                📊 通常表示 vs line-clamp-2 の比較
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {/* 通常表示 */}
                <div className="rounded-lg border-2 border-gray-200 p-4">
                  <h3 className="mb-2 text-lg font-bold text-blue-600">
                    通常表示（制限なし）
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    これは長いテキストの例です。Tailwind
                    CSSのline-clampユーティリティを使用することで、
                    テキストを指定した行数で切り詰めることができます。この機能は、カードやリストビューなどで
                    コンテンツのプレビューを表示する際に非常に便利です。レスポンシブデザインにも対応しており、
                    様々な画面サイズで一貫した表示を実現できます。
                  </p>
                </div>

                {/* line-clamp-2適用 */}
                <div className="rounded-lg border-2 border-blue-400 bg-blue-50 p-4">
                  <h3 className="mb-2 text-lg font-bold text-blue-600">
                    line-clamp-2 適用
                  </h3>
                  <p className="line-clamp-2 leading-relaxed text-gray-700">
                    これは長いテキストの例です。Tailwind
                    CSSのline-clampユーティリティを使用することで、
                    テキストを指定した行数で切り詰めることができます。この機能は、カードやリストビューなどで
                    コンテンツのプレビューを表示する際に非常に便利です。レスポンシブデザインにも対応しており、
                    様々な画面サイズで一貫した表示を実現できます。
                  </p>
                </div>
              </div>
            </section>

            {/* 実用例：ブログカード */}
            <section className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                📝 実用例：ブログカードリスト
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                {/* カード1 */}
                <article className="overflow-hidden rounded-lg border transition-shadow hover:shadow-lg">
                  <img
                    src="https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=記事1"
                    alt="記事1のプレビュー画像"
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-bold">
                      Tailwind CSSの基本的な使い方
                    </h3>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                      Tailwind
                      CSSは、ユーティリティファーストのCSSフレームワークです。
                      事前に定義されたクラスを組み合わせることで、素早く美しいデザインを実現できます。
                      従来のCSSフレームワークとは異なり、コンポーネントクラスではなく、
                      単一の目的を持つ小さなクラスを組み合わせて使用します。
                    </p>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      続きを読む →
                    </button>
                  </div>
                </article>

                {/* カード2 */}
                <article className="overflow-hidden rounded-lg border transition-shadow hover:shadow-lg">
                  <img
                    src="https://via.placeholder.com/400x200/10B981/FFFFFF?text=記事2"
                    alt="記事2のプレビュー画像"
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-bold">
                      レスポンシブデザインの実装
                    </h3>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                      モダンなWebサイトでは、様々なデバイスサイズに対応することが必須です。
                      Tailwind CSSのレスポンシブユーティリティを使用すれば、
                      ブレークポイントごとに異なるスタイルを簡単に適用できます。
                    </p>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      続きを読む →
                    </button>
                  </div>
                </article>

                {/* カード3 */}
                <article className="overflow-hidden rounded-lg border transition-shadow hover:shadow-lg">
                  <img
                    src="https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=記事3"
                    alt="記事3のプレビュー画像"
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-bold">
                      カスタムコンポーネントの作成
                    </h3>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                      Tailwind
                      CSSを使って再利用可能なコンポーネントを作成する方法を解説します。
                      @applyディレクティブやコンポーネントクラスの作成により、
                      保守性の高いコードベースを実現できます。実際のプロジェクトでの活用例も紹介します。
                    </p>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      続きを読む →
                    </button>
                  </div>
                </article>
              </div>
            </section>

            {/* line-clampの種類 */}
            <section className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                🔢 line-clampの種類
              </h2>

              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">
                    <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                      line-clamp-1
                    </span>
                  </h3>
                  <p className="line-clamp-1 text-gray-600">
                    これは1行で切り詰められるテキストの例です。長い文章でも1行目の途中で切れて、末尾に省略記号が表示されます。
                    タイトルや見出しなど、1行で収めたい場合に便利です。
                  </p>
                </div>

                <div className="rounded-lg border border-blue-300 bg-blue-50 p-4">
                  <h3 className="mb-2 font-semibold">
                    <span className="rounded bg-blue-100 px-2 py-1 font-mono text-sm">
                      line-clamp-2
                    </span>
                  </h3>
                  <p className="line-clamp-2 text-gray-600">
                    これは2行で切り詰められるテキストの例です。カードのプレビューや記事の概要表示によく使用されます。
                    2行目の途中で文章が切れて、末尾に省略記号（...）が自動的に追加されます。
                    ユーザーに「続きがある」ことを視覚的に伝えることができます。
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">
                    <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                      line-clamp-3
                    </span>
                  </h3>
                  <p className="line-clamp-3 text-gray-600">
                    これは3行で切り詰められるテキストの例です。もう少し詳細な情報を表示したい場合に使用します。
                    商品説明やニュース記事のプレビューなど、2行では情報が不足する場合に適しています。
                    3行目の途中で文章が切れて、末尾に省略記号が表示されます。
                    レスポンシブデザインでも適切に動作し、画面サイズに応じて自動的に調整されます。
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">
                    <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                      line-clamp-none
                    </span>
                  </h3>
                  <p className="line-clamp-none text-gray-600">
                    line-clamp-noneを使用すると、line-clampの効果を解除できます。
                    レスポンシブデザインで、モバイルでは2行表示、デスクトップでは全文表示といった使い分けが可能です。
                    例：md:line-clamp-none のように使用します。
                  </p>
                </div>
              </div>
            </section>

            {/* 使用上の注意点 */}
            <section className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                ⚠️ 使用上の注意点
              </h2>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span className="text-gray-700">
                    <strong>ブラウザ対応：</strong>
                    モダンブラウザでは問題なく動作しますが、
                    古いブラウザでは-webkit-プレフィックスが必要な場合があります。
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span className="text-gray-700">
                    <strong>フォールバック：</strong>
                    非対応ブラウザでは全文が表示されるため、
                    レイアウトが崩れないような設計が重要です。
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span className="text-gray-700">
                    <strong>アクセシビリティ：</strong>
                    省略されたテキストの全文を確認できる手段
                    （「続きを読む」リンクなど）を提供することが推奨されます。
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Page.Container>
  )
}

export default TailwindLineClamp
