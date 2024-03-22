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

module.exports = {
  dummy,
  totalLikes
}