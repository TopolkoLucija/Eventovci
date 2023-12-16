-- Create the 'korisnik' table
CREATE TABLE KORISNIK (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          korisnickoime VARCHAR(255) NOT NULL,
                          email VARCHAR(255) NOT NULL,
                          lozinka VARCHAR(255) NOT NULL,
                          tipkorisnika VARCHAR(13) NOT NULL,
                          adresa VARCHAR(255),
                          UNIQUE (korisnickoime, email)

);

-- Create the 'dogadjanje' table
CREATE TABLE DOGADJANJE (
                            iddogadjanja BIGINT AUTO_INCREMENT PRIMARY KEY,
                            nazivdogadjanja VARCHAR(255) NOT NULL,
                            tipdogadjanja VARCHAR(255) NOT NULL,
                            lokacijadogadjanja VARCHAR(255) NOT NULL,
                            vrijemedogadjanja TIMESTAMP NOT NULL,
                            trajanje DOUBLE PRECISION,
                            organizatorid BIGINT NOT NULL,
                            cijenaulaznice DOUBLE PRECISION NOT NULL,
                            opis VARCHAR(1500),
                            FOREIGN KEY (organizatorid) REFERENCES korisnik(id)
                                ON DELETE CASCADE
);
-- Create the 'poveznica' table
CREATE TABLE POVEZNICA (
                           idpoveznice BIGINT AUTO_INCREMENT PRIMARY KEY,
                           organizatorid BIGINT NOT NULL ,
                           link VARCHAR(255) NOT NULL,
                           FOREIGN KEY (organizatorid) REFERENCES korisnik(id)
                               ON DELETE CASCADE
);

CREATE TABLE MEDIJSKISADRZAJ (
                                 idmedijskogsadrzaja BIGINT AUTO_INCREMENT PRIMARY KEY,
                                 medijskisadrzaj TEXT,
                                 vrsta VARCHAR(10),
                                 iddogadjanja BIGINT,
                                 FOREIGN KEY (iddogadjanja) REFERENCES dogadjanje(iddogadjanja)
                                     ON DELETE CASCADE
);

-- Create the 'recenzija' table
CREATE TABLE RECENZIJA (
                           idrecenzije BIGINT AUTO_INCREMENT PRIMARY KEY,
                           recenzijatekst TEXT NOT NULL ,
                           ocjena INT NOT NULL,
                           iddogadjanja BIGINT NOT NULL ,
                           idkorisnik BIGINT NOT NULL ,
                           FOREIGN KEY (iddogadjanja) REFERENCES dogadjanje(iddogadjanja)
                               ON DELETE CASCADE,
                           FOREIGN KEY (idkorisnik) REFERENCES korisnik(id)
                               ON DELETE CASCADE
);

-- Create the 'dolazak_korisnika' table
CREATE TABLE dolazakkorisnika (
                                  iddolaskakorisnika BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  statusdolaska VARCHAR(255),
                                  iddogadjanja BIGINT,
                                  idkorisnik BIGINT,
                                  FOREIGN KEY (iddogadjanja) REFERENCES dogadjanje(iddogadjanja)
                                      ON DELETE CASCADE,
                                  FOREIGN KEY (idkorisnik) REFERENCES korisnik(id)
                                      ON DELETE CASCADE,
                                  UNIQUE(iddogadjanja, idkorisnik)
);

-- Create the 'clanarina' table
CREATE TABLE CLANARINA
(
    idclanarine     BIGINT AUTO_INCREMENT PRIMARY KEY,
    idkorisnik      BIGINT           NOT NULL,
    cijenaclanarine DOUBLE PRECISION NOT NULL,
    vrijedido       TIMESTAMP        NOT NULL,
    FOREIGN KEY (idkorisnik) REFERENCES korisnik (id)
        ON DELETE CASCADE
);

CREATE TABLE PRETPLATA (
                           idpretplata BIGINT AUTO_INCREMENT PRIMARY KEY,
                           kategorija VARCHAR(255),
                           lokacija VARCHAR(255),
                           idkorisnik BIGINT NOT NULL,
                           FOREIGN KEY (idkorisnik) REFERENCES korisnik (id)
                               ON DELETE CASCADE
);


