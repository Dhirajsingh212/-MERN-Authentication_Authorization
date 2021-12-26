const routes = require('./routes/routes');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DB_LOCAL)
  .then(() => {
    console.log('db connnected successfully');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', routes);

module.exports = app;
