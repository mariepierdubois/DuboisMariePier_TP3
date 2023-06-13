'use strict'

const User = require('../models/user')

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
  console.log('This is the user profile')
}

exports.putUserId = (req, res, next) => {
  console.log('Update the profile of the user')
}

exports.deleteUserId = (req, res, next) => {
  console.log('The connected user can delete his or her profile')
}
