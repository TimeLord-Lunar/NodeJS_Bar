const { Bar, Biere, Commande, BiereCommande } = require('../models/models');
const sequelize = require('../config/database'); 

// Create Bar Function
const createBar = async (req, res) => {
  const { name, adresse, tel, email, description } = req.body;

  try {
    const newBar = await Bar.create({ name, adresse, tel, email, description });
    res.status(201).json(newBar); 
  } catch (error) {
    console.error('Error creating bar:', error);
    res.status(500).json({ message: 'Error creating bar' });
  }
};

// Delete Bar Function
const deleteBar = async (req, res) => {
  const { id_bar } = req.params;
  const transaction = await sequelize.transaction();

  try {
    const bar = await Bar.findByPk(id_bar, { transaction });
    if (!bar) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Bar not found' });
    }

    console.log('Bar found, proceeding with deletions...');

    // Delete All Biere-Commande Linked to the commandes of this bar
    const deletedBiereCommande = await BiereCommande.destroy({
      where: { bar_id: id_bar },
      transaction
    });
    console.log(`Deleted ${deletedBiereCommande} rows from BiereCommande`);

    // Delete All Commandes Linked to this bar
    const deletedCommandes = await Commande.destroy({
      where: { bars_id: id_bar },
      transaction
    });
    console.log(`Deleted ${deletedCommandes} rows from Commande`);

    // Delete All Biere Linked to this bar
    const deleteBiere = await Biere.destroy({
      where: { bars_id: id_bar },
      transaction
    });

    // Delete
    await bar.destroy({ transaction });
    console.log('Bar deleted successfully');

    await transaction.commit();
    res.status(200).json({ message: 'Bar and related data deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting bar:', error);
    res.status(500).json({ message: 'Error deleting bar' });
  }
};

// Update Bar Function
const updateBar = async (req, res) => {
  const { id_bar } = req.params;
  const { name, adresse, tel, email, description } = req.body;

  try {
    const bar = await Bar.findByPk(id_bar);
    if (!bar) return res.status(404).json({ message: 'Bar not found' });

    bar.name = name || bar.name;
    bar.adresse = adresse || bar.adresse;
    bar.tel = tel || bar.tel;
    bar.email = email || bar.email;
    bar.description = description || bar.description;

    await bar.save();
    res.status(200).json(bar); 
  } catch (error) {
    console.error('Error updating bar:', error);
    res.status(500).json({ message: 'Error updating bar' });
  }
};

// Get All Bar Function ADVANCED
const getAllBars = async (req, res) => {
  // Getting the Name and Ville if there are any
  const { name, ville } = req.query;

  try {
    let bars;

    // If Name Filter Specified 
    if (name) {
      bars = await Bar.findAll({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          'LIKE',
          `%${name.toLowerCase()}%`
        ),
      });
    } else if (ville) {
      // If Ville Filter Specified
      bars = await Bar.findAll({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('adresse')),
          'LIKE',
          `%${ville.toLowerCase()}%`
        ),
      });
    } else {
      // If no Filter
      bars = await Bar.findAll();
    }

    res.status(200).json(bars);
  } catch (error) {
    console.error('Error retrieving bars:', error);
    res.status(500).json({ message: 'Error retrieving bars' });
  }
};


// Get Bar by ID Function
const getBarById = async (req, res) => {
  const { id_bar } = req.params;
  try {
    const bar = await Bar.findByPk(id_bar);
    if (!bar) return res.status(404).json({ message: 'Bar not found' });
    res.status(200).json(bar);
  } catch (error) {
    console.error('Error retrieving bar:', error);
    res.status(500).json({ message: 'Error retrieving bar' });
  }
};


// ADVANCED : Get Average Degree of Beers for a specific Bar Function
const getDegreeAverage = async (req, res) => {
  const { id_bar } = req.params;

  try {
    // Calculer la moyenne des degrés des bières associées au bar
    const result = await Biere.findAll({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('degree')), 'average_degree'],
      ],
      where: { bars_id: id_bar },
    });

    if (result.length === 0) {
      return res.status(404).json({ message: 'Aucune bière trouvée pour ce bar' });
    }

    // Envoyer la moyenne des degrés
    res.status(200).json({ average_degree: result[0].dataValues.average_degree });
  } catch (error) {
    console.error('Erreur lors du calcul de la moyenne des degrés :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


module.exports = { createBar, deleteBar, updateBar, getAllBars, getBarById, getDegreeAverage};
