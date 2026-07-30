const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let favorite = blogs[0]

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) {
      favorite = blogs[i]
    }
  }

  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCounts = {}

  for (const blog of blogs) {
    if (authorCounts[blog.author]) {
      authorCounts[blog.author]++
    } else {
      authorCounts[blog.author] = 1
    }
  }

  let maxBlogs = 0
  let mostProlificAuthor = null

  for (const author in authorCounts) {
    if (authorCounts[author] > maxBlogs) {
      maxBlogs = authorCounts[author]
      mostProlificAuthor = author
    }
  }

  return { author: mostProlificAuthor, blogs: maxBlogs }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = {}

  for (const blog of blogs) {
    if (authorLikes[blog.author]) {
      authorLikes[blog.author] += blog.likes
    } else {
      authorLikes[blog.author] = blog.likes
    }
  }

  let maxLikes = 0
  let mostLikedAuthor = null

  for (const author in authorLikes) {
    if (authorLikes[author] > maxLikes) {
      maxLikes = authorLikes[author]
      mostLikedAuthor = author
    }
  }

  return { author: mostLikedAuthor, likes: maxLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
