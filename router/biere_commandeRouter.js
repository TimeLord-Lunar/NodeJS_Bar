const express = require('express');
const router = express.Router();
const biereCommandeController = require('../controllers/biere_commandeController');

// Add a biere to a Commande Function
router.post('/commandes/:id/biere/:id_biere', biereCommandeController.addBiereToCommande);
// Remove a biere from a Commande Function
router.delete('/commandes/:id/biere/:id_biere', biereCommandeController.removeBiereFromCommande);

module.exports = router;
