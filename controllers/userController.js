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
  db.query('SELECT name, email, image_path FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
};

// Get User by ID (only for the logged-in user)
const getUserById = (req, res) => {
  const requestedUserId = req.params.id;
  const authenticatedUserId = req.user.userId; // Get userId from JWT

  if (requestedUserId !== authenticatedUserId.toString()) {
    return res.status(403).json({ error: 'Forbidden: You can only access your own data' });
  }

  db.query('SELECT * FROM users WHERE id = ?', [requestedUserId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(results[0]);
  });
};



const updateUser = (req, res) => {
  const requestedUserId = req.params.id; 
  const authenticatedUserId = req.user.userId; 

  if (requestedUserId !== authenticatedUserId.toString()) {
    return res.status(403).json({ error: 'Forbidden: You can only update your own data' });
  }

  const { name, email } = req.body;

  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, requestedUserId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated' });
  });
};


// Delete a User
const deleteUser = (req, res) => {
  const requestedUserId = req.params.id; 
  const authenticatedUserId = req.user.userId; 

  if (requestedUserId !== authenticatedUserId.toString()) {
    return res.status(403).json({ error: 'Forbidden: You can only delete your own account' });
  }

  db.query('DELETE FROM users WHERE id = ?', [requestedUserId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  });
};


const uploadUserImage = (req, res) => {
  const requestedUserId = req.params.id; 
  const authenticatedUserId = req.user.userId; 

  if (requestedUserId !== authenticatedUserId.toString()) {
    return res.status(403).json({ error: 'Forbidden: You can only upload an image for your own account' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const serverUrl = process.env.SERVER_URL;

  const filePath = new URL(path.join('uploads', req.file.filename), serverUrl).href;

  db.query('UPDATE users SET image_path = ? WHERE id = ?', [filePath, requestedUserId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
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
  updateUser,
  deleteUser,
  uploadUserImage,
  getUserImage
};
