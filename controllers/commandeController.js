const { Commande, Biere, BiereCommande } = require('../models/models');

// Create a Commande Function
exports.addCommande = async (req, res) => {
  const { id_bar } = req.params;
  const { name, prix, date, status } = req.body;

  // Obligatory Values
  if (!name || !prix || !date || !status) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
  }

    // Verification if Price is positive
  if (prix < 0) {
    return res.status(400).json({ message: 'Le prix doit être positif' });
  }

  // Verification if Status is Valid
  if (!['brouillon', 'en cours', 'terminée'].includes(status)) {
    return res.status(400).json({ message: 'Statut invalide' });
  }

  // Verification if date is not in the Futur
  const currentDate = new Date().toISOString().split('T')[0]; 
  if (date > currentDate) {
    return res.status(400).json({ message: 'La date de la commande ne peut pas être dans le futur' });
  }

  try {
    const newCommande = await Commande.create({ name, prix, bars_id: id_bar, date, status });
    res.status(201).json(newCommande); 
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Get a Commande Function
exports.getCommande = async (req, res) => {
  try {
    const commande = await Commande.findOne({
      where: { id: req.params.id_commande },
      include: {
        model: Biere,
        through: { attributes: [] }, 
      },
    });

    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(commande); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Update a Commande Function
exports.updateCommande = async (req, res) => {
  const { id_commande } = req.params;
  const { name, prix, date, status } = req.body;

  try {
    const commande = await Commande.findByPk(id_commande);

    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Verification if the Commande was with the Status "terminée"
    if (commande.status === 'terminée') {
      return res.status(400).json({ message: 'Impossible de modifier une commande terminée' });
    }

    // Verification of the new Status if Updated
    const statusValide = ["brouillon", "en cours", "terminée"];
    if (status && !statusValide.includes(status)) {
      return res.status(400).json({ message: "Statut invalide. Valeurs acceptées : 'brouillon', 'en cours', 'terminée'." });
    }

    // Verification of the new Date is not in the Future if Updated
    const currentDate = new Date().toISOString().split('T')[0]; // Formate la date actuelle au format YYYY-MM-DD
    if (date && date > currentDate) {
      return res.status(400).json({ message: 'La date de la commande ne peut pas être dans le futur' });
    }

    // Update data
    commande.name = name || commande.name;
    commande.prix = prix || commande.prix;
    commande.date = date || commande.date;
    commande.status = status || commande.status;

    await commande.save();

    res.status(200).json(commande); 
  } catch (error) {
    console.error('Erreur lors de la modification de la commande:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Delete Commande Function
exports.deleteCommande = async (req, res) => {
  const { id_commande } = req.params;
  
  console.log("ID de la commande à supprimer:", id_commande);

  // Getting ID
  if (!id_commande) {
    return res.status(400).json({ message: 'ID de la commande manquant' });
  }

  try {
    // Delete all BiereCommande Linked
    await BiereCommande.destroy({
      where: { commande_id: id_commande },
    });

    // Delete Commande
    const commande = await Commande.destroy({
      where: { id: id_commande },
    });

    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.status(200).json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la commande:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Get all Commande from a Bar Funtion
exports.getCommandesByBar = async (req, res) => {
  const { id_bar } = req.params;

  try {
    const commandes = await Commande.findAll({
      where: { bars_id: id_bar },
      include: { model: Biere, through: { attributes: [] } }, 
    });

    if (commandes.length === 0) {
      return res.status(404).json({ message: 'Aucune commande trouvée pour ce bar.' });
    }

    res.json(commandes);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes du bar:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// préparation ultime 