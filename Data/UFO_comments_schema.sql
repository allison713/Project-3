--Drop tables
DROP TABLE UFO_comments;
DROP TABLE UFO_cleaned;

--Create Tables for each CSV
CREATE TABLE UFO_comments (
 	id INT NOT NULL PRIMARY KEY,
  	date_ocurrence DATE,
	latitude FLOAT,
	longitude FLOAT,
	comments VARCHAR	
);

CREATE TABLE UFO_cleaned (
 	id INT NOT NULL PRIMARY KEY,
  	date_ocurrence DATE,
	city VARCHAR,
	state VARCHAR(2),
	country VARCHAR,
	shape VARCHAR,
	duration_seconds float,
	duration_hours_min VARCHAR,
	date_posted DATE,
	latitude FLOAT,
	longitude FLOAT
);

--Import data into tables
COPY ufo_comments FROM  'C:\Users\Allison\Downloads\Project-3\UFO_comments.csv' WITH delimiter ','  CSV HEADER;
COPY ufo_cleaned FROM  'C:\Users\Allison\Downloads\Project-3\UFO_cleaned.csv' WITH delimiter ','  CSV HEADER;