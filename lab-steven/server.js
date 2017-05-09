'use strict';

require('dotenv').load();

const express = require('express');
const cors = require('cors');
const debug = require('debug')('cfgram: server');
const Promise = require('bluebird');
const errHandler = require('./lib/error-middleware');
const authRoutes = require('./routes/auth-routes');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/cfgram-dev';

mongoose.promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(errHandler);
app.use(cors());
app.use(bodyParser);
app.use('/api', authRoutes(router));

app.listen(PORT, () => console.log('App listening on PORT: ', PORT));
