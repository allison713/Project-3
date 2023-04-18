--Drop tables
DROP TABLE ufo_comments;
DROP TABLE ufo_sightings;

--Create Tables for each CSV
CREATE TABLE ufo_comments (
 	id INT NOT NULL PRIMARY KEY,
  	date_ocurrence VARCHAR,
	latitude FLOAT,
	longitude FLOAT,
	comments VARCHAR	
);

CREATE TABLE ufo_sightings (
 	id INT NOT NULL PRIMARY KEY,
  	date_ocurrence VARCHAR,
	city VARCHAR,
	state VARCHAR(2),
	country VARCHAR,
	shape VARCHAR,
	duration_seconds float,
	duration_hours_min VARCHAR,
	date_posted VARCHAR,
	latitude FLOAT,
	longitude FLOAT
);

--Import data into tables
COPY ufo_comments FROM  'C:\Users\Allison\Downloads\Project-3\UFO_comments.csv' WITH delimiter ','  CSV HEADER;
COPY ufo_sightings FROM  'C:\Users\Allison\Downloads\Project-3\UFO_cleaned.csv' WITH delimiter ','  CSV HEADER;