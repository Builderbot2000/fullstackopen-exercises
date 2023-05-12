const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
  logger.info("Getting all blogs...")
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  logger.info("Posting new blog...")
  const blog = new Blog(request.body)
  const blogObj = blog.toObject()
  if (!blogObj.hasOwnProperty('title') || !blogObj.hasOwnProperty('url')) response.status(400).end()
  else {
    if (!blog.hasOwnProperty('likes')) blog['likes'] = 0
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  logger.info("Deleting blog...")
  await Blog.findByIdAndRemove(request.params.id)
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