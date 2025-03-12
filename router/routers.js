// router/routers.js
const express = require('express');
const router = express.Router();

const barsRouter = require('./barsRouter');
const biereRouter = require('./biereRouter');
const commandeRouter = require('./commandeRouter');
const biereCommandeRouter = require('./biere_commandeRouter');  // Importation des routes biere_commande

router.use('/bars', barsRouter);
router.use('/', biereRouter);
router.use('/', commandeRouter);
router.use('/', biereCommandeRouter);  // Enregistrement des routes biere_commande

module.exports = router;
