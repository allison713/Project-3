-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/Hxe3yJ
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- UFO schema diagram.

CREATE TABLE "ufo_sightings" (
    "id" INTEGER   NOT NULL,
    "date_ocurrence" VARCHAR   NOT NULL,
    "city" VARCHAR   NOT NULL,
    "state" CHAR(2)   NULL,
    "country" CHAR(2)   NULL,
    "shape" VARCHAR(10)   NULL,
    "duration_seconds" FLOAT   NULL,
    "duration_hours_min" VARCHAR   NOT NULL,
    "date_posted" VARCHAR   NOT NULL,
    "latitude" FLOAT   NOT NULL,
    "longitude" FLOAT   NOT NULL,
    CONSTRAINT "pk_ufo_sightings" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "ufo_comments" (
    "id" INTEGER   NOT NULL,
    "date_ocurrence" VARCHAR   NOT NULL,
    "latitude" FLOAT   NOT NULL,
    "longitude" FLOAT   NOT NULL,
    "comments" VARCHAR   NULL,
    CONSTRAINT "pk_UFO_comments" PRIMARY KEY (
        "id"
     )
);


