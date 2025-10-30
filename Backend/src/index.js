require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const itemsRouter = require('./routes/items');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// connect to MongoDB
connectDB(process.env.MONGODB_URI);

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routes
app.use('/api/items', itemsRouter);

// health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
