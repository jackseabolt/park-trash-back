-- psql -f ./migrations/001.sql ADRESSS

BEGIN; 

CREATE TABLE items (
    id SERIAL PRIMARY KEY, 
    description TEXT NOT NULL, 
    street TEXT NOT NULL, 
    cross_street TEXT, 
    address TEXT, 
    city TEXT NOT NULL, 
    photo_url TEXT, 
    email TEXT, 
    phone TEXT, 
    desired_reply BOOLEAN NOT NULL, 
    completed BOOLEAN, 
    date_reported DATE, 
    date_completed DATE
); 

COMMIT; 