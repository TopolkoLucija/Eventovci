-- Create the 'korisnik' table
CREATE TABLE KORISNIK (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          korisnickoime VARCHAR(255) NOT NULL,
                          email VARCHAR(255) NOT NULL,
                          lozinka VARCHAR(255) NOT NULL,
                          tipkorisnika VARCHAR(13) NOT NULL,
                          adresa VARCHAR(255),
                          placanjeclanarine BOOLEAN,
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
                            FOREIGN KEY (organizatorid) REFERENCES korisnik(id)
                                ON DELETE CASCADE,
                            UNIQUE (organizatorid)
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
                                  medijskisadrzaj LONGBLOB,
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





