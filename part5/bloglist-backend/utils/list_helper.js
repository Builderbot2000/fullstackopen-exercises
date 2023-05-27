var ld = require('lodash');

const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    if (max.likes >= item.likes) return max
    else return item
  }
  result = blogs.reduce(reducer, blogs[0]) 
  return {
    title: result['title'],
    author: result['author'],
    likes: result['likes']
  }
}

const mostBlogs = (blogs) => {
  let arank = ld.countBy(blogs, (blog) => blog.author)
  let maxAuthor, maxBlogs = 0;
  for(const [key, value] of Object.entries(arank)) {
    if(value > maxBlogs) {
      maxBlogs = value;
      maxAuthor = key;
    }
  }
  return {
    author: maxAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  let arank = ld.groupBy(blogs, (blog) => blog.author)
  let maxAuthor, maxLikes = 0;
  for (const [key, value] of Object.entries(arank)) {
    arank[key] = arank[key].reduce((sum, item) => {return sum + item.likes}, 0)
  }
  for(const [key, value] of Object.entries(arank)) {
    if(value > maxLikes) {
      maxLikes = value;
      maxAuthor = key;
    }
  }
  return {
    author: maxAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}