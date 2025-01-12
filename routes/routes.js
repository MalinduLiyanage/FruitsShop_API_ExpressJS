const express = require('express');
const multer = require('multer');
const app = express();
app.use(express.json());
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  uploadUserImage,
} = require('../controllers/userController');

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

// Define API endpoints
router.get('/users', getAllUsers); //GET http://localhost:3000/api/users/
router.get('/users/:id', getUserById); //GET http://localhost:3000/api/users/1
router.post('/users', addUser);  //POST http://localhost:3000/api/users/ {"name": "Alice","email": "alice@example.com"}
router.put('/users/:id', updateUser); //PUT http://localhost:3000/api/users/1 {"name": "Aliceupdated","email": "aliceupdated@example.com"}
router.delete('/users/:id', deleteUser); //DELETE http://localhost:3000/api/users/1
router.post('/users/:id/upload', upload.single('image'), uploadUserImage);

module.exports = router;

