const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('blog api tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)

        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    /*
    test('there are three blogs returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(3)
    })

    test('the unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('a blog is correctly added', async () => {
        const newblog = {
            title: 'Crazy Foodies Reloaded',
            author: 'John. B. Carmen Jr.',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Crazy_FoodiesIII.html',
            likes: 1115,
            __v: 1
        }
        await api.post('/api/blogs').send(newblog).expect(201)
        const response = await api.get('/api/blogs')
        expect(response.body[3].title).toBe('Crazy Foodies Reloaded')
    })

    test('a blog without likes property is correctly added', async () => {
        const newblog = {
            title: 'On the Dialectics of Metaphysical Topics',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Crazy_FoodiesIII.html',
            __v: 1
        }
        await api.post('/api/blogs').send(newblog).expect(201)
        const response = await api.get('/api/blogs')
        expect(response.body[3].likes).toBe(0)
    })

    test('a blog without title or url property is rejected', async () => {
        const newblogA = {
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Crazy_FoodiesIII.html',
            __v: 1
        }
        await api.post('/api/blogs').send(newblogA).expect(400)
        const newblogB = {
            title: 'On the Dialectics of Metaphysical Topics',
            author: 'Edsger W. Dijkstra',
            __v: 1
        }
        await api.post('/api/blogs').send(newblogB).expect(400)
    })

    test('a blog is correctly deleted', async () => {
        const candidates = await api.get('/api/blogs')
        const id = candidates.body[2].id
        await api.delete(`/api/blogs/${id}`).expect(204)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(2)
    })

    test('a blog is correctly updated', async () => {
        const candidates = await api.get('/api/blogs')
        const id = candidates.body[0].id
        const targetblog = {
            id: id,
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10000
        }
        await api.put(`/api/blogs/${id}`).send(targetblog).expect(204)
        const response = await api.get('/api/blogs')
        expect(response.body[0]).toStrictEqual(targetblog)
    })

    test('blog shows user', async () => {
        const targetblog = {
            id: 74983787907,
            title: 'Go To Statement Considered Beneficial',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Beneficial.html',
            likes: 10
        }
        await api.post('/api/blogs').send(targetblog).expect(201)
        blogs = await helper.blogsInDb()
        expect(blogs[3].user).toBeDefined()
    })

    test('user shows blog', async () => {
        const targetblog = {
            id: 74983787907,
            title: 'Go To Statement Considered Beneficial',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Beneficial.html',
            likes: 10
        }
        await api.post('/api/blogs').send(targetblog).expect(201)
        response = await api.get('/api/users').expect(200)
        expect(response.body[0].blogs[0].title).toBe('Go To Statement Considered Beneficial')
    })
    */
    afterEach(async () => {
        await Blog.deleteMany({})
    })
})