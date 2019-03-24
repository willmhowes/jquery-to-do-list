CREATE TABLE "toDoTable" (
   id serial PRIMARY KEY,
   task varchar(255) NOT NULL,
   is_complete boolean
);

INSERT INTO "toDoTable" ("task", "is_complete")
   VALUES ('Write a heart-felt letter to my grandma', false);

INSERT INTO "toDoTable" ("task", "is_complete")
   VALUES ('Dress up like Robin Hood', true);

INSERT INTO "toDoTable" ("task", "is_complete")
   VALUES ('Engage in monetary theft', true);

INSERT INTO "toDoTable" ("task", "is_complete")
   VALUES ('Donate stolen funds to Wikipedia', true);

INSERT INTO "toDoTable" ("task", "is_complete")
   VALUES ('Buy a half-dozen dinner rolls', false);

INSERT INTO "toDoTable" ("task", "is_complete")
   VALUES ('Sell carboard cutout of Jon Mulaney', false);
