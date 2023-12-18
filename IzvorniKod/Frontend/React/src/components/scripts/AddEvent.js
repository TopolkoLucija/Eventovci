import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddEvent.css';

const AddEvent = () => {

   var accessToken = sessionStorage.getItem("accessToken");
   const [eventName, setEventName] = useState("");
   const [typeOfEvent, setTypeOfEvent] = useState("");
   const [location, setLocation] = useState("");
   const [timeOfTheEvent, setTimeOfTheEvent] = useState(null);
   const [duration, setDuration] = useState("");
   const [ticketPrice, setTicketPrice] = useState(0);
   const [text, setText] = useState("");
   const [file, setFile] = useState([]);

   const navigate = useNavigate();


   const handleFileChange = (event) => {
    const selectedFile = event.target.files;
    setFile((prevFiles) => [...prevFiles, ...selectedFile]);
  };
  

    const handleAddEvent = async () => {
        if (!eventName.trim() || !typeOfEvent || !location || !timeOfTheEvent || !duration) {
            return;
        }
    

          
        try {
            const eventData = {
                eventName,
                typeOfEvent,
                location,
                timeOfTheEvent,
                duration,
                ticketPrice,
                text
            };
    

            // First Fetch
            const response1 = await fetch('api/events/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },
                body: JSON.stringify(eventData),
            });

            if (!response1.ok) {
                throw new Error("Error");
            }

            const id = parseInt(await response1.text(), 10);
            console.log(id);

            for (const f of file) {
                const formData = new FormData();
                formData.append("file", f);

                const type = f.type.startsWith("image/") ? "image" : "video";

                const response2 = await fetch(`api/media/${type}?id=${id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': accessToken,
                    },
                    body: formData,
                });
                if (!response2.ok) {
                    throw new Error("Error");
                }
                console.log(await response2.text());
            }
            navigate('/my-account');
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="dodavanje">
            <h1 className="naslov-dodavanje">Dodaj događanje</h1>
            
            <form className="add-form">
            <p className="instructions">Obavezno ispuniti sva polja, osim ako su označena kao opcionalna.</p>
                <label className="dogadjanja-labele">Naziv događanja:</label>
                <input className="add"type="text" onChange={(e) => {setEventName(e.target.value)}} />

                <label className="dogadjanja-labele">Tip događanja:</label>
                <select className="add" defaultValue="default" onChange={(e) => setTypeOfEvent(e.target.value)}>
                    <option value="default" disabled>Odaberite tip događanja</option>
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
                <select className="add" defaultValue="default" onChange={(e) => setLocation(e.target.value)}>
                    <option value="default" disabled>Odaberite lokaciju događanja</option>
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
                <input className="add" type="time" value={duration} onChange={(e) => setDuration(e.target.value)} />

                <label className="dogadjanja-labele">Cijena (€):</label>
                <input className="add" type="number" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />

                <label className="dogadjanja-labele">Opis (opcionalno):</label>
                <textarea className="add" onChange={(e) => setText(e.target.value)} />

                <label className="dogadjanja-labele">Slike i videozapisi (opcionalno):</label>
                <input type="file" multiple onChange={handleFileChange} accept="image/*,video/*"/>

                <button className="add dodaj-dogadjanje" type="button" onClick={handleAddEvent}>
                    Dodaj
                </button>
            </form>
        </div>
    );
};


export default AddEvent;
