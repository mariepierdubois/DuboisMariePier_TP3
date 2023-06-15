'use strict'

const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const Product = require('./models/product')
const removeAccents = require('remove-accents')

const usersRoutes = require('./routes/users')
const productsRoutes = require('./routes/products')
const categoriesRoutes = require('./routes/categories')
const authentificationRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')

const port = 3000
const errController = require('./controllers/errController')

const uri = process.env.PROJECT_DATABASE
mongoose.connect(uri, { useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('The database is connected, yay!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}.`)
})

// Put data in JSON format
app.use(express.json())

// (Middleware) Parse URL-encoded data from incoming requests, make req.body available
app.use(express.urlencoded({
  extended: false
}))

// Search function, have to enter www.url.com/search?q=what
app.get('/search', (req, res) => {
  // Get the q parameter from url
  const searchedProduct = req.query.q

  if (!searchedProduct) {
    return res.status(400).json({ message: 'Please put a q parameter' })
  }

  // Remove accents from the searched product string
  const withoutAccentsTerm = removeAccents(searchedProduct)

  // Escape special characters in the sanitized query string
  const polishedSearchedTerm = withoutAccentsTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // So the searched product = case-insensitive
  const regex = new RegExp(polishedSearchedTerm, 'i')

  // We get products with the searched product inside the title
  Product.find({ title: regex })
    .populate('userId')
    .then(products => {
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found' })
      }

      res.status(200).json({
        message: 'Here are the products we found based on your search!',
        products
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'An error occurred while searching for products' })
    })
})

// Login and signup
app.use('/auth', authentificationRoutes)

// Users routes as a middleware
app.use('/users', usersRoutes)

// Products routes as a middleware
app.use('/products', productsRoutes)

// Categories routes as a middleware
app.use('/categories', categoriesRoutes)

// Cart routes as a middleware
app.use('/cart', cartRoutes)

// When there is a page not found
app.use(errController.get404)

// errors management
app.use(errController.logErrors)

/* mongoose.connect(process.env.PROJECT_DATABASE)
  .then(() => {
    console.log('You are now connected to the database.')
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  })
  .catch(err => {
    console.log('The connexion to the database failed.', err)
  }) */


