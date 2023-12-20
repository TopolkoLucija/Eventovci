
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddEvent.css';
import '../styles/views/OrganizerView.css';
import '../styles/MyAccount.css';

const AddEvent = ({ getType }) => {

   var accessToken = sessionStorage.getItem("accessToken");
   const [eventName, setEventName] = useState("");
   const [typeOfEvent, setTypeOfEvent] = useState("");
   const [location, setLocation] = useState("");
   const [timeOfTheEvent, setTimeOfTheEvent] = useState(null);
   const [duration, setDuration] = useState("");
   const [ticketPrice, setTicketPrice] = useState("");
   const [text, setText] = useState("");
   const [file, setFile] = useState([]);

   const navigate = useNavigate();

   const [message, setMessage] = useState({
    type: "",
    content: ""
 });
 const [membershipAmount, setMembershipAmount] = useState("");
 const [errorInput, setErrorInput] = useState("");

 const [creditCardNumber, setCreditCardNumber] = useState("");
 const [creditCardName, setCreditCardName] = useState("");
 const [creditCardExpirationDate, setCreditCardExpirationDate] = useState('');
 const [creditCardCVC, setCreditCardCVC] = useState("");
 const [PayPalEmail, setPayPalEmail] = useState("");
 const [PayPalPassword, setPayPalPassword] = useState("");

 const validatePassword = () => {
    const inputPayPalPassword = document.getElementById('PayPalPassword');
    
    if (inputPayPalPassword.value === "") {
       setErrorInput("Upišite sve podatke!");
       return false;
    }
    else {
       setErrorInput("");
       return true;
    }
 }

 const validatePayPalEmail = () => {
    const inputPayPayEmail = document.getElementById('PayPalEmail');
    if (!inputPayPayEmail.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
       inputPayPayEmail.style.borderColor = "red";
       return false;
    }
    else {
       inputPayPayEmail.style.borderColor = "green";
       return true;
    }
 }

 const handleCardCVCInput = (event) => {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/\D/g, '');
    setCreditCardCVC(inputValue);
 }

 const handleExpirationDateInput = (event) => {
    let inputValue = event.target.value;

    // Uklonite sve karaktere osim brojeva
    inputValue = inputValue.replace(/\D/g, '');

    // Formatirajte brojeve kao MM/YY
    if (inputValue.length <= 4) {
       let formattedValue = '';
       for (let i = 0; i < inputValue.length; i++) {
          if (i === 2 && inputValue.length > 2) {
             formattedValue += '/'; // Dodajte kosu crtu između MM i YY
          }
          formattedValue += inputValue[i];
       }

       // Postavite formatirani datum u stanje
       setCreditCardExpirationDate(formattedValue);
    }
 };

 const handleCardNumberInput = (event) => {
    let inputValue = event.target.value;

    // Uklonite sve karaktere osim brojeva
    inputValue = inputValue.replace(/\D/g, '');

    // Formatirajte brojeve dok se unose
    let formattedValue = '';
    for (let i = 0; i < inputValue.length; i++) {
       if (i > 0 && i % 4 === 0) {
          formattedValue += ' '; // Dodajte razmak nakon svake grupe od 4 broja
       }
       formattedValue += inputValue[i];
    }

    // Postavite formatirani broj u stanje
    setCreditCardNumber(formattedValue);
 };

   //dio koda vezan za plaćanje članarine

    const [showModalPayMembership, setShowModalPayMembership] = useState(false);
    const [showModalPayWithCard, setShowModalPayWithCard] = useState(false);
    const [showModalPayWithPayPal, setShowModalPayWithPayPal] = useState(false);
    const [showModalMembershipPayed, setShowModalMembershipPayed] = useState(false);

 const closeModalPayWithPayPal = () => {
    setShowModalPayWithPayPal(false);
 }
 const openModalPayWithPayPal = () => {
    setPayPalEmail("");
    setPayPalPassword("");
    setErrorInput("");
    setShowModalPayWithPayPal(true);
 }

 const closeModalPayWithCard = () => {
    setShowModalPayWithCard(false);
 }
 const openModalPayWithCard = () => {
    setCreditCardNumber("");
    setCreditCardName("");
    setCreditCardExpirationDate("");
    setCreditCardCVC("");
    setShowModalPayWithCard(true);
 }

 const closeModalMembershipPayed = () => {
    setShowModalMembershipPayed(false);
 }

 const openModalMembershipPayed = () => {
    setShowModalMembershipPayed(true);
 }

 const closeModalPayMembership = () => {
    setShowModalPayMembership(false);
 }
 const openModalPayMembership = () => {
    setShowModalPayMembership(true);
    handleGetMembershipPrice();
 }
 const handleGetMembershipPrice = () => {
    fetch('/api/membership/price', {
       method: "GET",
       headers: {
          "Content-Type": "application/json",
          'Authorization': accessToken
       }
    })
       .then((response) => {
          if (!response.ok) {
             setMessage({
                type: "error",
                content: "Nije moguće dohvatiti iznos članarine!"
             })
          }
          else {
             return response.json();
          }
       })
       .then((response) => {
          if (response) {
             setMembershipAmount(response);
             setMessage({
                type: "get-price",
                content: "Cijena članarine: " + response + " €"
             })
          }
       })
 }


   const validateName = () => {
    const nameErr = document.getElementById("name-error");
    const sifra = document.getElementById("nameField");
    if (sifra.value.trim() === "") {
      sifra.style.borderColor = "red";
      nameErr.innerText = "Unesite naziv događanja";
      nameErr.style.color = "red";
    } else {
      sifra.style.borderColor = "green";
      nameErr.innerText = "";
      nameErr.style.color = "green";
    }
  };

  const validateType = () => {
    const nameErr = document.getElementById("type-error");
    const sifra = document.getElementById("typeField");
    if (sifra.value === "default") {
      sifra.style.borderColor = "red";
      nameErr.innerText = "Unesite tip događanja";
      nameErr.style.color = "red";
    } else {
      sifra.style.borderColor = "green";
      nameErr.innerText = "";
      nameErr.style.color = "green";
    }
  };

  const validateLocation = () => {
    const nameErr = document.getElementById("location-error");
    const sifra = document.getElementById("locationField");
    if (sifra.value === "default") {
      sifra.style.borderColor = "red";
      nameErr.innerText = "Unesite lokaciju događanja";
      nameErr.style.color = "red";
    } else {
      sifra.style.borderColor = "green";
      nameErr.innerText = "";
      nameErr.style.color = "green";
    }
  };

    const validateTime = () => {
        const nameErr = document.getElementById("time-error");
        const timeField = document.getElementById("timeField");

        if (!timeField.value) {
            timeField.style.borderColor = "red";
            nameErr.innerText = "Unesite vrijeme događanja";
            nameErr.style.color = "red";
        } else {
            const selectedTime = new Date(timeField.value);
            const currentTime = new Date();

            if (selectedTime <= currentTime) {
                timeField.style.borderColor = "red";
                nameErr.innerText = "Možete dodati samo događanje koje još nije počelo!";
                nameErr.style.color = "red";
            } else {
                timeField.style.borderColor = "green";
                nameErr.innerText = "";
                nameErr.style.color = "green";
            }
        }
    };


  const validateDuration = () => {
    const nameErr = document.getElementById("duration-error");
    const sifra = document.getElementById("durationField");
    if (sifra.value === "") {
      sifra.style.borderColor = "red";
      nameErr.innerText = "Unesite trajanje događanja";
      nameErr.style.color = "red";
    } else {
      sifra.style.borderColor = "green";
      nameErr.innerText = "";
      nameErr.style.color = "green";
    }
  };

  const validatePrice = () => {
    const nameErr = document.getElementById("price-error");
    const sifra = document.getElementById("priceField");
    if (sifra.value === "") {
      sifra.style.borderColor = "red";
      nameErr.innerText = "Unesite cijenu događanja";
      nameErr.style.color = "red";
    } else {
      sifra.style.borderColor = "green";
      nameErr.innerText = "";
      nameErr.style.color = "green";
    }
  };


   const handleFileChange = (event) => {
    const selectedFile = event.target.files;
    setFile((prevFiles) => [...prevFiles, ...selectedFile]);
  };

  const handlePriceChange = (e) => { 
    const inputPrice = e.target.value; 
    const regex = /^\d*\.?\d{0,2}$/; 
    if (regex.test(inputPrice) || inputPrice === '') {
         setTicketPrice(inputPrice); 
        } 
    };

    const handlePayMembership = () => {

        // ako plaćam PayPalom onda se mora provjeriti Email i Password
  
        if (!validatePayPalEmail()) {
           setErrorInput("Unesite točan format email adrese!");
           return;
        }
        if (!validatePassword()) {
           return;
        }
  
        fetch('/api/membership', {
           method: "POST",
           headers: {
              "Content-Type": "application/json",
              'Authorization': accessToken
           }
        })
           .then((response) => {
              console.log(response);
              if (!response.ok) {
                 setMessage({
                    type: "error",
                    content: "Transakcija nije provedena!"
                 })
              }
              else {
                 setMessage({
                    type: "membership-payed",
                    content: "Članarina plaćena!"
                 })
              }
              openModalMembershipPayed();
              closeModalPayWithCard();
              closeModalPayWithPayPal();
           })
     }
  

    const handleAddEvent = async () => {
        validateName();
        validateType();
        validateLocation();
        validateDuration();
        validatePrice();
    

        if (!eventName.trim() || !typeOfEvent || !location || !timeOfTheEvent || !duration || ticketPrice < 0) {
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
                if (response1.status === 401) {
                    //window.alert("Plati članarinu!");
                    openModalPayMembership();
            }
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
            getType(true, "Događanje uspješno dodano!", "success");

        } catch (error) {
            console.error(error);
        }
    };


    return(
        <div className="dodavanje">
            <h1 className="naslov-dodavanje">Dodaj događanje</h1>

            <form className="add-form">
            <p className="instructions">Obavezno ispuniti sva polja, osim ako su označena kao opcionalna.</p>
                <label htmlFor="nameField" className="dogadjanja-labele">Naziv događanja:</label>
                <input id="nameField" className="add" type="text" 
                onChange={(e) => {
                    setEventName(e.target.value); 
                    validateName();
                    }} 
                    />
                <div id="name-error" className="form-text"></div>

                <label htmlFor="typeField" className="dogadjanja-labele">Tip događanja:</label>
                <select id="typeField" className="add" defaultValue="default" onChange={(e) => {setTypeOfEvent(e.target.value); validateType();}}>
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
                <div id="type-error" className="form-text"></div>

                <label className="dogadjanja-labele" htmlFor="locationField">Lokacija:</label>
                <select id="locationField" className="add" defaultValue="default" onChange={(e) => {setLocation(e.target.value); validateLocation();}}>
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
                <div id="location-error" className="form-text"></div>

                <label className="dogadjanja-labele" htmlFor="timeField">Vrijeme:</label>
                <input id="timeField" className="add" type="datetime-local" onChange={(e) => {setTimeOfTheEvent(e.target.value); validateTime();}} />
                <div id="time-error" className="form-text"></div>

                <label className="dogadjanja-labele" htmlFor="durationField">Trajanje:</label>
                <input id="durationField" className="add" type="time" value={duration} onChange={(e) => {setDuration(e.target.value); validateDuration();}} />
                <div id="duration-error" className="form-text"></div>

                <label className="dogadjanja-labele" htmlFor="priceField">Cijena (€):</label>
                <input id="priceField" className="add" type="number" step="0.01" value={ticketPrice} 
                onChange={(e) => {
                    handlePriceChange(e);
                    validatePrice();
                }}/>
                <div id="price-error" className="form-text"></div>

                <label className="dogadjanja-labele">Opis (opcionalno):</label>
                <textarea className="add" onChange={(e) => setText(e.target.value)} />

                <label className="dogadjanja-labele">Slike i videozapisi (opcionalno):</label>
                <input type="file" multiple onChange={handleFileChange} accept="image/*,video/*"/>
                {file.length > 0 && ( <div> Odabrane datoteke: <ul> {Array.from(file).map((file, index) => ( <li key={index}>{file.name}</li> ))} </ul> </div> )}

                <button className="add dodaj-dogadjanje" type="button" onClick={handleAddEvent}>
                    Dodaj
                </button>
            </form>

            {/* Modal */}
            {showModalPayMembership && (
                     <div className="background">
                        <div className="window">
                           <span className='exit' onClick={closeModalPayMembership}>&times;</span>
                           <div>Molimo platite članarinu da biste dodali događanje!</div>
                           <div>{message.content}</div>
                           {message.type !== "error" ?
                              <>
                                 <div>Odaberi način plaćanja:</div>
                                 <div>
                                    <button className='btn btn-primary' onClick={openModalPayWithCard}>Karticom</button>
                                    <button className='btn btn-primary' onClick={openModalPayWithPayPal}>PayPalom</button>
                                 </div>
                              </> : <></>}
                        </div>
                     </div>
                  )}

                  {/* Modal */}
                  {showModalPayWithCard && (
                     <div className="background">
                        <div className="window-payment">
                           <span className='exit' onClick={closeModalPayWithCard}>&times;</span>
                           <div>Iznos: {membershipAmount} €</div>
                           <div>Unesi podatke o kartici:</div>
                           <div className='form-group'>
                              <label htmlFor='cardNumber'>Broj kreditne kartice:</label>
                              <input
                                 type='text'
                                 className='form-control'
                                 id='cardNumber'
                                 value={creditCardNumber}
                                 onChange={handleCardNumberInput}
                                 placeholder='0000 0000 0000 0000'
                                 maxLength={19}
                              />
                           </div>
                           <div className='form-group'>
                              <label htmlFor='cardName'>Ime nositelja kartice:</label>
                              <input type='text'
                                 className='form-control'
                                 id='cardName'
                                 value={creditCardName}
                                 placeholder='Pero Perić'
                                 onChange={(e) => { setCreditCardName(e.target.value) }} />
                           </div>
                           <div className='form-group'>
                              <label htmlFor='cardExpirationDate'>Datum isteka:</label>
                              <input
                                 type="text"
                                 className='form-control'
                                 id='cardExpirationDate'
                                 value={creditCardExpirationDate}
                                 onChange={handleExpirationDateInput}
                                 placeholder="MM/YY"
                                 maxLength={5}
                              />
                           </div>
                           <div className='form-group'>
                              <label htmlFor='cardCVC'>CVC:</label>
                              <input type='text'
                                 className='form-control'
                                 id='cardCVC'
                                 value={creditCardCVC}
                                 placeholder='000'
                                 onChange={handleCardCVCInput}
                                 maxLength={3}
                              />
                           </div>

                           <button type='submit' className='btn btn-primary' onClick={handlePayMembership}>Plati</button>

                        </div>
                     </div>
                  )}

                  {/* Modal */}
                  {showModalPayWithPayPal && (
                     <div className="background">
                        <div className="window-payment">
                           <span className='exit' onClick={closeModalPayWithPayPal}>&times;</span>
                           <div>Unesi podatke o PayPalu:</div>
                           <div className='error-input'>{ errorInput }</div>
                           <div className='form-group'>
                              <label htmlFor='PayPalEmail'>Email:</label>
                              <input
                                 type="email"
                                 className="form-control"
                                 id="PayPalEmail"
                                 value={PayPalEmail}
                                 onChange={(e) => {
                                    setErrorInput("");
                                    setPayPalEmail(e.target.value);
                                    validatePayPalEmail();
                                 }}
                              />
                              <label htmlFor='PayPalPassword'>Password:</label>
                              <input
                                 type='password'
                                 className='form-control'
                                 id='PayPalPassword'
                                 value={PayPalPassword}
                                 onChange={(e) => {
                                    setErrorInput("");
                                    setPayPalPassword(e.target.value);
                                 }}></input>
                           </div>
                           <button type='submit' className='btn btn-primary' onClick={handlePayMembership}>Plati</button>
                        </div>
                     </div>
                  )}

                  {/* Modal */}
                  {showModalMembershipPayed && (
                     <div className="background">
                        <div className="window-payment">
                           <div>{message.content}</div>
                           {message.type !== "error" ?
                              <div>
                                 <button className='btn btn-primary' onClick={() => {
                                    closeModalMembershipPayed();
                                    setMessage({
                                       type: "",
                                       content: ""
                                    })
                                    closeModalPayMembership();
                                 }}>Zatvori</button>
                              </div> :
                              <div>
                                 <button className='btn btn-primary' onClick={() => {
                                    closeModalMembershipPayed();
                                    setMessage({
                                       type: "get-price",
                                       content: "Cijena članarine: " + membershipAmount + " €"
                                    })
                                 }}>Pokušaj ponovno</button>
                                 <button className='btn btn-primary' onClick={() => {
                                    closeModalMembershipPayed();
                                    setMessage({
                                       type: "",
                                       content: ""
                                    })
                                    closeModalPayMembership();
                                 }}>Odustani</button>
                              </div>}
                        </div>
                     </div>
                  )}
             

                  
        </div>
    );
};

export default AddEvent;
