const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const emailRoutes = require('./routes/emailRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/email', emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
