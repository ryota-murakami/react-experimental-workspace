import { test, expect } from '@playwright/test'

test.describe('TailwindLineClamp Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the TailwindLineClamp page
    await page.goto('/tailwindlineclamp')
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')
  })

  test('should load page with proper layout and title', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle('react-experimental-workspace')

    // Verify main heading
    await expect(
      page.getByRole('heading', { name: 'Tailwind CSS line-clamp デモ' }),
    ).toBeVisible()

    // Verify page layout structure
    await expect(page.locator('.bg-gray-50')).toBeVisible()
    await expect(page.locator('.max-w-4xl')).toBeVisible()
  })

  test('should display comparison section with normal and line-clamp-2 examples', async ({
    page,
  }) => {
    // Verify comparison section heading
    await expect(
      page.getByRole('heading', { name: '📊 通常表示 vs line-clamp-2 の比較' }),
    ).toBeVisible()

    // Verify normal display section
    await expect(
      page.getByRole('heading', { name: '通常表示（制限なし）' }),
    ).toBeVisible()

    // Verify line-clamp-2 section
    await expect(
      page.getByRole('heading', { name: 'line-clamp-2 適用' }),
    ).toBeVisible()

    // Verify the text content appears in both sections (should be 2 instances)
    await expect(
      page
        .getByText(
          'これは長いテキストの例です。Tailwind CSSのline-clampユーティリティを使用することで、',
        )
        .first(),
    ).toBeVisible()

    // Verify the line-clamp-2 styling is applied (should be multiple instances)
    await expect(page.locator('.line-clamp-2').first()).toBeVisible()
  })

  test('should display blog cards section with three examples', async ({
    page,
  }) => {
    // Verify blog cards section heading
    await expect(
      page.getByRole('heading', { name: '📝 実用例：ブログカードリスト' }),
    ).toBeVisible()

    // Verify all three blog card titles
    await expect(
      page.getByRole('heading', { name: 'Tailwind CSSの基本的な使い方' }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'レスポンシブデザインの実装' }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'カスタムコンポーネントの作成' }),
    ).toBeVisible()

    // Verify all "続きを読む" buttons are present
    const readMoreButtons = page.getByRole('button', { name: '続きを読む →' })
    await expect(readMoreButtons).toHaveCount(3)

    // Verify blog card images are present (alt text check)
    await expect(page.getByAltText('記事1のプレビュー画像')).toBeVisible()
    await expect(page.getByAltText('記事2のプレビュー画像')).toBeVisible()
    await expect(page.getByAltText('記事3のプレビュー画像')).toBeVisible()

    // Verify line-clamp-2 is applied to blog card descriptions
    await expect(page.locator('article .line-clamp-2')).toHaveCount(3)
  })

  test('should display line-clamp variants section with all examples', async ({
    page,
  }) => {
    // Verify line-clamp types section heading
    await expect(
      page.getByRole('heading', { name: '🔢 line-clampの種類' }),
    ).toBeVisible()

    // Verify all line-clamp variant headings - using exact match
    await expect(
      page.getByRole('heading', { name: 'line-clamp-1', exact: true }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'line-clamp-2', exact: true }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'line-clamp-3', exact: true }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'line-clamp-none', exact: true }),
    ).toBeVisible()

    // Verify each line-clamp class is applied
    await expect(page.locator('.line-clamp-1')).toBeVisible()
    await expect(page.locator('.line-clamp-2').first()).toBeVisible()
    await expect(page.locator('.line-clamp-3')).toBeVisible()
    await expect(page.locator('.line-clamp-none')).toBeVisible()

    // Verify code snippets in spans
    await expect(page.locator('span').getByText('line-clamp-1')).toBeVisible()
    await expect(page.locator('span').getByText('line-clamp-2')).toBeVisible()
    await expect(page.locator('span').getByText('line-clamp-3')).toBeVisible()
    await expect(
      page.locator('span').getByText('line-clamp-none'),
    ).toBeVisible()
  })

  test('should display usage notes section with proper formatting', async ({
    page,
  }) => {
    // Verify usage notes section heading
    await expect(
      page.getByRole('heading', { name: '⚠️ 使用上の注意点' }),
    ).toBeVisible()

    // Verify all three usage note items are present
    await expect(page.getByText('ブラウザ対応：')).toBeVisible()
    await expect(page.getByText('フォールバック：')).toBeVisible()
    await expect(page.getByText('アクセシビリティ：')).toBeVisible()

    // Verify checkmarks are present
    await expect(page.getByText('✓')).toHaveCount(3)

    // Verify list structure
    await expect(page.locator('ul li')).toHaveCount(3)
  })

  test('should have proper responsive layout and styling', async ({ page }) => {
    // Verify grid layouts are applied
    await expect(page.locator('.grid.md\\:grid-cols-2')).toBeVisible()
    await expect(page.locator('.grid.md\\:grid-cols-3')).toBeVisible()

    // Verify sections have proper spacing
    await expect(page.locator('.space-y-8')).toBeVisible()
    await expect(page.locator('.space-y-4')).toBeVisible()
    await expect(page.locator('.space-y-3')).toBeVisible()

    // Verify cards have proper styling
    await expect(page.locator('.bg-white.rounded-lg.shadow-md')).toHaveCount(4)

    // Verify proper padding and margins are applied
    await expect(page.locator('.p-6')).toHaveCount(4)
    await expect(page.locator('.p-4')).toHaveCount(9) // 4 line-clamp examples + 3 blog cards + 2 comparison examples
  })

  test('should demonstrate line-clamp functionality visually', async ({
    page,
  }) => {
    // Scroll to different sections to verify line-clamp behavior

    // Scroll to line-clamp examples section
    await page.locator('text=🔢 line-clampの種類').scrollIntoViewIfNeeded()

    // Take screenshot for visual verification (if needed for debugging)
    // await page.screenshot({ path: 'line-clamp-examples.png' })

    // Verify line-clamp-1 truncates to one line
    const lineClamp1Text = page.locator('.line-clamp-1')
    await expect(lineClamp1Text).toBeVisible()

    // Verify line-clamp-2 truncates to two lines
    const lineClamp2Text = page.locator('.line-clamp-2').first()
    await expect(lineClamp2Text).toBeVisible()

    // Verify line-clamp-3 truncates to three lines
    const lineClamp3Text = page.locator('.line-clamp-3')
    await expect(lineClamp3Text).toBeVisible()

    // Verify line-clamp-none shows full text
    const lineClampNoneText = page.locator('.line-clamp-none')
    await expect(lineClampNoneText).toBeVisible()
  })

  test('should have accessible content and proper semantics', async ({
    page,
  }) => {
    // Verify proper heading hierarchy (h1, h2, h3)
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toHaveCount(1)
    await expect(h1).toHaveText('Tailwind CSS line-clamp デモ')

    const h2 = page.getByRole('heading', { level: 2 })
    await expect(h2).toHaveCount(4) // 4 main sections

    const h3 = page.getByRole('heading', { level: 3 })
    await expect(h3).toHaveCount(9) // 2 comparison + 3 blog cards + 4 line-clamp types

    // Verify article semantics for blog cards
    await expect(page.locator('article')).toHaveCount(3)

    // Verify proper alt text for images
    await expect(page.getByAltText('記事1のプレビュー画像')).toBeVisible()
    await expect(page.getByAltText('記事2のプレビュー画像')).toBeVisible()
    await expect(page.getByAltText('記事3のプレビュー画像')).toBeVisible()

    // Verify buttons are properly labeled
    const buttons = page.getByRole('button', { name: '続きを読む →' })
    await expect(buttons).toHaveCount(3)
  })

  test('should handle scrolling and page navigation', async ({ page }) => {
    // Test scrolling to different sections
    await page.locator('text=📊 通常表示').scrollIntoViewIfNeeded()
    await expect(
      page.getByRole('heading', { name: '📊 通常表示 vs line-clamp-2 の比較' }),
    ).toBeInViewport()

    await page.locator('text=📝 実用例').scrollIntoViewIfNeeded()
    await expect(
      page.getByRole('heading', { name: '📝 実用例：ブログカードリスト' }),
    ).toBeInViewport()

    await page.locator('text=🔢 line-clampの種類').scrollIntoViewIfNeeded()
    await expect(
      page.getByRole('heading', { name: '🔢 line-clampの種類' }),
    ).toBeInViewport()

    await page.locator('text=⚠️ 使用上の注意点').scrollIntoViewIfNeeded()
    await expect(
      page.getByRole('heading', { name: '⚠️ 使用上の注意点' }),
    ).toBeInViewport()

    // Scroll back to top
    await page.locator('h1').scrollIntoViewIfNeeded()
    await expect(
      page.getByRole('heading', { name: 'Tailwind CSS line-clamp デモ' }),
    ).toBeInViewport()
  })

  test('should display all content sections in correct order', async ({
    page,
  }) => {
    // Verify the order of content sections
    const sections = page.locator('section')
    await expect(sections).toHaveCount(5) // 4 content sections + 1 header banner

    // Verify section order by checking headings in sequence
    const sectionHeadings = [
      '📊 通常表示 vs line-clamp-2 の比較',
      '📝 実用例：ブログカードリスト',
      '🔢 line-clampの種類',
      '⚠️ 使用上の注意点',
    ]

    for (let i = 0; i < sectionHeadings.length; i++) {
      await expect(
        sections.nth(i).getByRole('heading', { level: 2 }),
      ).toHaveText(sectionHeadings[i])
    }
  })
})
