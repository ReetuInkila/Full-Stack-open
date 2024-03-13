const { test, after, describe, beforeEach, expect } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
})

describe('users api test', () => {
  
  test('creation succeeds with a fresh username', async () => {

        const newUser = {
            username: 'rinkila',
            name: 'Reetu Inkilae',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
      
        assert.strictEqual(response.body.length, 2)
    })

    test('creation fails with a used username', async () => {

        const newUser = {
            username: 'root',
            name: 'Reetu Inkilae',
            password: 'salainen',
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            assert.strictEqual(Object.hasOwn(res.body, 'error'), true)
    })

    test('creation fails with username or pasword shoter than 3 chars', async () => {

        let newUser = {
            username: 'ri',
            name: 'Reetu Inkilae',
            password: 'salainen',
        }

        let res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(Object.hasOwn(res.body, 'error'), true)

        newUser = {
            username: 'rinkila',
            name: 'Reetu Inkilae',
            password: '12',
        }

        res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(Object.hasOwn(res.body, 'error'), true)
    })

    test('creation fails with username or password missing', async () => {

        let newUser = {
            name: 'Reetu Inkilae',
            password: 'salainen'
        }

        let res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(Object.hasOwn(res.body, 'error'), true)

        newUser = {
            username: 'rinkila',
            name: 'Reetu Inkilae'
        }

        res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(Object.hasOwn(res.body, 'error'), true)
    })

    after(async () => {
        await mongoose.connection.close()
    })
})