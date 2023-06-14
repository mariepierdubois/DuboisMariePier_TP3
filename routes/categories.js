const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')

const isConnected = require('../middleware/is-connected')
const category = require('../models/category')

// doit retourner la liste des catégories
router.get('/', categoryController.getCategories)

// retourne l'user dnt le id est passé en paramètre (pas emails et mdp)
router.get('/:id', categoryController.getCategoryId)

router.post('/', isConnected, categoryController.createNewCategory)

router.put('/:id', isConnected, categoryController.putCategory)

router.delete('/:id', isConnected, categoryController.deleteCategory)

module.exports = router
