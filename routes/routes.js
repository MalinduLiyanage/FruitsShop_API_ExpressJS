const express = require('express');
const multer = require('multer');
const authenticateToken = require('../config/tokenmanager');
const app = express();
app.use(express.json());
const {
  signupUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserImage
} = require('../controllers/userController');
const {
  getAllFruits,
  getFruitById,
} = require('../controllers/fruitsController');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Save files with a timestamp for uniqueness
  },
});
const upload = multer({ storage });

//Signup and Login
router.post('/signup', signupUser); //JSON body {"name": "Malindu","email": "malindu@gmail.com","password": "password"}
router.post('/login', loginUser); // JSON Body {"email": "malindu@gmail.com","password": "password"} Response with token

// Define API endpoints for users (Put the Authorization Header like Bearer + JWT)
router.get('/users',authenticateToken, getAllUsers); //GET http://localhost/api/users/
router.get('/users/:id',authenticateToken, getUserById); //GET http://localhost/api/users/1
router.put('/users/:id',authenticateToken,  updateUser); //PUT http://localhost/api/users/1 {"name": "Aliceupdated","email": "aliceupdated@example.com"}
router.delete('/users/:id',authenticateToken,  deleteUser); //DELETE http://localhost/api/users/1
router.post('/users/:id/upload', upload.single('image'),authenticateToken, uploadUserImage); //POST http://localhost/api/users/12/upload

// Define API endpoints for fruits (Put the Authorization Header like Bearer + JWT)
router.get('/fruits',authenticateToken, getAllFruits); //GET http://localhost/api/fruits/
router.get('/fruits/:id',authenticateToken, getFruitById); //GET http://localhost/api/fruits/1

module.exports = router;