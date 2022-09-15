const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./routes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));