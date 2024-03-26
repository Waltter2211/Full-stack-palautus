import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

describe('<Blog />', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'testing author',
        url: 'testing url',
        likes: 23
    }

    test('Blog is rendered successfully', async () => {
        render(<Blog blog={blog} />)
        const element = screen.getByText('Component testing is done with react-testing-library')
        expect(element).toBeDefined()
    })

    test('Blog can be expanded to view details', async () => {
        render(<Blog blog={blog} />)
        const user = userEvent.setup()

        const button = screen.getByText('view')
        await user.click(button)
        const url = screen.getByTestId('url')
        const likes = screen.getByTestId('likes')
        expect(url, likes).toBeDefined()
    })

    test('Blog can be liked', async () => {
        const mockHandler = vi.fn()
        const user = userEvent.setup()

        render(<Blog blog={blog} handleBlogUpdate={mockHandler} />)

        const button = screen.getByText('view')
        await user.click(button)
        const likeButton = screen.getByText('like')

        await user.click(likeButton)
        await user.click(likeButton)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })

    test('Blog can be created', async () => {
        const createBlog = vi.fn()
        render(<BlogForm blog={blog} handleBlogPost={createBlog} />)
        
        const createButton = screen.getByText('create')
        const titleInput = screen.getByPlaceholderText('titleInput')
        const authorInput = screen.getByPlaceholderText('authorInput')
        const urlInput = screen.getByPlaceholderText('urlInput')

        userEvent.type(titleInput, 'testTitle')
        userEvent.type(authorInput, 'testAuthor')
        userEvent.type(urlInput, 'testUrl')

        await userEvent.click(createButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        /* expect(createNote.mock.calls[0][0].content).toBe('testing a form...' ) */
    })

})