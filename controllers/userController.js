const db = require('../config/db');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup User
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); 

    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
      [name, email, hashedPassword], 
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User registered', userId: results.insertId });
    });

  } catch (error) {
    res.status(500).json({ error: 'Error hashing password' });
  }
};

// Login User
const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Login successful', token });
  });
};

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
  signupUser,
  loginUser,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  getUserImage
};
