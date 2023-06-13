const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')

// doit retourner la liste des users, SANS les emails et mdp
router.get('/', productController.getProducts)

// retourne l'user dnt le id est passé en paramètre (pas emails et mdp)
router.get('/:id', productController.getProductId)

// router.post('/', productController.createNewProduct)

// router.delete('/:id', productController.deleteProduct)

router.get('/user/:userId', productController.showUserProducts)

module.exports = router
