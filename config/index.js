const express = require('express');
const path = require('path');
const app = express();
const routers = require('../router/routers');
const sequelize = require('../config/database');


app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

// Use Routers
app.use('/', routers);


// Starting Serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Synchronisation database
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(error => console.log('Error syncing database:', error));
