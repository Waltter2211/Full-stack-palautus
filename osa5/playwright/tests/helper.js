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

module.exports = { loginToApp }