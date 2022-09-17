// TABLE-CREATION
// CREATE TABLE Reviews(
//   id SERIAL PRIMARY KEY,
//   product_id integer NOT NULL,
//   rating integer NOT NULL,
//   date varchar NOT NULL,
//   summary varchar NOT NULL,
//   body text NOT NULL,
//   recommend boolean,
//   reported boolean,
//   reviewer_name varchar NOT NULL,
//   reviewer_email varchar NOT NULL,
//   response varchar,
//   helpfulness integer NOT NULL
// );
// CREATE TABLE Photos(
//   id SERIAL PRIMARY KEY,
//   review_id integer,
//   url varchar
// );
// CREATE TABLE Characteristics(
//   id SERIAL PRIMARY KEY,
//   product_id integer NOT NULL,
//   name varchar NOT NULL
// );
// CREATE TABLE Characteristic_Reviews(
//   id SERIAL PRIMARY KEY,
//   characteristic_id integer NOT NULL,
//   review_id integer NOT NULL,
//   value integer NOT NULL
// );

// INDEX-CREATION:
// CREATE INDEX reviews_product_id_idx
// ON reviews (product_id);
// CREATE INDEX photos_review_id_idx
// ON photos (review_id);
// CREATE INDEX characteristics_product_id_idx
// ON characteristics (product_id);
// CREATE INDEX characteristic_reviews_charactereistic_id_idx
// ON characteristic_reviews (characteristic_id);

// \COPY photos FROM '/Users/danielshin/Desktop/Hack Reactor/SDC/ReviewsAPI/etl/reviews_photos.csv' DELIMITER ',' CSV HEADER;
// \COPY characteristics FROM '/Users/danielshin/Desktop/Hack Reactor/SDC/ReviewsAPI/etl/characteristics.csv' DELIMITER ',' CSV HEADER;
// \COPY reviews FROM '/Users/danielshin/Desktop/Hack Reactor/SDC/ReviewsAPI/etl/reviews.csv' DELIMITER ',' CSV HEADER;
// \COPY characteristic_reviews FROM '/Users/danielshin/Desktop/Hack Reactor/SDC/ReviewsAPI/etl/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;