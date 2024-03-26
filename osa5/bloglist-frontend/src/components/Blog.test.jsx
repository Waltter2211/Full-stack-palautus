import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Blog is rendered successfully', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'testing author',
        url: 'testing url',
        likes: 23
      }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
  screen.debug(element)
})