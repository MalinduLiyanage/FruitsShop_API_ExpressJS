const express = require('express');
const app = express();
app.use(express.json());
const {
  getUserImage
} = require('../controllers/userController');

const router = express.Router();

router.get('/uploads/:filename', getUserImage);

module.exports = router;