CREATE TABLE _user (
  "id" serial PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar,
  "phone_number" varchar,
  "job_title" varchar,
  "street" varchar,
  "city" varchar,
  "zip" varchar,
  "_state" varchar,
  auth0 text
 );

CREATE TABLE "client" (
  "id" serial PRIMARY KEY,
  "client_first" varchar,
  "client_last" varchar,
  "client_email" varchar,
  "client_phone" varchar,
  "current_on_payment" boolean
);

CREATE TABLE "gig" (
  "id" serial PRIMARY KEY,
  "user_id" int references _user,
  "title" varchar,
  "description" varchar,
  "total_time" int,
  "project_rate" int,
  "client_id" int references client,
  "is_paid" boolean,
  "is_billed" boolean
);

CREATE TABLE "task" (
  "id" serial PRIMARY KEY,
  "gig_id" int references gig,
  "task_title" varchar,
  "task_desc" varchar
);