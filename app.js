'use strict'

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const usersRoutes = require('./routes/users')
const productsRoutes = require('./routes/products')
const categoriesRoutes = require('./routes/categories')
const authentificationRoutes = require('./routes/auth')

const port = 3000
const errController = require('./controllers/errController')

// Afin de mettre les données en format json (middleware)
app.use(express.json())

app.use(express.urlencoded({
  extended: false
}))

// Login and signup
app.use('/authentification', authentificationRoutes)

// Users routes as a middleware
app.use('/users', usersRoutes)

// Products routes as a middleware
app.use('/products', productsRoutes)

// Categories routes as a middleware
app.use('/categories', categoriesRoutes)

// When there is a page not found
app.use(errController.get404)

// errors management
app.use(errController.logErrors)

mongoose.connect('mongodb://127.0.0.1:27017/TP3_secondHand_products')
  .then(() => {
    console.log('You are now connected to the database.')
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  })
  .catch(err => {
    console.log('The connexion to the database failed.', err)
  })
