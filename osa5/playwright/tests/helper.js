const loginToApp = async (page, username, password) => {
    const openBtn = await page.getByRole('button', { name: 'login' })
    await openBtn.click()
    
    const usernameField = await page.getByText('username')
    await usernameField.fill(username)
    const passwordField = await page.getByText('password')
    await passwordField.fill(password)

    const loginBtn = await page.getByRole('button', { name: 'login' })
    await loginBtn.click()
}

const createNewBlog = async (page) => {
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
}

module.exports = { loginToApp, createNewBlog }