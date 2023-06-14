'use strict'

const User = require('../models/user')
const bcrypt = require('bcryptjs')

// Get a list of all of the users
// all values except email and password
exports.getUsers = (req, res, next) => {
  User.find({}, { email: 0, password: 0 }).sort({ firstname: 1 })
    .then(users => {
      res.status(200).json({
        users,
        pageTitle: 'All the users on the website'
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
    })
}

// Get the info of the /users/:id
// all values except email and password
exports.getUserId = (req, res, next) => {
  const userId = req.params.id // Get the user ID from the URL parameter

  User.findById(userId, { email: 0, password: 0 }) // Find the user by ID and exclude email and password
    .then(user => {
      if (!user) {
        // If no user found with the given ID, return an error response
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json({
        user,
        pageTitle: `You are looking at the user with the ID ${userId}`
      })
    })
    .catch(err => {
      // Handle any errors that occur during the query or response
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    })
}

exports.getUserProfile = (req, res, next) => {
  const userId = req.user.userId
  console.log(userId)
  User.findOne({ _id: userId })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found ' })
      }

      res.status(200).json({
        user,
        pageTitle: 'You are looking at your profile.'
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    })
}

exports.putUserId = (req, res, next) => {
  const { firstname, lastname, email, city, password } = req.body
  const userId = req.params.id
  const connectedUserId = req.user.userId

  User.findById({ _id: userId })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found ' })
      }

      if (user.id !== connectedUserId) {
        return res.status(401).json({ message: 'You are not authorized to update this profile.' })
      }

      user.firstname = firstname
      user.lastname = lastname
      user.email = email
      user.city = city

      bcrypt
        .hash(password, 10)
        .then((newSecretPassword) => {
          user.password = newSecretPassword

          return user.save() // Save the updated user object
        })
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          next(err)
        })
    })
    .catch(err => {
      next(err)
    })
}

exports.deleteUserId = (req, res, next) => {
  const userId = req.params.id
  const connectedUserId = req.user.userId

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found ' })
      }

      if (user.id !== connectedUserId) {
        return res.status(401).json({ message: 'You are not authorized to delete this profile.' })
      }

      return User.findByIdAndRemove(userId) // Only delete the profile if authorized
    })
    .then(deletedUser => {
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(204).send()
    })
    .catch(err => {
      next(err)
    })
}
