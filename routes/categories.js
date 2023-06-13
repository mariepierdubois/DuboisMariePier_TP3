const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')

// doit retourner la liste des catégories
router.get('/', categoryController.getCategories)

// retourne l'user dnt le id est passé en paramètre (pas emails et mdp)
router.get('/:id', categoryController.getCategoryId)

// router.get('/user/:userId', categoryController.showUserProducts)

module.exports = router
