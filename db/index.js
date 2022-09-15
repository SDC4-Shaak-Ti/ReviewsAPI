const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PGPORT,
  password: process.env.PASSWORD,
  database: process.env.DB
})

client.connect((err) => {
  if (err) {
    console.log('Failed to connect to DB: ', err)
  } else {
    console.log('Successfully connected to DB')
  }
})

module.exports = client;
