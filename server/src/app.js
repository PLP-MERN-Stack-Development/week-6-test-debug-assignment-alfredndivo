// server/src/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes'); // we'll create this next

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

module.exports = app;
