const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const fileUpload = require('express-fileupload');
const os = require('os');

const routes = require('./services/routes');

const app = express();

app.use(cors());

app.use(express.json({ extended: true }));

app.use(fileUpload());

app.use('/public', express.static(path.join(__dirname, '..', 'upload')));

app.use('/api', routes);

app.use(logger('dev'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port:${port}`));
