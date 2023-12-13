import { useNavigate, useLocation } from 'react-router-dom';
import { format } from "date-fns";
import DatePicker from "react-datepicker";  // Dodajte ovaj import
import { useEffect, useState } from 'react';
import '../../styles/MyAccount.css';
import '../../styles/views/OrganizerView.css';

const OrganizerView = (props) => {

   var accessToken = sessionStorage.getItem("accessToken");
   var userData = props.myProp;

   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [username, setUserName] = useState("");
   const [password, setPassword] = useState("");
   const [homeAdress, setHomeAdress] = useState("");
   const [message, setMessage] = useState({
      type: "",
      content: ""
   });
   const [membershipAmount, setMembershipAmount] = useState("");

   const [creditCardNumber, setCreditCardNumber] = useState("");
   const [creditCardName, setCreditCardName] = useState("");
   const [creditCardExpirationDate, setCreditCardExpirationDate] = useState('');
   const [creditCardCVC, setCreditCardCVC] = useState("");

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

   useEffect(() => {
      setEmail(userData.email);
      setUserName(userData.username);
      setHomeAdress(userData.homeAdress || "");
   }, [userData]);

   const Edit = () => {
      var sendButton = document.querySelector(".btn.btn-primary");
      var inputs = document.querySelectorAll(".form-control");
      sendButton.toggleAttribute("hidden");
      inputs.forEach((input) => {
         input.toggleAttribute("disabled");
      })

      setValues();
   }

   const setValues = () => {
      var userNameInput = document.getElementById('userName');
      var emailInput = document.getElementById('email');
      var addressInput = document.getElementById('address');

      userNameInput.value = userData.username;
      emailInput.value = userData.email;
      addressInput.value = userData.homeAdress;

      setUserName(userData.username);
      setEmail(userData.email);
      setHomeAdress(userData.homeAdress);
   }

   const handleEdit = (e) => {
      e.preventDefault();
      combineAndSubmitData();
      Edit();

   }

   const combineAndSubmitData = () => {

      accessToken = sessionStorage.getItem("accessToken");
      // console.log("session1: " + accessToken);

      setShowModalValidation(false);

      const oldEmail = userData.email;
      const oldUserName = userData.username;


      const user = {
         username,
         email,
         homeAdress,
         password
      };

      fetch('/api/data/change', {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            'Authorization': accessToken
         },
         body: JSON.stringify(user)
      })
         .then((response) => {
            if (!response.ok) {
               setUserName(oldUserName);
               setEmail(oldEmail);
               setMessage("Pogrešna lozinka");
            }
            else {
               userData.email = email;
               userData.username = username;
               userData.homeAdress = homeAdress;

               const podatci = {
                  username: user.username,
                  password: user.password
               };

               fetch("/api/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(podatci),
               })
                  .then((response) => {
                     if (!response.ok) {
                        throw new Error("No user found");
                     }
                     return response.text();
                  })
                  .then((response) => {
                     sessionStorage.setItem("accessToken", response);
                  })
                  .catch((error) => {
                     console.error("Error fetching data: ", error);
                  });

               setMessage({
                  type: "change",
                  content: "Podatci promijenjeni!"
               });
            }

            setTimeout(() => {
               setShowModalMessage(true);
            }, 500)
         })
   }

   const [showModalAddEvent, setShowModalAddEvent] = useState(false);
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [showModalMessage, setShowModalMessage] = useState(false);
   const [showModalPayMembership, setShowModalPayMembership] = useState(false);
   const [showModalValidation, setShowModalValidation] = useState(false);
   const [showModalPayWithCard, setShowModalPayWithCard] = useState(false);
   const [showModalPayWithPayPal, setShowModalPayWithPayPal] = useState(false);
   const [showModalMembershipPayed, setShowModalMembershipPayed] = useState(false);

   const validation = () => {
      setShowModalValidation(true);
   }

   const closeModalAddEvent = () => {
      setShowModalAddEvent(false);
   };
   const openModalAddEvent = () => {
      setShowModalAddEvent(true);
   }

   const closeModalDelete = () => {
      setShowModalDelete(false);
   }
   const openModalDelete = () => {
      setShowModalDelete(true);
   }

   const closeModalMessage = () => {
      setShowModalMessage(false);
   }
   const openModalMessage = () => {
      setShowModalMessage(true);
   }

   const closeModalPayWithPayPal = () => {
      setShowModalPayWithPayPal(false);
   }
   const openModalPayWithPayPal = () => {
      setShowModalPayWithPayPal(true);
   }

   const closeModalPayWithCard = () => {
      setShowModalPayWithCard(false);
   }
   const openModalPayWithCard = () => {
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

   const deleteMyProfile = () => {

      fetch('/api/data/deleteMyProfile', {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            'Authorization': accessToken
         }
      })
         .then((response) => {
            if (!response.ok) {
               setMessage({
                  type: "delete",
                  content: "Nemoguće izbrisati korisnika!"
               });
            }
            else {
               return response.text();
            }
         })
         .then((response) => {
            setMessage({
               type: "delete",
               content: "Korisnik obrisan!"
            });
         })

      closeModalDelete();
      setTimeout(() => {
         openModalMessage();
      }, 500)
   }

   const handlePayMembership = () => {
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
         })
   }

   const [eventName, setEventName] = useState("");
   const [eventType, setEventType] = useState("");
   const [eventLocation, setEventLocation] = useState("");
   const [eventTime, setEventTime] = useState(""); // Dodajte vremenski state
   const [eventDuration, setEventDuration] = useState("");
   const [eventPrice, setEventPrice] = useState("");
   const [eventDescription, setEventDescription] = useState("");
   const [eventImages, setEventImages] = useState([]);  // state za praćenje slika
   const [eventVideos, setEventVideos] = useState([]);  // state za praćenje videozapisa



   const handleEventNameChange = (e) => {
      setEventName(e.target.value);
   };

   const handleEventTypeChange = (e) => {
      setEventType(e.target.value);
   };

   const handleEventLocationChange = (e) => {
      setEventLocation(e.target.value);
   };

   const handleEventTimeChange = (e) => {
      setEventTime(e.target.value);
   };

   const handleEventDurationChange = (e) => {
      setEventDuration(e.target.value);
   };

   const handleEventPriceChange = (e) => {
      setEventPrice(e.target.value);
   };

   const handleEventDescriptionChange = (e) => {
      setEventDescription(e.target.value);
   };

   const handleEventImagesChange = (e) => {
      const files = e.target.files;
      setEventImages((prevImages) => [...prevImages, ...files]);
   };

   const handleEventVideosChange = (e) => {
      const files = e.target.files;
      setEventVideos((prevVideos) => [...prevVideos, ...files]);
   };


   const handleEventSubmit = () => {
      console.log("Naziv događanja:", eventName);
      console.log("Vrsta događanja:", eventType);
      console.log("Lokacija događanja:", eventLocation);
      console.log("Vrijeme događanja:", eventTime);
      console.log("Trajanje događanja:", eventDuration);
      console.log("Cijena događanja:", eventPrice);
      console.log("Opis događanja:", eventDescription);


   };


   return (
      <>
         {
            (accessToken !== null) ? // ako je netko prijavljen onda vrati info o korisniku/organizatoru, inače ništa
               <div className="my-account-content">
                  <div className='my-account-content-title-and-text'>
                     <div className='my-account-content-title'>
                        <h1>Pozdrav, {userData.username}!</h1>
                        <h4>{userData.typeOfUser}</h4>
                     </div>
                     <div className='my-account-content-text'>
                        <div className='form'>
                           <div className="form-group">
                              <label htmlFor="userName">Korisničko ime:</label>
                              <input type="text" className="form-control" id="userName" value={username} onChange={(e) => { setUserName(e.target.value) }} disabled></input>
                           </div>

                           <div className="form-group">
                              <label htmlFor="email">E-mail adresa:</label>
                              <input type="email" className="form-control" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} disabled></input>
                           </div>

                           <div className="form-group">
                              <label htmlFor="address">Adresa:</label>
                              <input type="text" className="form-control" id="address" value={homeAdress} onChange={(e) => { setHomeAdress(e.target.value) }} disabled></input>
                           </div>

                           <button className="btn btn-primary" onClick={validation} hidden>Spremi</button>
                        </div>
                     </div>
                  </div>

                  {/* TODO - dodati funkcionalnost buttona! */}
                  <div className="edit-content">
                     <button className="btn btn-primary" id="edit-buttons" onClick={Edit}>Uredi profil</button>
                     <button className="btn btn-primary" id="edit-buttons" onClick={openModalAddEvent}>Dodaj događanje</button>
                     <button className="btn btn-primary" id="edit-buttons" onClick={openModalPayMembership}>Plati članarinu</button>
                     <button className="btn btn-primary" id="edit-buttons" onClick={openModalDelete}>Obriši moj račun</button>
                  </div>

                  {/* Modal */}
                  {showModalValidation && (
                     <div className="background">
                        <div className="window">
                           <div>Unesi lozinku</div>
                           <label htmlFor='password'>Lozinka:</label>
                           <input type='password' className='form-control' id='password' onChange={(e) => { setPassword(e.target.value); }}></input>
                           <button type="submit" className='btn btn-primary' onClick={handleEdit}>Provjeri</button>
                        </div>
                     </div>
                  )}

                  {/* Modal */}
                  {showModalAddEvent && (
                  <div className="background">
                     <div className="window-event">
                        <span className='exit' onClick={closeModalAddEvent}>&times;</span>
                        <div>Upištite podatke o događanju koje želite dodati:</div>
                        <div>Naziv:</div>
                        <input
                           type="text"
                           className="form-control"
                           value={eventName}
                           onChange={handleEventNameChange}
                        />
                        <div>Tip:</div>
                        <select
                           className="form-control"
                           value={eventType}
                           onChange={handleEventTypeChange}
                        >
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
                        <div>Lokacija:</div>
                        <select
                           className="form-control"
                           value={eventLocation}
                           onChange={handleEventLocationChange}
                        >
                           <option value="" disabled>Odaberite lokaciju događanja</option>
                           <option value="gornji grad">Gornji grad</option>
                           <option value="donji grad">Donji grad</option>
                           <option value="trnje">Trnje</option>
                           <option value="novi zagreb">Novi Zagreb</option>
                           <option value="ostalo">Ostalo</option>
                        </select>
                        <div>Vrijeme:</div>
                           <input
                           type="text"
                           className="form-control"
                           value={eventTime}
                           onChange={handleEventTimeChange}   
                           /> 
                           <small className="small-text">Unesite datum i vrijeme u formatu: dd. MM. yyyy HH:mm</small>
                        <div>Trajanje:</div>
                        <input
                           type="text"
                           className="form-control"
                           value={eventDuration}
                           onChange={handleEventDurationChange}                        
                        />
                        <div>Cijena:</div>
                        <input
                           type="text"
                           className="form-control"
                           value={eventPrice}
                           onChange={handleEventPriceChange}                        
                        />
                        <div>Opis:</div>
                        <input
                           type="text"
                           className="form-control"
                           value={eventDescription}
                           onChange={handleEventDescriptionChange}                        
                        />
                        <div>
                        <div className="form-group">
                           <label htmlFor="eventImages">Slike događaja:</label>
                           <input
                              type="file"
                              className="form-control"
                              id="eventImages"
                              onChange={handleEventImagesChange}
                              multiple
                           />
                        </div>
                        <div className="form-group">
                           <label htmlFor="eventVideos">Videozapisi događaja:</label>
                           <input
                              type="file"
                              className="form-control"
                              id="eventVideos"
                              onChange={handleEventVideosChange}
                              multiple
                           />
                        </div>
                           <button type="submit" className='btn btn-primary' onClick={handleEventSubmit}>Dodaj</button>
                        </div>
                     </div>
                  </div>
               )}


                  {/* Modal */}
                  {showModalPayMembership && (
                     <div className="background">
                        <div className="window">
                           <span className='exit' onClick={closeModalPayMembership}>&times;</span>
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

                  {/* Modal */}
                  {showModalDelete && (
                     <div className="background">
                        <div className="window">
                           <span className='exit' onClick={closeModalDelete}>&times;</span>
                           <div>Jesi siguran da želiš obrisati račun?</div>
                           <div>
                              <button className="btn btn-primary" id="yes-button" onClick={deleteMyProfile}>Da</button>
                              <button className="btn btn-primary" id="no-button" onClick={closeModalDelete}>Ne</button>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Modal */}
                  {showModalMessage && (
                     <div className="background">
                        <div className="window">
                           <div>{message.content}</div>
                           <button className='btn btn-primary' onClick={() => {
                              closeModalMessage();

                              if (message.type === "delete") {
                                 sessionStorage.removeItem("accessToken");
                                 navigate('/home');
                              }
                              window.location.reload();
                           }}>Zatvori</button>
                        </div>
                     </div>
                  )}

               </div> : ""
         }

      </>
   );
}

export default OrganizerView;