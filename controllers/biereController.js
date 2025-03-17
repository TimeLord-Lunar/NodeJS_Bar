const Biere = require('../models/biere');

// Add biere Function
exports.createBiere = async (req, res) => {
  const { id_bar } = req.params;
  const { name, description, degree, prix } = req.body;

  // Obligatory Values
  if (!name || !degree || !prix) {
    return res.status(400).json({ message: 'Le nom, le degré et le prix sont obligatoires' });
  }

  // Verification if Price is positive
  if (prix < 0) {
    return res.status(400).json({ message: 'Le prix doit être positif' });
  }

  try {
    const newBiere = await Biere.create({
      name,
      description,
      degree,
      prix,
      bars_id: id_bar,
    });
    
    res.status(201).json(newBiere);  
  } catch (error) {
    console.error('Erreur lors de la création de la bière :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Get All Biere from a Bar Function
exports.getBieresByBar = async (req, res) => {
  const { id_bar } = req.params;

  try {
    const bieres = await Biere.findAll({ where: { bars_id: id_bar } });

    if (bieres.length === 0) {
      return res.status(404).json({ message: 'Aucune bière trouvée pour ce bar' });
    }

    res.json(bieres);
  } catch (error) {
    console.error('Erreur lors de la récupération des bières :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Get Biere by ID Function
exports.getBiereById = async (req, res) => {
  const { id_biere } = req.params;

  try {
    const biere = await Biere.findByPk(id_biere);

    if (!biere) {
      return res.status(404).json({ message: 'Bière non trouvée' });
    }

    res.json(biere);
  } catch (error) {
    console.error('Erreur lors de la récupération de la bière :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Update Biere Function
exports.updateBiere = async (req, res) => {
  const { id_biere } = req.params;
  const { name, description, degree, prix } = req.body;

  try {
    const biere = await Biere.findByPk(id_biere);

    if (!biere) {
      return res.status(404).json({ message: 'Bière non trouvée' });
    }

    // Updating data
    biere.name = name || biere.name;
    biere.description = description || biere.description;
    biere.degree = degree || biere.degree;
    biere.prix = prix || biere.prix;

    await biere.save();  

    res.status(200).json(biere); 
  } catch (error) {
    console.error('Erreur lors de la modification de la bière :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Delete Biere Function
exports.deleteBiere = async (req, res) => {
  const { id_biere } = req.params;

  try {
    const biere = await Biere.findByPk(id_biere);

    if (!biere) {
      return res.status(404).json({ message: 'Bière non trouvée' });
    }

    await biere.destroy();

    res.status(200).json({ message: 'Bière supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la bière :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer toutes les bières
exports.getAllBieres = async (req, res) => {
  try {
    const bieres = await Biere.findAll();
    res.json(bieres);
  } catch (error) {
    console.error('Erreur lors de la récupération des bières :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};