--Drop tables
DROP TABLE UFO_comments;

--Create Tables for each CSV
CREATE TABLE UFO_comments (
 	id INT NOT NULL PRIMARY KEY,
  	date_ocurrence DATE,
	latitude FLOAT,
	longitude FLOAT,
	comments VARCHAR	
);

--Import data into tables
COPY ufo_comments FROM  'C:\Users\Allison\Downloads\Project-3\UFO_comments.csv' WITH delimiter ','  CSV HEADER;