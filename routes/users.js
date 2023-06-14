const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

const isConnected = require('../middleware/is-connected')

// doit retourner la liste des users, SANS les emails et mdp
router.get('/', userController.getUsers)

// retourne les infos de l'utilisateur connecté
router.get('/profil', isConnected, userController.getUserProfile)

// retourne l'user dnt le id est passé en paramètre (pas emails et mdp)
router.get('/:id', userController.getUserId)

// modifie l'user dont le id est passé en paramètre (seul l'user connecté peut modifier son profil)
// le isAdmin ne peut pas être modifié
router.put('/:id', isConnected, userController.putUserId)

// supprimer l'user dont le id est passé en paramètre
// seul l'user connecté peut supprimer son compte
router.delete('/:id', isConnected, userController.deleteUserId)

module.exports = router

// const res = JSON.parse(resBody)
/* if (resCode.code === 200){
    pm.collectionVariables.set("myToken", res.token)
} else {
    pm.collectionVariables.set("myToken", "")
} */
