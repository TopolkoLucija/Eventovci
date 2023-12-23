import React , { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Dogadaj from "./Dogadaj";
import '../styles/App.css';
import '../styles/AddEvent.css';
import '../styles/OrganizerPage.css';

const OrganizerPage = () => {

   const accessToken = sessionStorage.getItem("accessToken");
   const [dogadajcic, setdogadajcic] = useState([]);


   const [organizer, setOrganizer] = useState(null);
   const { id } = useParams(); // Postavite ID organizatora koji želite dohvatiti

   useEffect(() => {
    if (!accessToken) return; // Provjerite postoji li accessToken

    fetch(`/api/data/getOrg/${id}`, {  // Uključite ID organizatora u URL zahtjeva
       method: "GET",
       headers: {
          "Content-Type": "application/json",
          'Authorization': accessToken
       }
    })
    .then(response => {
       if (!response.ok) {
          throw new Error('Neuspješan zahtjev za dohvaćanje organizatora');
       }
       return response.json();
    })
    .then(data => {
       if (data.message) {
          // Obrada greške ako postoji poruka
          console.error("Poruka o grešci:", data.message);
       } else {
          setOrganizer(data);
          setdogadajcic(data.eventList);

       }
    })
    .catch(error => {
       console.error("Greška prilikom dohvaćanja podataka:", error);
    });
 }, [accessToken, id]);

 const clickedOnEvent = (id) => {
    console.log(id);
  };

return (
    <div className="main-content">
       {organizer ? (
        <div className='organizer-data'>
          <h1 className="main-title">{organizer.username}</h1>
          <div className="organizer-details">
          <div className="category-container">
        <label className="category-email">E-mail organizatora:</label>
        <p>{organizer.email}</p>
    </div>

    <div className="category-container">
        <label>Adresa organizatora:</label>
        <p>{organizer.homeAdress}</p>
    </div>

    <div className="category-container">
        <label>Poveznice na organizatorove Facebook/web stranice:</label>
        <ul>
            {organizer.links && organizer.links.map((link, index) => (
                <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </li>
            ))}
        </ul>
    </div>
          
          <label>Sva organizatorova događanja:</label>
          <div className="KontejnerZaKarice">
            {dogadajcic?.length > 0 ? (
            <div className="container">
                {dogadajcic.map((dogadaj) => {
                return (
                    <div
                    key={dogadaj.id}
                    onClick={() => clickedOnEvent(dogadaj.id)}
                    >
                    <Dogadaj
                        key={dogadaj.id}
                        Mjesto={dogadaj.location}
                        Datum={dogadaj.timeOfTheEvent}
                        Naslov={dogadaj.eventName}
                        Poster={dogadaj.media}
                    ></Dogadaj>
                    </div>
                );
                })}
            </div>
            ) : (
            <div className="empty"></div>
            )}
        </div>
        </div>
        </div>
       ) : (
        <div className="bigger-empty"></div>
       )}
    </div>
 );
};

export default OrganizerPage;
