const { test, expect, beforeEach, describe } = require('@playwright/test')
const exp = require('constants')
const { loginToApp } = require('./helper')


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
            await loginToApp(page, 'mluukkai', 'salainen')
            await expect(page.getByText('logged in as mluukkai')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await loginToApp(page, 'mluukkai', 'wrongpass')

            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('invalid username or password')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
            await expect(page.getByText('logged in as mluukkai')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginToApp(page, 'mluukkai', 'salainen')
        })
      
        test('a new blog can be created', async ({ page }) => {
            const addNewBtn = await page.getByRole('button', { name: 'add new' })
            await addNewBtn.click()
            const titleInput = await page.getByText('title')
            const authorInput = await page.getByText('author')
            const urlInput = await page.getByText('url')

            await titleInput.fill('testTitle')
            await authorInput.fill('testAuthor')
            await urlInput.fill('testUrl')

            const createBtn = page.getByRole('button', { name: 'create' })
            await createBtn.click()
            await expect(page.getByTestId('testBlog')).toBeVisible()
        })
      })
})