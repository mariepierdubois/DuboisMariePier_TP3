const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')

const isConnected = require('../middleware/is-connected')

// doit retourner la liste des users, SANS les emails et mdp
router.get('/', productController.getProducts)

// retourne l'user dnt le id est passé en paramètre (pas emails et mdp)
router.get('/:id', productController.getProductId)

// To create a new product
router.post('/', isConnected, productController.createNewProduct)

router.get('/user/:userId', productController.showUserProducts)

router.delete('/:id', isConnected, productController.deleteProduct)

module.exports = router
