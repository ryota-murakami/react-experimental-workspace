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
    // Using exact: true to avoid ambiguous matches like 'Context' and 'ContextMenu'
    const expectedLinks = [
      { name: 'DnD', exact: true },
      { name: 'Context', exact: true },
      { name: 'Form', exact: true },
      { name: 'CSS Animation', exact: true },
      { name: 'Modal', exact: true },
      { name: 'Search', exact: true },
      { name: 'WindowOpen', exact: true },
      { name: 'RefCompare', exact: true },
      { name: 'ImageUpload', exact: true },
      { name: 'DateForm', exact: true },
      { name: 'ArrayForm', exact: true },
      { name: 'ContextMenu', exact: true },
      { name: 'MultiFileUpload', exact: true }
    ]
    
    for (const linkInfo of expectedLinks) {
      const link = page.getByRole('link', linkInfo)
      await expect(link).toBeVisible()
    }
    
    // Test a navigation (e.g., clicking on Form link)
    await page.getByRole('link', { name: 'Form', exact: true }).click()
    
    // Verify navigation was successful
    await expect(page).toHaveURL(/\/form$/)
  })
})