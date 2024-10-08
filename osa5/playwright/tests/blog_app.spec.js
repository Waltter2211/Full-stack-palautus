const { test, expect, beforeEach, describe } = require('@playwright/test')
const exp = require('constants')
const { loginToApp, createNewBlog } = require('./helper')


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
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'testaajaname',
                username: 'testaaja',
                password: 'testaajapass'
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
            await createNewBlog(page)
            await expect(page.getByTestId('testBlog').first()).toBeVisible()
        })
    })

    describe('When blog is made', () => {
        beforeEach(async ({ page }) => {
            await loginToApp(page, 'mluukkai', 'salainen')
            await createNewBlog(page)
        })

        test('a new blog can be liked', async ({ page }) => {
            const viewBtn = page.getByRole('button', { name: 'view' })
            await viewBtn.click()

            const likeBtn = page.getByRole('button', { name: 'like' })
            await likeBtn.click()

            await expect(page.getByTestId('likes')).toContainText('1')
        })

        test('a blog can be deleted', async ({ page }) => {
            page.on('dialog', async dialog => {
                console.log(dialog.message())
                await dialog.accept()
            })
            const viewBtn = page.getByRole('button', { name: 'view' })
            await viewBtn.click()

            const removeBtn = page.getByRole('button', { name: 'remove' })
            await removeBtn.click()
            
            await expect(page.getByTestId('testBlog')).not.toBeVisible()
        })

        test('only user that has made blog can see remove option', async ({ page }) => {
            
            const logoutBtn = page.getByRole('button', { name: 'logout' })
            await logoutBtn.click()

            await loginToApp(page, 'testaaja', 'testaajapass')
            
            const viewBtn = page.getByRole('button', { name: 'view' })
            await viewBtn.click()

            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
    })
})