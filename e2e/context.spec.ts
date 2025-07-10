import { test, expect } from '@playwright/test'

test.describe('Context Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the context page
    await page.goto('/context')
  })

  test('should load page with proper layout and educational content', async ({
    page,
  }) => {
    // Verify page title
    await expect(page).toHaveTitle('react-experimental-workspace')

    // Verify main heading
    await expect(
      page.getByRole('heading', { name: 'React Context API Demo' }),
    ).toBeVisible()

    // Verify subtitle
    await expect(
      page.getByRole('heading', {
        name: 'Learn how React Context API manages state and handles re-renders',
      }),
    ).toBeVisible()

    // Verify educational description
    await expect(
      page.getByText(
        'This demo showcases how Context API propagates state changes and triggers re-renders',
      ),
    ).toBeVisible()

    // Verify components are visible
    await expect(
      page.getByRole('heading', { name: 'Friends List Component' }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'View Component' }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Child Component' }),
    ).toBeVisible()

    // Verify educational alerts
    await expect(
      page.getByText(
        'This component subscribes to the friends array in context',
      ),
    ).toBeVisible()
    await expect(
      page.getByText(
        "This child component only subscribes to the 'age' property from context",
      ),
    ).toBeVisible()
  })

  test('should add friends and update friends list', async ({ page }) => {
    // Check initial friends count
    await expect(page.getByText('Total Friends: 3')).toBeVisible()

    // Verify initial friends are visible
    await expect(page.getByText('mark')).toBeVisible()
    await expect(page.getByText('james')).toBeVisible()
    await expect(page.getByText('martin')).toBeVisible()

    // Add a friend
    await page.getByRole('button', { name: 'Add Friend' }).click()

    // Verify friends count increased
    await expect(page.getByText('Total Friends: 4')).toBeVisible()

    // Verify a new friend was added (random name generated)
    await expect(page.getByText('Friend #4')).toBeVisible()

    // Add another friend
    await page.getByRole('button', { name: 'Add Friend' }).click()

    // Verify friends count increased again
    await expect(page.getByText('Total Friends: 5')).toBeVisible()
    await expect(page.getByText('Friend #5')).toBeVisible()
  })

  test('should increase age and update both View and Child components', async ({
    page,
  }) => {
    // Verify initial age in both components
    await expect(
      page.getByRole('heading', { name: '34' }).first(),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: '34' }).last()).toBeVisible()

    // Click increase age button
    await page.getByRole('button', { name: 'Increase Age' }).click()

    // Verify age increased in both components
    await expect(
      page.getByRole('heading', { name: '35' }).first(),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: '35' }).last()).toBeVisible()

    // Click multiple times to verify consistent updates
    await page.getByRole('button', { name: 'Increase Age' }).click()
    await page.getByRole('button', { name: 'Increase Age' }).click()

    // Verify age is now 37 in both components
    await expect(
      page.getByRole('heading', { name: '37' }).first(),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: '37' }).last()).toBeVisible()
  })

  test('should clear name and update user name display', async ({ page }) => {
    // Verify initial user name
    await expect(page.getByText('Current user: jack')).toBeVisible()

    // Click clear name button
    await page.getByRole('button', { name: 'Clear Name' }).click()

    // Verify name was cleared
    await expect(page.getByText('Current user: No name')).toBeVisible()

    // Verify the text "Current user: jack" is no longer visible
    await expect(page.getByText('Current user: jack')).not.toBeVisible()
  })

  test('should increment age from child component and propagate to parent', async ({
    page,
  }) => {
    // Verify initial age in both components
    await expect(
      page.getByRole('heading', { name: '34' }).first(),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: '34' }).last()).toBeVisible()

    // Click increment age button from child component
    await page.getByRole('button', { name: 'Increment Age from Child' }).click()

    // Verify age increased in both parent and child components
    await expect(
      page.getByRole('heading', { name: '35' }).first(),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: '35' }).last()).toBeVisible()

    // Test multiple increments from child
    await page.getByRole('button', { name: 'Increment Age from Child' }).click()
    await page.getByRole('button', { name: 'Increment Age from Child' }).click()

    // Verify age is now 37 in both components
    await expect(
      page.getByRole('heading', { name: '37' }).first(),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: '37' }).last()).toBeVisible()
  })

  test('should demonstrate context propagation with mixed operations', async ({
    page,
  }) => {
    // Test a combination of operations to verify context integrity

    // Initial state verification
    await expect(page.getByText('Current user: jack')).toBeVisible()
    await expect(page.getByText('Total Friends: 3')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: '34' }).first(),
    ).toBeVisible()

    // Clear name first
    await page.getByRole('button', { name: 'Clear Name' }).click()
    await expect(page.getByText('Current user: No name')).toBeVisible()

    // Add a friend
    await page.getByRole('button', { name: 'Add Friend' }).click()
    await expect(page.getByText('Total Friends: 4')).toBeVisible()

    // Increase age from parent
    await page.getByRole('button', { name: 'Increase Age' }).click()
    await expect(
      page.getByRole('heading', { name: '35' }).first(),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: '35' }).last()).toBeVisible()

    // Increase age from child
    await page.getByRole('button', { name: 'Increment Age from Child' }).click()
    await expect(
      page.getByRole('heading', { name: '36' }).first(),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: '36' }).last()).toBeVisible()

    // Add another friend
    await page.getByRole('button', { name: 'Add Friend' }).click()
    await expect(page.getByText('Total Friends: 5')).toBeVisible()

    // Verify all state changes persist
    await expect(page.getByText('Current user: No name')).toBeVisible()
    await expect(page.getByText('Total Friends: 5')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: '36' }).first(),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: '36' }).last()).toBeVisible()
  })

  test('should display educational content and UI elements properly', async ({
    page,
  }) => {
    // Verify educational alerts are present
    await expect(
      page.getByText(
        'This component subscribes to the friends array in context. Adding a friend triggers a re-render.',
      ),
    ).toBeVisible()
    await expect(
      page.getByText(
        "This child component only subscribes to the 'age' property from context. It demonstrates selective context consumption.",
      ),
    ).toBeVisible()

    // Verify all buttons are present and clickable
    await expect(page.getByRole('button', { name: 'Add Friend' })).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Increase Age' }),
    ).toBeVisible()
    await expect(page.getByRole('button', { name: 'Clear Name' })).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Increment Age from Child' }),
    ).toBeVisible()

    // Verify proper Material-UI styling is applied (cards should be visible)
    await expect(page.locator('.MuiCard-root')).toHaveCount(3) // Friends, View, and Child cards

    // Verify proper spacing and layout
    await expect(page.getByRole('separator')).toBeVisible()
  })

  test('should handle rapid interactions correctly', async ({ page }) => {
    // Test rapid clicking to ensure state consistency
    const increaseAgeButton = page.getByRole('button', { name: 'Increase Age' })
    const addFriendButton = page.getByRole('button', { name: 'Add Friend' })

    // Rapid age increments
    await increaseAgeButton.click()
    await increaseAgeButton.click()
    await increaseAgeButton.click()

    // Verify age increased to 37
    await expect(
      page.getByRole('heading', { name: '37' }).first(),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: '37' }).last()).toBeVisible()

    // Rapid friend additions
    await addFriendButton.click()
    await addFriendButton.click()

    // Verify friends count increased to 5
    await expect(page.getByText('Total Friends: 5')).toBeVisible()

    // Mix rapid operations
    await page.getByRole('button', { name: 'Increment Age from Child' }).click()
    await addFriendButton.click()
    await increaseAgeButton.click()

    // Verify final state
    await expect(
      page.getByRole('heading', { name: '39' }).first(),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: '39' }).last()).toBeVisible()
    await expect(page.getByText('Total Friends: 6')).toBeVisible()
  })
})
