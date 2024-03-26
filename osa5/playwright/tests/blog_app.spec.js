const { test, expect, beforeEach, describe } = require('@playwright/test')
const exp = require('constants')


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

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByRole('button', { name: 'login' })
        await locator.click()

        const title = await page.getByText('Log in to application')
        await expect(title).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            const openBtn = await page.getByRole('button', { name: 'login' })
            await openBtn.click()
    
            const usernameField = await page.getByText('username')
            await usernameField.fill('mluukkai')
            const passwordField = await page.getByText('password')
            await passwordField.fill('salainen')

            const loginBtn = await page.getByRole('button', { name: 'login' })
            await loginBtn.click()

            const blogText = await page.getByText('Blogs')
            await expect(blogText).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            const openBtn = await page.getByRole('button', { name: 'login' })
            await openBtn.click()
    
            const usernameField = await page.getByText('username')
            await usernameField.fill('mluukkai')
            const passwordField = await page.getByText('password')
            await passwordField.fill('wrongpass')

            const loginBtn = await page.getByRole('button', { name: 'login' })
            await loginBtn.click()

            const errorField = await page.getByText('invalid username or password')
            await expect(errorField).toBeVisible()
        })
    })
})
