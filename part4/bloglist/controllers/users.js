const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!username || !password || username.length < 3 || password < 3) response.status(400).end()

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (uniqueValidator) {
    response.status(400).json({error: 'expected `username` to be unique'})
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {})
  response.status(200)
  response.json(users)
})

module.exports = usersRouter