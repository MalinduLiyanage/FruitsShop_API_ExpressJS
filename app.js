const express = require('express');
const userRoutes = require('./routes/routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api', userRoutes); 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
