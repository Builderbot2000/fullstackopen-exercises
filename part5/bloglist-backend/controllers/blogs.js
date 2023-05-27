const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  logger.info("Getting all blogs...")
  const blogs = await Blog
    .find({})
    .populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  logger.info("Posting new blog...")

  const user = await User.findById(request.user.id)
  const blog = new Blog(body)
  const blogObj = blog.toObject()
  if (!blogObj.hasOwnProperty('title') || !blogObj.hasOwnProperty('url')) response.status(400).end()
  else {
    if (!blog.hasOwnProperty('likes')) blog['likes'] = 0
    user.blogs.push(blog._id)
    await user.save()
    blog['user'] = user
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  logger.info("Deleting blog...")

  const user = await User.findById(request.user.id)
  const userId = user._id.toString()

  blog = await Blog.findById(request.params.id)
  const blogUserId = blog.user.toString()
  if (userId != blogUserId) {
    return response.status(400).json({ error: 'incorrect user' })
  } 

  response.status(204).end()
})

blogsRouter.put('/:id', (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.status(204).end()
    })
})

module.exports = blogsRouter