import { test, expect } from '@playwright/test'

test.describe('Material UI Migration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Form page - MUI Button functionality', async ({ page }) => {
    // Navigate to Form page
    await page.getByRole('link', { name: 'Form', exact: true }).click()
    await expect(page).toHaveURL('/form')

    // Check if MUI Button is visible
    const submitButton = page.getByRole('button', { name: 'Submit' })
    await expect(submitButton).toBeVisible()

    // Test form validation - empty fields
    await submitButton.click()
    await expect(page.getByText('email is requred')).toBeVisible()
    await expect(page.getByText('password is requred')).toBeVisible()

    // Test form validation - invalid email
    await page.getByRole('textbox').first().fill('invalid-email')
    await page.getByRole('textbox').nth(1).fill('short')
    await submitButton.click()
    await expect(page.getByText('invalid email')).toBeVisible()
    await expect(
      page.getByText('password must be longer than 8 character'),
    ).toBeVisible()

    // Test successful form submission
    await page.getByRole('textbox').first().fill('test@example.com')
    await page.getByRole('textbox').nth(1).fill('password123')
    await submitButton.click()

    // Verify form is cleared after successful submission
    await expect(page.getByRole('textbox').first()).toHaveValue('')
    await expect(page.getByRole('textbox').nth(1)).toHaveValue('')
  })

  test('Context page - MUI Button with migrated styles', async ({ page }) => {
    // Navigate to Context page
    await page.getByRole('link', { name: 'Context', exact: true }).click()
    await expect(page).toHaveURL('/context')

    // Wait for page to load
    await page.waitForSelector('button:has-text("Add Frineds")')

    // Check initial friends list
    const friendsList = page.locator('ul')
    await expect(friendsList).toBeVisible()
    const initialFriendsCount = await friendsList.locator('li').count()
    expect(initialFriendsCount).toBe(3)

    // Click Add Friends button (MUI Button)
    await page.getByRole('button', { name: 'Add Frineds' }).click()

    // Verify new friend was added
    const newFriendsCount = await friendsList.locator('li').count()
    expect(newFriendsCount).toBe(4)
  })

  test('Anime page - Migrated withStyles button', async ({ page }) => {
    // Navigate to Anime page
    await page.getByRole('link', { name: 'CSS Animation', exact: true }).click()
    await expect(page).toHaveURL('/anime')

    // Wait for page to load
    await page.waitForSelector('button:has-text("Toggle")')

    // Check if Toggle button is visible
    const toggleButton = page.getByRole('button', { name: 'Toggle' })
    await expect(toggleButton).toBeVisible()

    // Click Toggle button multiple times to ensure it works
    await toggleButton.click()
    await page.waitForTimeout(400) // Wait for animation
    await toggleButton.click()
    await page.waitForTimeout(400) // Wait for animation

    // Button should still be functional
    await expect(toggleButton).toBeEnabled()
  })

  test('Modal page - MUI Button in modal', async ({ page }) => {
    // Navigate to Modal page
    await page.getByRole('link', { name: 'Modal', exact: true }).click()
    await expect(page).toHaveURL('/modal')

    // Wait for page to load
    await page.waitForSelector('button:has-text("Open")')

    // Check if Open button is visible
    const openButton = page.getByRole('button', { name: 'Open' })
    await expect(openButton).toBeVisible()

    // Click Open button to show modal
    await openButton.click()

    // Verify modal is visible
    await expect(page.locator('[data-cy="modal"]')).toBeVisible()
    await expect(page.getByText('Modal').first()).toBeVisible()

    // Check if Close button is visible
    const closeButton = page.getByRole('button', { name: 'Close' })
    await expect(closeButton).toBeVisible()

    // Click Close button
    await closeButton.click()

    // Verify modal is closed
    await expect(page.locator('[data-cy="modal"]')).not.toBeVisible()
  })

  test('MUI Button styling and theming', async ({ page }) => {
    // Navigate to Form page to check button styling
    await page.getByRole('link', { name: 'Form', exact: true }).click()

    // Check if MUI Button has proper styling
    const submitButton = page.getByRole('button', { name: 'Submit' })

    // Verify button has MUI classes
    const buttonClass = await submitButton.getAttribute('class')
    expect(buttonClass).toContain('MuiButton')
    expect(buttonClass).toContain('MuiButton-contained')
    expect(buttonClass).toContain('MuiButton-sizeLarge')
    expect(buttonClass).toContain('MuiButton-containedPrimary')
  })
})
