const { test, after, describe, beforeEach, expect } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
]

beforeEach(async () => {  
    await Blog.deleteMany({})  
    let blogObject = new Blog(initialBlogs[0])  
    await blogObject.save()  
    blogObject = new Blog(initialBlogs[1])  
    await blogObject.save()
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
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/blogs')
      
        assert.strictEqual(response.body.length, initialBlogs.length + 1)
    })
      

    after(async () => {
        await mongoose.connection.close()
    })
})