INSERT INTO korisnik (korisnickoime, email, lozinka, tipkorisnika, adresa)
VALUES
    ('user1', 'user1@example.com', '$2a$10$N0qnEFuZlTuUaJ82aCqC9u0gV/txgl7r4ntinYsOZIgaDIT3KwPLW', 'posjetitelj', 'Adresa1'),
    ('user2', 'user2@example.com', '$2a$10$N0qnEFuZlTuUaJ82aCqC9u0gV/txgl7r4ntinYsOZIgaDIT3KwPLW', 'posjetitelj', 'Adresa2'),
    ('user3', 'user3@example.com', '$2a$10$N0qnEFuZlTuUaJ82aCqC9u0gV/txgl7r4ntinYsOZIgaDIT3KwPLW', 'posjetitelj', 'Adresa3'),
    ('user4', 'user4@example.com', '$2a$10$N0qnEFuZlTuUaJ82aCqC9u0gV/txgl7r4ntinYsOZIgaDIT3KwPLW', 'posjetitelj', 'Adresa6'),
    ('user5', 'user5@example.com', '$2a$10$N0qnEFuZlTuUaJ82aCqC9u0gV/txgl7r4ntinYsOZIgaDIT3KwPLW', 'posjetitelj', 'Adresa7'),
    ('user6', 'user6@example.com', '$2a$10$N0qnEFuZlTuUaJ82aCqC9u0gV/txgl7r4ntinYsOZIgaDIT3KwPLW', 'posjetitelj', 'Adresa8'),
    ('user7', 'user7@example.com', '$2a$10$N0qnEFuZlTuUaJ82aCqC9u0gV/txgl7r4ntinYsOZIgaDIT3KwPLW', 'posjetitelj', 'Adresa9'),
    ('org1', 'user4@example.com', '$2a$10$N0qnEFuZlTuUaJ82aCqC9u0gV/txgl7r4ntinYsOZIgaDIT3KwPLW', 'organizator', 'Adresa4'),
    ('org2', 'user5@example.com', '$2a$10$N0qnEFuZlTuUaJ82aCqC9u0gV/txgl7r4ntinYsOZIgaDIT3KwPLW', 'organizator', 'Adresa5'),
    ('admin', 'admin@example.com', '$2a$10$N0qnEFuZlTuUaJ82aCqC9u0gV/txgl7r4ntinYsOZIgaDIT3KwPLW', 'administrator', 'AdminAdresa');

INSERT INTO dogadjanje (nazivdogadjanja, tipdogadjanja, lokacijadogadjanja, vrijemedogadjanja, trajanje, organizatorid, cijenaulaznice, opis)
VALUES
    ('Event 1', 'Type 1', 'Location 1', CURRENT_TIMESTAMP, 2.5, 8, 15.0, 'opis'), -- doslovno sada
    ('Event 2', 'Type 2', 'Location 2', DATEADD('DAY', -1, CURRENT_TIMESTAMP), 3.0, 8, 20.0, 'opis'), -- Yesterday
    ('Event 3', 'Type 1', 'Location 3', DATEADD('DAY', -3, CURRENT_TIMESTAMP), 1.5, 8, 10.0, 'opis'), -- 3 days ago
    ('Event 4', 'Type 3', 'Location 4', DATEADD('HOUR', 3, CURRENT_TIMESTAMP), 4.0, 8, 25.0, 'opis'),  -- 3 hours from now
    ('Event 5', 'Type 2', 'Location 5', DATEADD('DAY', 50, CURRENT_TIMESTAMP), 2.5, 9, 0, 'opis'),   -- 50 days from now
    ('Event 6', 'Type 1', 'Location 6', DATEADD('DAY', 5, CURRENT_TIMESTAMP), 2.0, 9, 0, 'opis'),    -- 5 days from now
    ('Event 7', 'Type 3', 'Location 7', DATEADD('DAY', 3, CURRENT_TIMESTAMP), 3.5, 9, 0, 'opis'),   -- 3 days from now
    ('Event 8', 'Type 2', 'Location 8', DATEADD('HOUR', 12, CURRENT_TIMESTAMP), 1.5, 9, 0, 'opis'); -- 12 hours from now


INSERT INTO poveznica (organizatorid, link)
VALUES
    (8, 'https://www.facebook.com/user8'),
    (8, 'https://www.twitter.com/user8'),
    (8, 'https://www.instagram.com/user8'),
    (9, 'https://www.facebook.com/user9'),
    (9, 'https://www.twitter.com/user9'),
    (9, 'https://www.instagram.com/user9');


INSERT INTO dolazakkorisnika (statusdolaska, iddogadjanja, idkorisnik)
VALUES
    ('dolazim', 1, 1), -- User 1 attending event 1
    ('mozda', 1, 2),  -- User 2 maybe attending event 1
    ('ne dolazim', 5, 3),  -- User 3 not attending event 5

    ('dolazim', 2, 4), -- User 4 attending event 2
    ('mozda', 4, 5),  -- User 5 maybe attending event 4
    ('ne dolazim', 2, 6),  -- User 6 not attending event 2

    ('dolazim', 3, 7), -- User 7 attending event 3
    ('mozda', 6, 8);  -- User 8 maybe attending event 6

INSERT INTO recenzija (recenzijatekst, ocjena, iddogadjanja, idkorisnik)
VALUES
    ('Event 2 review by User 1', 4, 2, 1),  -- User 1's review for event 2 with a rating of 4
    ('Event 2 review by User 2', 5, 2, 2),  -- User 2's review for event 2 with a rating of 5
    ('Event 3 review by User 3', 3, 3, 3),  -- User 3's review for event 3 with a rating of 3
    ('Event 3 review by User 4', 4, 3, 4);  -- User 4's review for event 3 with a rating of 4

INSERT INTO clanarina (idkorisnik, cijenaclanarine, vrijedido)
VALUES
    (8, 20.0, DATEADD('DAY', 18, CURRENT_TIMESTAMP)),
    (9, 20.0, '0000-01-01T00:00:00');

INSERT INTO pretplata (kategorija, lokacija, idkorisnik)
VALUES
    ('Type 1', NULL, 1),
    (NULL, 'Concert Hall', 2),
    (NULL, 'Location 1', 1),
    (NULL, 'Trešnjevka', 8);
