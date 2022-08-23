const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');

const routes = require('./services/routes');

const app = express();

app.use(cors());

// Middleware
app.use(express.json({ extended: true }));

// Public assets
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', routes);

// Logger for dev
app.use(logger('dev'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port:${port}`));
