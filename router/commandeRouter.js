const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

// Create Commande Function
router.post('/bars/:id_bar/commandes', commandeController.addCommande);
// Update Commande Function
router.put('/commandes/:id_commande', commandeController.updateCommande);
// Delete Commande Function
router.delete('/commandes/:id_commande', commandeController.deleteCommande);  
// Getting all Commande Function
router.get('/commandes/:id_commande', commandeController.getCommande);
// Getting Commande From a Bar Function
router.get('/bars/:id_bar/commandes', commandeController.getCommandesByBar);
// Get all commandes
router.get('/commandes', commandeController.getAllCommandes);

module.exports = router;
