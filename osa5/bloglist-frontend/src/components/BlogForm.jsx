import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

function BlogForm({ handleBlogPost, setTitle, setAuthor, setUrl, title, author, url }) {

  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogPost}>
        title<input placeholder='titleInput' type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        author<input placeholder='authorInput' type='text' name='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        url<input placeholder='urlInput' type='text' name='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm