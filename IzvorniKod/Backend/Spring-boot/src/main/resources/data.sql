-- Create the 'korisnik' table
CREATE TABLE KORISNIK (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          korisnickoIme VARCHAR(255) NOT NULL,
                          email VARCHAR(255) NOT NULL,
                          lozinka VARCHAR(255) NOT NULL,
                          tipKorisnika VARCHAR(13) NOT NULL,
                          adresa VARCHAR(255),
                          placanjeClanarine BOOLEAN,
                          UNIQUE (korisnickoIme, email)
);

-- Create the 'dogadjanje' table
CREATE TABLE DOGADJANJE (
                            idDogadjanja BIGINT AUTO_INCREMENT PRIMARY KEY,
                            nazivDogadjanja VARCHAR(255) NOT NULL,
                            tipDogadjanja VARCHAR(255) NOT NULL,
                            lokacijaDogadjanja VARCHAR(255) NOT NULL,
                            vrijemeDogadjanja TIMESTAMP NOT NULL,
                            trajanje DOUBLE PRECISION,
                            organizatorId BIGINT NOT NULL,
                            cijenaUlaznice DOUBLE PRECISION NOT NULL,
                            FOREIGN KEY (organizatorId) REFERENCES korisnik(id),
                            UNIQUE (organizatorId)
);
-- Create the 'poveznica' table
CREATE TABLE POVEZNICA (
                           idPoveznice BIGINT AUTO_INCREMENT PRIMARY KEY,
                           organizatorId BIGINT NOT NULL ,
                           link VARCHAR(255) NOT NULL,
                           FOREIGN KEY (organizatorId) REFERENCES korisnik(id)
);

CREATE TABLE MEDIJSKISADRZAJ (
                                  idMedijskogSadrzaja BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  adresaMedijskogSadrzaja VARCHAR(255),
                                  idDogadjanja BIGINT,
                                  FOREIGN KEY (idDogadjanja) REFERENCES dogadjanje(idDogadjanja)
);

-- Create the 'recenzija' table
CREATE TABLE RECENZIJA (
                           idrecenzije BIGINT AUTO_INCREMENT PRIMARY KEY,
                           recenzijaTekst TEXT NOT NULL ,
                           ocjena INT NOT NULL,
                           idDogadjanja BIGINT NOT NULL ,
                           idKorisnik BIGINT NOT NULL ,
                           FOREIGN KEY (idDogadjanja) REFERENCES dogadjanje(idDogadjanja),
                           FOREIGN KEY (idKorisnik) REFERENCES korisnik(id)
);

-- Create the 'dolazak_korisnika' table
CREATE TABLE dolazakkorisnika (
                                   idDolaskaKorisnika BIGINT AUTO_INCREMENT PRIMARY KEY,
                                   statusDolaska VARCHAR(255),
                                   idDogadjanja BIGINT,
                                   idKorisnik BIGINT,
                                   FOREIGN KEY (idDogadjanja) REFERENCES dogadjanje(idDogadjanja),
                                   FOREIGN KEY (idKorisnik) REFERENCES korisnik(id),
                                   UNIQUE(idDogadjanja, idKorisnik)
);

-- Create the 'clanarina' table
CREATE TABLE CLANARINA
(
    idClanarine     BIGINT AUTO_INCREMENT PRIMARY KEY,
    idKorisnik      BIGINT           NOT NULL,
    cijenaClanarine DOUBLE PRECISION NOT NULL,
    vrijediDo       TIMESTAMP        NOT NULL,
    FOREIGN KEY (idKorisnik) REFERENCES korisnik (id)
);





