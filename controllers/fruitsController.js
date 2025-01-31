const db = require('../config/db');

// Get All Fruits
const getAllFruits = (req, res) => {
  db.query('SELECT * FROM fruits', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
};

// Get Fruit by ID
const getFruitById = (req, res) => {
  const fruitId = req.params.id;
  db.query('SELECT * FROM fruits WHERE id = ?', [fruitId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Fruit not found' });
      return;
    }
    res.json(results[0]);
  });
};

module.exports = {
    getAllFruits,
    getFruitById
  };