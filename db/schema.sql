CREATE DATABASE reviews;
\c reviews;
CREATE TABLE "Reviews"(
  review_id integer NOT NULL,
  product_id integer NOT NULL,
  rating integer NOT NULL,
  summary varchar NOT NULL,
  response varchar,
  body text NOT NULL,
  date varchar NOT NULL,
  reviewer_name varchar NOT NULL,
  helpfulness varchar NOT NULL,
  reviewer_email varchar NOT NULL,
  reported varchar,
  recommend varchar,
  CONSTRAINT "Reviews_pkey" PRIMARY KEY(review_id)
);
CREATE TABLE "Photos"(
  photo_id integer,
  review_id integer,
  url varchar,
  "Reviews_review_id" integer,
  CONSTRAINT "Photos_pkey" PRIMARY KEY(photo_id)
);
CREATE TABLE "Characteristics"(
  characteristic_id integer NOT NULL,
  product_id integer NOT NULL,
  "name" varchar NOT NULL,
  CONSTRAINT "Characteristics_pkey" PRIMARY KEY(characteristic_id)
);
CREATE TABLE "Characteristic_Reviews"(
  id integer NOT NULL,
  characteristic_id integer NOT NULL,
  review_id integer NOT NULL,
  "value" integer NOT NULL,
  "Characteristics_characteristic_id" integer NOT NULL,
  "Reviews_review_id" integer NOT NULL,
  CONSTRAINT "Characteristic_Reviews_pkey" PRIMARY KEY(id)
);