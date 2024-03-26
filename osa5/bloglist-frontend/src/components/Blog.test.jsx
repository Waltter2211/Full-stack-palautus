import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

describe('<Blog />', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'testing author',
        url: 'testing url',
        likes: 23
    }
  
    beforeEach(() => {
      render(<Blog blog={blog} />)
    })

    test('Blog is rendered successfully', async () => {
        const element = screen.getByText('Component testing is done with react-testing-library')
        expect(element).toBeDefined()
        screen.debug(element)
    })

    test('Blog can be expanded to view details', async () => {
        const user = userEvent.setup()

        const button = screen.getByText('view')
        await user.click(button)
        const url = screen.getAllByTestId('url')
        const likes = screen.getAllByTestId('likes')
        expect(url, likes).toBeDefined()
    })

})