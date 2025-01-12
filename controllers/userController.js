const db = require('../config/db');
const path = require('path');

// Get All Users
const getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
};

// Get User by ID
const getUserById = (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(results[0]);
  });
};

// Add a New User
const addUser = (req, res) => {
  //const { name, email } = req.body;
  const name = req.body.name;
  const email = req.body.email;
  console.log('Request Body:', req.body);


  // Validate input
  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required.' });
    return;
  }

  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: 'User added', userId: results.insertId });
  });
};

// Update a User
const updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User updated' });
  });
};

// Delete a User
const deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted' });
  });
};

// Upload User Image
const uploadUserImage = (req, res) => {
  const serverUrl = process.env.SERVER_URL || 'http://localhost/';
  const userId = req.params.id;

  // Ensure a file is uploaded
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // File path with full URL
  const filePath = new URL(path.join('uploads', req.file.filename), serverUrl).href;

  // Update database with the file path
  db.query('UPDATE users SET image_path = ? WHERE id = ?', [filePath, userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'Image uploaded successfully', filePath });
  });
};

const getUserImage = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  res.sendFile(filePath, (err) => {
      if (err) {
          console.log(err);
          res.status(404).send('File not found');
      }
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  getUserImage,
};
