import { test, expect } from '@playwright/test'

test.describe('Top Page', () => {
  test('should load properly and show expected links', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')
    
    // Check if the title is visible
    const title = page.locator('h1')
    await expect(title).toBeVisible()
    await expect(title).toHaveText('React Experimental Workspace')
    
    // Check if all expected links are present
    const links = [
      'DnD',
      'Context',
      'Form',
      'CSS Animation',
      'Modal',
      'Search',
      'WindowOpen',
      'RefCompare',
      'ImageUpload',
      'DateForm',
      'ArrayForm',
      'ContextMenu',
      'MultiFileUpload'
    ]
    
    for (const linkText of links) {
      const link = page.getByRole('link', { name: linkText })
      await expect(link).toBeVisible()
    }
    
    // Test a navigation (e.g., clicking on Form link)
    await page.getByRole('link', { name: 'Form' }).click()
    
    // Verify navigation was successful
    await expect(page).toHaveURL(/\/form$/)
  })
})