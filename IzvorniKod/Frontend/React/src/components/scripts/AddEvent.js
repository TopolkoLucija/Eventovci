import React, { useState } from 'react';
import '../styles/AddEvent.css';

const AddEvent = () => {

   var accessToken = sessionStorage.getItem("accessToken");
   const [eventName, setEventName] = useState("");
   const [typeOfEvent, setTypeOdEvent] = useState("");
   const [location, setLocation] = useState("");
   const [timeOfTheEvent, setTimeOfTheEvent] = useState(null);
   const [duration, setDuration] = useState(0);
   const [ticketPrice, setTicketPrice] = useState(0);
   const [text, setText] = useState("");
   const [file, setFile] = useState([]);
   const [id, setId] = useState(5);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files;
        setFile(selectedFile);
    };

    const handleAddEvent = async () => {
        const eventData = {
            eventName,
            typeOfEvent,
            location,
            timeOfTheEvent,
            duration,
            ticketPrice,
            text
        };
      await fetch('api/events/add', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': accessToken,
        },
        body: JSON.stringify(eventData),
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Error");
              }
              return response.text();
          })
            .then((response) => {
                setId(parseInt(response, 10));
                console.log(response);
            })
        for (const f of file) {
            const formData = new FormData();
            formData.append("file", f);

            const type = "image";

            await fetch(`api/media/${type}?id=${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': accessToken,
                },
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error");
                    }
                    return response.text();
                });
        }

    };
    return(
        <div className="dodavanje">
            <h1 className="naslov-dodavanje">Dodaj događanje</h1>
            <form className="add-form">
                <label className="dogadjanja-labele">Naziv događanja:</label>
                <input className="add" type="text"  onChange={(e) => setEventName(e.target.value)} />

                <label className="dogadjanja-labele">Tip događanja:</label>
                <select className="add" onChange={(e) => setTypeOdEvent(e.target.value)}>
                    <option value="" disabled>Odaberite tip događanja</option>
                    <option value="koncert">Koncert</option>
                    <option value="predstava">Predstava</option>
                    <option value="izložba">Izložba</option>
                    <option value="sajam">Sajam</option>
                    <option value="konferencija">Konferencija</option>
                    <option value="skup">Skup</option>
                    <option value="zabava">Zabava</option>
                    <option value="seminar">Seminar</option>
                    <option value="festival">Festival</option>
                    <option value="priredba">Priredba</option>
                    <option value="manifestacija">Manifestacija</option>
                    <option value="ostalo">Ostalo</option>

                </select>

                <label className="dogadjanja-labele">Lokacija:</label>
                <select className="add" onChange={(e) => setLocation(e.target.value)}>
                    <option value="" disabled>Odaberite lokaciju događanja</option>
                    <option value="centar">Centar</option>
                    <option value="tresnjevka">Trešnjevka</option>
                    <option value="maksimir">Maksimir</option>
                    <option value="sesvete">Sesvete</option>
                    <option value="jarun">Jarun</option>
                    <option value="dubrava">Dubrava</option>
                    <option value="trnje">Trnje</option>
                    <option value="novi zagreb">Novi Zagreb</option>
                    <option value="ostalo">Ostalo</option>
                </select>

                <label className="dogadjanja-labele">Vrijeme:</label>
                <input className="add" type="datetime-local" onChange={(e) => setTimeOfTheEvent(e.target.value)} />

                <label className="dogadjanja-labele">Trajanje:</label>
                <input className="add" type="number" onChange={(e) => setDuration(e.target.value)} pattern="[0-9]{2}:[0-9]{2}" title="Unesite u formatu hh:mm" />

                <label className="dogadjanja-labele">Cijena:</label>
                <input className="add" type="number" onChange={(e) => setTicketPrice(e.target.value)} />

                <label className="dogadjanja-labele">Opis:</label>
                <textarea className="add" onChange={(e) => setText(e.target.value)} />

                <label className="dogadjanja-labele">Slike:</label>
                <input type="file" multiple onChange={handleFileChange} />

                <button className="add" type="button" className="dodaj-dogadjanje" onClick={handleAddEvent}>
                    Dodaj
                </button>
            </form>
        </div>
    );
};


export default AddEvent;
