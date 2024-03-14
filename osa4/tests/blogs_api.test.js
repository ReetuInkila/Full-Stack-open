const { test, after, describe, beforeEach, expect } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f9",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
    }
]

beforeEach(async () => {  
    await User.deleteMany({})
    await Blog.deleteMany({}) 

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })
     
    let blogObject = new Blog(initialBlogs[0])
    blogObject.user = user._id
    await blogObject.save()
    user.blogs = user.blogs.concat(blogObject._id)

    blogObject = new Blog(initialBlogs[1])
    blogObject.user = user._id  
    await blogObject.save()
    user.blogs = user.blogs.concat(blogObject._id)

    await user.save()
})


describe('blogs api test', () => {
    test('blogss are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
      
        assert.strictEqual(response.body.length, 2)
    })

    test('identifier is named id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(element => {
            assert.strictEqual(Object.hasOwn(element, 'id'), true)
            assert.strictEqual(Object.hasOwn(element, '_id'), false)
        })
    })

    test('blog can be added ', async () => {
        const login = {"username":"root", "password":"secret"}
        let res = await api
            .post('/api/login')
            .send(login)
        let token = `Bearer ${res.body.token}`

        const newBlog = {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .set({ Authorization: token })
          .expect(200)
          .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/blogs')
      
        assert.strictEqual(response.body.length, initialBlogs.length + 1)
    })

    test('cannot add blog whitout authorization token ', async () => {
        const newBlog = {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
      
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('if likes field is not provided, it is automatically set to 0', async () => {
        const login = {"username":"root", "password":"secret"}
        let res = await api
            .post('/api/login')
            .send(login)
        let token = `Bearer ${res.body.token}`

        const newBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
        }

        const result = await api
          .post('/api/blogs')
          .send(newBlog)
          .set({ Authorization: token })
          .expect(200)
          .expect('Content-Type', /application\/json/)
        
        assert.strictEqual(result.body.likes, 0)
    });

    test('returns 400 Bad Request if url or title is missing', async () => {
        const login = {"username":"root", "password":"secret"}
        let res = await api
            .post('/api/login')
            .send(login)
        let token = `Bearer ${res.body.token}`

        let newBlog = {
            title: 'Test Blog',
            author: 'Test Author',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: token })
            .expect(400)

        newBlog = {
            author: 'Test Author',
            url: 'https://testurl.com',
            likes: 5
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: token })
            .expect(400)
    })

    test('blog can be deleted', async () => {
        const login = {"username":"root", "password":"secret"}
        let res = await api
            .post('/api/login')
            .send(login)
        let token = `Bearer ${res.body.token}`

        await api
            .delete('/api/blogs/5a422a851b54a676234d17f7')
            .set({ Authorization: token })
            .expect(204)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 1)
    })

    test('blog likes can be updated', async () => {
        const newBlog = {
            likes: 5,
        }

        const res = await api
            .put('/api/blogs/5a422a851b54a676234d17f7')
            .send(newBlog)
            .expect(200)

        assert.strictEqual(res.body.likes, 5)
    })
    
    after(async () => {
        await mongoose.connection.close()
    })
})
