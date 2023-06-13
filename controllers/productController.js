'use strict'

const Product = require('../models/product')

// Get a list of all of the products (sold and not sold)
exports.getProducts = (req, res, next) => {
  Product.find().sort({ title: 1 })
    .then(products => {
      res.status(200).json({
        products,
        pageTitle: 'All the products on the website'
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
    })
}

// Get the info of the /products/:id
exports.getProductId = (req, res, next) => {
  const productId = req.params.id // Get the product ID from the URL parameter

  Product.findById(productId) // Find the product by ID
    .then(product => {
      if (!product) {
        // If no product found with the given ID, return an error response
        return res.status(404).json({ message: 'Product not found' })
      }

      res.status(200).json({
        product,
        pageTitle: `You are looking at the product with the ID ${productId}`
      })
    })
    .catch(err => {
      // Handle any errors that occur during the query or response
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    })
}

// Get the products created by the userId entered in the url
exports.showUserProducts = (req, res, next) => {
  const userId = req.params.userId // Get the user ID from the URL parameter

  Product.find({ userId }) // Find the products with the specified user ID
    .then(products => {
      if (products.length === 0) {
        // If no products found with the given user ID, return an error response
        return res.status(404).json({ message: 'No products were found for this user' })
      }

      res.status(200).json({
        products,
        pageTitle: `You are looking at the products of the user with the ID ${userId}`
      })
    })
    .catch(err => {
      // Handle any errors that occur during the query or response
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    })
}
