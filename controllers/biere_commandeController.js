const BiereCommande = require('../models/biere_commande');
const Commande = require('../models/commande');
const Biere = require('../models/biere');

// Add a Biere to a Commande Function
exports.addBiereToCommande = async (req, res) => {
  const { id, id_biere } = req.params;

  try {
    // Getting the biere and the Commande
    const commande = await Commande.findByPk(id);
    const biere = await Biere.findByPk(id_biere);

    // Verification if exist
    if (!commande || !biere) {
      return res.status(404).json({ message: 'Commande ou Bière non trouvée' });
    }

    // Verification of the Commande Status, if "terminée" impossible
    if (commande.status === 'terminée') {
      return res.status(400).json({ message: 'Impossible d\'ajouter une bière à une commande terminée' });
    }

    // Getting ID of the bar
    const bar_id = commande.bars_id;

    if (!bar_id) {
      return res.status(400).json({ message: 'La commande ne contient pas de bar_id valide.' });
    }

    // Create Relation between BiereCommande and Bar
    await BiereCommande.create({
      commande_id: commande.id,
      biere_id: biere.id,
      bar_id: bar_id,
    });

    res.status(201).json({ message: 'Bière ajoutée à la commande' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la bière à la commande:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Remove a biere from a Commande Function
exports.removeBiereFromCommande = async (req, res) => {
  const { id, id_biere } = req.params;

  try {
     // Getting the biere and the Commande
    const commande = await Commande.findByPk(id);
    const biere = await Biere.findByPk(id_biere);

    // Verification if exist
    if (!commande || !biere) {
      return res.status(404).json({ message: 'Commande ou Bière non trouvée' });
    }

    // Verification of the Commande Status, if "terminée" impossible
    if (commande.status === 'terminée') {
      return res.status(400).json({ message: 'Impossible de supprimer une bière d\'une commande terminée' });
    }

    // Getting BiereCommande Relation
    const biereCommande = await BiereCommande.findOne({
      where: { commande_id: id, biere_id: id_biere },
    });

    // Verification if exist
    if (!biereCommande) {
      return res.status(404).json({ message: 'Relation Bière-Commande non trouvée' });
    }

    // Deleting BiereCommande Relation
    await biereCommande.destroy();
    res.status(200).json({ message: 'Bière supprimée de la commande' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la bière de la commande:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
