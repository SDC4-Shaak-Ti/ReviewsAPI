const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./routes')


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`))