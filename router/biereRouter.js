const express = require('express');
const router = express.Router();
const biereController = require('../controllers/biereController');

// Create a biere for a Bar Function
router.post('/bars/:id_bar/biere', biereController.createBiere);
// Get all biere from a Bar Function
router.get('/bars/:id_bar/biere', biereController.getBieresByBar);
// Get a biere from ID Function
router.get('/biere/:id_biere', biereController.getBiereById);
// Uptade a biere Function
router.put('/biere/:id_biere', biereController.updateBiere);
// Delete a biere Function
router.delete('/biere/:id_biere', biereController.deleteBiere);

module.exports = router;
