const Bar = require('./bars');
const Biere = require('./biere');
const Commande = require('./commande');
const BiereCommande = require('./biere_commande');

// All Relations between Table

// Delete BiereCommande when Deleting Commande
Commande.belongsToMany(Biere, { through: BiereCommande, foreignKey: 'commande_id', onDelete: 'CASCADE'});
Biere.belongsToMany(Commande, { through: BiereCommande, foreignKey: 'biere_id', onDelete: 'CASCADE'});

Bar.hasMany(Commande, { foreignKey: 'bars_id', onDelete: 'CASCADE' });
Commande.belongsTo(Bar, { foreignKey: 'bars_id', onDelete: 'CASCADE' });

// Delete BiereCommande when Deleting a bar
Bar.hasMany(BiereCommande, { foreignKey: 'bar_id', onDelete: 'CASCADE' });
BiereCommande.belongsTo(Bar, { foreignKey: 'bar_id', onDelete: 'CASCADE' });

module.exports = { Bar, Biere, Commande, BiereCommande };
