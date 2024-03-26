const { test, expect, beforeEach, describe } = require('@playwright/test')


describe('Note app', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http:localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })
  
      await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {
      
        const locator = await page.getByRole('button', { name: 'login' })
        await expect(locator).toBeVisible()
    })
})
