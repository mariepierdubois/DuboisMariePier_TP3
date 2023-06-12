const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

// doit retourner la liste des users, SANS les emails et mdp
router.get('/', userController.getUsers)

// retourne l'user dnt le id est passé en paramètre (pas emails et mdp)
router.get('/:id', userController.getUserId)

// retourne les infos de l'utilisateur connecté
router.get('/profil', userController.getUserProfile)

// modifie l'user dont le id est passé en paramètre (seul l'user connecté peut modifier son profil)
// le isAdmin ne peut pas être modifié
router.put('/:id', userController.putUserId)

// supprimer l'user dont le id est passé en paramètre
// seul l'user connecté peut supprimer son compte
router.delete('/:id', userController.deleteUserId)

module.exports = router
