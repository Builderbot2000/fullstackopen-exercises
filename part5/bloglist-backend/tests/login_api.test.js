const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

var token = NaN
credentials = {
    username: "admin",
    password: "admin"
}

describe('login api tests', () => {
    beforeAll(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)

        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('admin', 10)
        const user = new User({ 
            username: 'admin', 
            name: 'John Doe',
            blogs: [],
            passwordHash: passwordHash 
        })
        await user.save()
    })
    
    test('login returns token', async () => {
        res = await api.post('/api/login').send(credentials).expect(200)
        token = res.body.token
    })

    test('create blog with token', async () => {
        newblog = {
            "title": "Crazy Foodies ?",
            "author": "John Doe",
            "url": "https://crazyfoodies.com",
            "likes": 72
        }
        res = await api.post('/api/blogs').send(newblog).set('Authorization', `Bearer ${token}`).expect(201)
        expect(res.body.user.username).toBe('admin')
    })

    test('delete blog with token', async () => {
        candidates = await helper.blogsInDb()
        // console.log(candidates)
        await api.delete(`/api/blogs/${candidates[3].id}`).set('Authorization', `Bearer ${token}`).expect(204)
    })

    afterEach(async () => {

    })

    afterAll(async () => {
        await User.deleteMany({})
        await mongoose.connection.close()
    })
})