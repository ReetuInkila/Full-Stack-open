const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(!password || password.length < 3){
    return response.status(400).json({error:"password is shorter than the minimum allowed length (3)"})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', (request, response) => {
    User.find({}).then(users => {
        response.json(users)
    })
})

module.exports = usersRouter