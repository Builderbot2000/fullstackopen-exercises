const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
},
{
    title: 'Crazy Foodies',
    author: 'John. B. Carmen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Crazy_Foodies.html',
    likes: 10,
    __v: 1
},
{
    title: 'Crazy Foodies The Sequel',
    author: 'John. B. Carmen',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Crazy_FoodiesII.html',
    likes: 15,
    __v: 1
}]

const nonExistingId = async () => {
  const note = new Blog({ 
    title: 'willremovethissoon',
    author: 'Noman',
    url: '???',
    likes: 0,
    __v: 1
})
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}