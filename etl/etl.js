// \COPY oldphotos FROM '/Users/danielshin/Desktop/Hack Reactor/SDC/ReviewsAPI/etl' DELIMITER ',' CSV HEADER;

const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
require('dotenv').config();

let stream = fs.createReadStream("./characteristics.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const pool = new Pool({
      host: "localhost",
      database: "testing",
      password: '',
      port: 5432
    });

    const query =
      "INSERT INTO character (id, product_id, name) VALUES ($1, $2, $3)";

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });

stream.pipe(csvStream);