const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

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

beforeAll(async () => {
    await Blog.deleteMany({})
    // console.log('cleared')
  
    initialBlogs.forEach(async (blog) => {
      let blogObject = new Blog(blog)
      await blogObject.save()
      // console.log('saved')
    })
    
    // console.log('done')
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

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
    expect(response.body[4].likes).toBe(0)
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
    const id = candidates.body[4].id
    await api.delete(`/api/blogs/${id}`).expect(204)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(4)
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

afterAll(async () => {
    await mongoose.connection.close()
})