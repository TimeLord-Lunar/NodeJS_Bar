const express = require('express');
const router = express.Router();

// All Functions
const {
  createBar,
  deleteBar,
  updateBar,
  getAllBars,
  getBarById,
  getDegreeAverage,
} = require('../controllers/barsController'); // Importation des fonctions du contrôleur

// All Links

// Create
router.post('/', createBar);
// Get All
router.get('/', getAllBars);
// Get by ID
router.get('/:id_bar', getBarById);
// Delete by ID
router.delete('/:id_bar', deleteBar);
// Update by ID
router.put('/:id_bar', updateBar);
// Get Average Degree of beers for a specific bar Function
router.get('/:id_bar/degree', getDegreeAverage);

module.exports = router;
