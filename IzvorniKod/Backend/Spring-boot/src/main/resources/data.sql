-- Create the 'korisnik' table
CREATE TABLE korisnik (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          korisnickoime VARCHAR(255) NOT NULL,
                          email VARCHAR(255) NOT NULL,
                          lozinka VARCHAR(255) NOT NULL,
                          tipkorisnika VARCHAR(13) NOT NULL,
                          adresa VARCHAR(255),
                          placanjeclanarine BOOLEAN
);

-- Create the 'dogadjanje' table
CREATE TABLE dogadjanje (
                            iddogadjanja BIGINT AUTO_INCREMENT PRIMARY KEY,
                            nazivdogadjanja VARCHAR(255) NOT NULL,
                            tipdogadjanja VARCHAR(255) NOT NULL,
                            lokacijadogadjanja VARCHAR(255) NOT NULL,
                            vrijemedogadjanja TIMESTAMP,
                            trajanje DOUBLE PRECISION,
                            organizatorid BIGINT,
                            cijenaulaznice DOUBLE PRECISION,
                            FOREIGN KEY (organizatorid) REFERENCES korisnik(id)
);
-- Create the 'poveznica' table
CREATE TABLE poveznica (
                           idpoveznice BIGINT AUTO_INCREMENT PRIMARY KEY,
                           organizatorid BIGINT,
                           link VARCHAR(255),
                           FOREIGN KEY (organizatorid) REFERENCES korisnik(id)
);

-- Create the 'medijski_sadrzaj' table
CREATE TABLE medijskisadrzaj (
                                  idmedijskogsadrzaja BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  adresamedijskogsadrzaja VARCHAR(255),
                                  iddogadjanja BIGINT,
                                  FOREIGN KEY (iddogadjanja) REFERENCES dogadjanje(iddogadjanja)
);

-- Create the 'recenzija' table
CREATE TABLE recenzija (
                           idrezenczije BIGINT AUTO_INCREMENT PRIMARY KEY,
                           recenzijatekst TEXT,
                           ocjena INT,
                           iddogadjanja BIGINT,
                           idkorisnik BIGINT,
                           FOREIGN KEY (iddogadjanja) REFERENCES dogadjanje(iddogadjanja),
                           FOREIGN KEY (idkorisnik) REFERENCES korisnik(id)
);

-- Create the 'dolazak_korisnika' table
CREATE TABLE dolazakkorisnika (
                                   iddolaskakorisnika BIGINT AUTO_INCREMENT PRIMARY KEY,
                                   statusdolaska VARCHAR(255),
                                   iddogadjanja BIGINT,
                                   idkorisnik BIGINT,
                                   FOREIGN KEY (iddogadjanja) REFERENCES dogadjanje(iddogadjanja),
                                   FOREIGN KEY (idkorisnik) REFERENCES korisnik(id)
);


