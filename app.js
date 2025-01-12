const express = require('express');
const userRoutes = require('./routes/routes');
const staticRoutes = require('./routes/staticroutes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());

app.use('/api', userRoutes); 
app.use(staticRoutes); 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
