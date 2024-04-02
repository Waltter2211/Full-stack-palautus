const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const totalLikes = blogs.map((blog) => blog.likes).reduce((acc, curr) => acc + curr)
  return (
    blogs.length === 1
    ? blogs[0].likes 
    : totalLikes
  )
  
}

const favoriteBlog = (blogs) => {
  const mostLikesBlog = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes).shift()
  delete mostLikesBlog._id
  delete mostLikesBlog.__v
  return mostLikesBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}