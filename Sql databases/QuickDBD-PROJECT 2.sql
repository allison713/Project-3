-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/Hxe3yJ
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- UFO schema diagram.

CREATE TABLE "UFO_Sightenings" (
    "id" INTEGER   NOT NULL,
    "date_ocurrence" DATE   NOT NULL,
    "city" VARCHAR   NOT NULL,
    "state" CHAR(2)   NULL,
    "country" CHAR(2)   NULL,
    "shape" VARCHAR(10)   NULL,
    "duration_seconds" FLOAT   NULL,
    "duration_hours_min" VARCHAR   NOT NULL,
    "date_posted" DATE   NOT NULL,
    "latitude" FLOAT   NOT NULL,
    "longitude" FLOAT   NOT NULL,
    CONSTRAINT "pk_UFO_Sightenings" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "UFO_comments" (
    "id" INTEGER   NOT NULL,
    "date_ocurrence" DATE   NOT NULL,
    "latitude" FLOAT   NOT NULL,
    "longitude" FLOAT   NOT NULL,
    "comments" VARCHAR   NULL,
    CONSTRAINT "pk_UFO_comments" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "UFO_Sightenings" ADD CONSTRAINT "fk_UFO_Sightenings_id" FOREIGN KEY("id")
REFERENCES "UFO_comments" ("id");

