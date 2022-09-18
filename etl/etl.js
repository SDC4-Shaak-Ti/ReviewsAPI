const fs = require("fs");
const path = require('path');
const { parse } = require('csv-parse');
const { Client } = require("pg");
require('dotenv').config();

async function fillChar() {

  const client = new Client({
    host: 'localhost',
    password: '',
    database: 'testing',
    port: 5432
  });
  await client.connect();
  await (async () => {
    const parser = fs.createReadStream("./characteristics.csv").pipe(parse({
      skip_records_with_error: true,
      columns: true,
      // to_line: 5
    }));


    const text =
      "INSERT INTO char (product_id, name) VALUES ($1, $2)";

    process.stdout.write('...starting reviews')
    for await (const record of parser) {
      var values = [
        Number(record.product_id),
        record.name
      ]
      await client.query(text, values)
    };

    process.stdout.write('...done reviews')

  })()
}
// fillChar();

async function fillCharReviews() {

  const client = new Client({
    host: 'localhost',
    password: '',
    database: 'testing',
    port: 5432
  });
  await client.connect();
  await (async () => {
    const parser = fs.createReadStream(path.join(__dirname + "/characteristic_reviews.csv")).pipe(parse({
      skip_records_with_error: true,
      columns: true,
      // to_line: 5
    }));


    const text =
      "INSERT INTO char_reviews (characteristic_id, review_id, value) VALUES ($1, $2, $3)";

    process.stdout.write('...starting char_reviews')
    for await (const record of parser) {
      var values = [
        Number(record.characteristic_id),
        Number(record.review_id),
        Number(record.value)
      ]

      await client.query(text, values)
    };

    process.stdout.write('...done char_reviews')

  })()
}
// fillCharReviews();

async function fillReviews() {

  const client = new Client({
    host: 'localhost',
    password: '',
    database: 'testing',
    port: 5432
  });
  await client.connect();
  await (async () => {
    const parser = fs.createReadStream(path.join(__dirname + "/reviews.csv")).pipe(parse({
      skip_records_with_error: true,
      columns: true,
      // to_line: 5
    }));


    const text =
      "INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

    process.stdout.write('...starting reviews')
    for await (const record of parser) {
      var date = new Date(Number(record.date));
      if (record.recommend === 'true') {
        var recommend = true;
      } else {
        var recommend = false;
      }
      if (record.reported === 'true') {
        var reported = true;
      } else {
        var reported = false;
      }
      var values = [
        Number(record.product_id),
        Number(record.rating),
        date,
        record.summary,
        record.body,
        recommend,
        reported,
        record.reviewer_name,
        record.reviewer_email,
        record.response,
        Number(record.helpfulness)
      ]

      await client.query(text, values)
    };

    process.stdout.write('...done reviews')

  })()
}

// fillReviews();

async function fillPhotos() {

  const client = new Client({
    host: 'localhost',
    password: '',
    database: 'testing',
    port: 5432
  });
  await client.connect();
  await (async () => {
    const parser = fs.createReadStream(path.join(__dirname + "/reviews_photos.csv")).pipe(parse({
      skip_records_with_error: true,
      columns: true,
      // to_line: 5
    }));


    const text =
      "INSERT INTO photos (review_id, url) VALUES ($1, $2)";

    process.stdout.write('...starting photos')
    for await (const record of parser) {
      var values = [
        Number(record.review_id),
        record.url
      ]

    await client.query(text, values)
    };

    process.stdout.write('...done photos')

  })()
}

// fillPhotos();