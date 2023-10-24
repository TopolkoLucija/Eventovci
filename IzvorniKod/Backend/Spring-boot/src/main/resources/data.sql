-- Create the 'korisnik' table
CREATE TABLE korisnik (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          korisnicko_ime VARCHAR(255) NOT NULL,
                          email VARCHAR(255) NOT NULL,
                          lozinka VARCHAR(255) NOT NULL,
                          tip_korisnika VARCHAR(13) NOT NULL,
                          adresa VARCHAR(255),
                          placanje_clanarine BOOLEAN
);

-- Create the 'dogadjanje' table
CREATE TABLE dogadjanje (
                            id_dogadjanja BIGINT AUTO_INCREMENT PRIMARY KEY,
                            naziv_dogadjanja VARCHAR(255) NOT NULL,
                            tip_dogadjanja VARCHAR(255) NOT NULL,
                            lokacija_dogadjanja VARCHAR(255) NOT NULL,
                            datum_dogadjanja DATE,
                            vrijeme_pocetka TIME,
                            trajanje VARCHAR(255),
                            organizator_id BIGINT,
                            placanje_ulaznice BOOLEAN,
                            FOREIGN KEY (organizator_id) REFERENCES korisnik(id)
);