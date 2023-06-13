'use strict'

const Category = require('../models/category')

// Get a list of all of the products (sold and not sold)
exports.getCategories = (req, res, next) => {
  Category.find().sort({ name: 1 })
    .then(categories => {
      res.status(200).json({
        categories,
        pageTitle: 'All the categories on the website'
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
    })
}

// Get the info of the /products/:id
exports.getCategoryId = (req, res, next) => {
  const categoryId = req.params.id // Get the product ID from the URL parameter

  Category.findById(categoryId) // Find the product by ID
    .then(category => {
      if (!category) {
        // If no category found with the given ID, return an error response
        return res.status(404).json({ message: 'Category not found' })
      }

      res.status(200).json({
        category,
        pageTitle: `You are looking at the category with the ID ${categoryId}`
      })
    })
    .catch(err => {
      // Handle any errors that occur during the query or response
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    })
}
