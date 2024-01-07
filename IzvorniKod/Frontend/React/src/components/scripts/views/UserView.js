import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/MyAccount.css';
import '../../styles/views/UserView.css';


const UserView = (props) => {

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

   useEffect(() => {
      setEmail(userData.email);
      setUserName(userData.username);
      setHomeAdress(userData.homeAdress || "");
   }, [userData]);

   const [showModalValidation, setShowModalValidation] = useState(false);
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [showModalPreferences, setShowModalPreferences] = useState(false);
   const [showModalMessage, setShowModalMessage] = useState(false);

   const [selectedLocations, setSelectedLocations] = useState([]);
   const [selectedTypes, setSelectedTypes] = useState([]);

   const validation = () => {
      setShowModalValidation(true);
   }

   const closeModalMessage = () => {
      setShowModalMessage(false);
   }
   const openModalMessage = () => {
      setShowModalMessage(true);
   }

   const closeModalDelete = () => {
      setShowModalDelete(false);
   }
   const openModalDelete = () => {
      setShowModalDelete(true);
   }

   const closeModalPreferences = () => {
      setShowModalPreferences(false);
   }
   const openModalPreferences = () => {
      setShowModalPreferences(true);
   }


   const handleCheckboxChange = (e, selectedArray, setSelectedArray) => {
      const value = e.target.value;
      if (e.target.checked) {
          setSelectedArray([...selectedArray, value]);
      } else {
          setSelectedArray(selectedArray.filter(item => item !== value));
      }
  };
  
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

      userNameInput.value = userData.username;
      emailInput.value = userData.email;

      setUserName(userData.username);
      setEmail(userData.email);
   }

   const handleEdit = (e) => {
      e.preventDefault();
      combineAndSubmitData();
      Edit();
   }

   const combineAndSubmitData = () => {

      accessToken = sessionStorage.getItem("accessToken");

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
               setMessage({
                  type: "change",
                  content: "Pogrešna lozinka"
               });
            }
            else {
               userData.email = email;
               userData.username = username;

               if (userData.typeOfUser === "organizator") {
                  userData.homeAdress = homeAdress;
               }

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
               openModalMessage();
            }, 500)
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

   useEffect(() => {
      fetch('api/subscription', {
        headers: {
          Authorization: accessToken
        }
      })
      .then(response => {
         if (!response.ok) {
           throw new Error('Network response was not ok');
         }
         return response.json();  // Pretvaranje odgovora u JSON format
       })
      .then(subscriptions => {
         if (subscriptions && subscriptions.length > 0) {
            const locations = subscriptions.map(sub => sub.locations).flat(); 
            const types = subscriptions.map(sub => sub.types).flat(); 
            setSelectedLocations(locations);
            setSelectedTypes(types);
            //console.log("Locations:", locations);
            //console.log("Types:", types);
        } else {
            console.warn("No subscriptions received or subscriptions array is empty.");
        }

       })
       .catch(error => {
         console.error('Error fetching subscriptions:', error);
       });
     
   }, []);

   const handleDodajClick = async () => {
      try {
         const response = await fetch('/api/subscription', {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               'Authorization': accessToken
            },
            body: JSON.stringify({
               types: selectedTypes,  
               locations: selectedLocations
            })
         });
   
         if (!response.ok) {
            setMessage({
               type: "error",
               content: "Preference nisu dodane!"
            });
         } else {
            setMessage({
               type: "preferences-added",
               content: "Dodane preference!"
            });
            closeModalPreferences();
         }
      } catch (error) {
         console.error('Error while adding preferences:', error);
         setMessage({
            type: "error",
            content: "Dogodila se pogreška prilikom dodavanja preferencija!"
         });
      }
   };


   return (
      <>
         {
            (accessToken !== null) ? // ako je netko prijavljen onda vrati info o korisniku/organizatoru, inače ništa
               <div className="content">
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

                           <button className="btn btn-primary" onClick={validation} hidden>Spremi</button>
                        </div>
                     </div>
                  </div>

                  {/* TODO - dodati funkcionalnost buttona! */}
                  <div className="edit-content">
                     <button className="btn btn-primary" id="edit-buttons" onClick={Edit}>Uredi profil</button>

                     <button className="btn btn-primary" id="edit-buttons" onClick={() => {
                        openModalPreferences();
                     }
                     }>Uredi postavke obavijesti</button>

                     <button className="btn btn-primary" id="edit-buttons" onClick={() => {
                        openModalDelete();
                     }}>Obriši moj račun</button>
                  </div>


                  {/* Modal */}
                  {showModalPreferences && (
                     <div className="background">
                        <div className="window">
                           <span className='exit' onClick={closeModalPreferences}>&times;</span>
                           <div className="bigger-div">
                           <h3 className="bigger-title">Uredi postavke obavijesti</h3>
                           <div className="preferences-section">
                           <div className="column">
                              <div className='smaller-title'>Lokacija</div>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="centar"
                                       checked={selectedLocations.includes("centar")}
                                       onChange={(e) => handleCheckboxChange(e, selectedLocations, setSelectedLocations)}
                                    />
                                    Centar
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="tresnjevka"
                                       checked={selectedLocations.includes("tresnjevka")}
                                       onChange={(e) => handleCheckboxChange(e, selectedLocations, setSelectedLocations)}
                                    />
                                    Trešnjevka
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="maksimir"
                                       checked={selectedLocations.includes("maksimir")}
                                       onChange={(e) => handleCheckboxChange(e, selectedLocations, setSelectedLocations)}
                                    />
                                    Maksimir
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="sesvete"
                                       checked={selectedLocations.includes("sesvete")}
                                       onChange={(e) => handleCheckboxChange(e, selectedLocations, setSelectedLocations)}
                                    />
                                    Sesvete
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="jarun"
                                       checked={selectedLocations.includes("jarun")}
                                       onChange={(e) => handleCheckboxChange(e, selectedLocations, setSelectedLocations)}
                                    />
                                    Jarun
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="dubrava"
                                       checked={selectedLocations.includes("dubrava")}
                                       onChange={(e) => handleCheckboxChange(e, selectedLocations, setSelectedLocations)}
                                    />
                                    Dubrava
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="trnje"
                                       checked={selectedLocations.includes("trnje")}
                                       onChange={(e) => handleCheckboxChange(e, selectedLocations, setSelectedLocations)}
                                    />
                                    Trnje
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="novi zagreb"
                                       checked={selectedLocations.includes("novi zagreb")}
                                       onChange={(e) => handleCheckboxChange(e, selectedLocations, setSelectedLocations)}
                                    />
                                    Novi Zagreb
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="ostalo"
                                       checked={selectedLocations.includes("ostalo")}
                                       onChange={(e) => handleCheckboxChange(e, selectedLocations, setSelectedLocations)}
                                    />
                                    Ostalo
                              </label>
                           </div>

                           <div className="column">
                              <div className='smaller-title'>Tip</div>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="koncert"
                                       checked={selectedTypes.includes("koncert")}
                                       onChange={(e) => handleCheckboxChange(e, selectedTypes, setSelectedTypes)}
                                    />
                                    Koncert
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="predstava"
                                       checked={selectedTypes.includes("predstava")}
                                       onChange={(e) => handleCheckboxChange(e, selectedTypes, setSelectedTypes)}
                                    />
                                    Predstava
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="izložba"
                                       checked={selectedTypes.includes("izložba")}
                                       onChange={(e) => handleCheckboxChange(e, selectedTypes, setSelectedTypes)}
                                    />
                                    Izložba
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="sajam"
                                       checked={selectedTypes.includes("sajam")}
                                       onChange={(e) => handleCheckboxChange(e, selectedTypes, setSelectedTypes)}
                                    />
                                    Sajam
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="konferencija"
                                       checked={selectedTypes.includes("konferencija")}
                                       onChange={(e) => handleCheckboxChange(e, selectedTypes, setSelectedTypes)}
                                    />
                                    Konferencija
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="skup"
                                       checked={selectedTypes.includes("skup")}
                                       onChange={(e) => handleCheckboxChange(e, selectedTypes, setSelectedTypes)}
                                    />
                                    Skup
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="zabava"
                                       checked={selectedTypes.includes("zabava")}
                                       onChange={(e) => handleCheckboxChange(e, selectedTypes, setSelectedTypes)}
                                    />
                                    Zabava
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="seminar"
                                       checked={selectedTypes.includes("seminar")}
                                       onChange={(e) => handleCheckboxChange(e, selectedTypes, setSelectedTypes)}
                                    />
                                    Seminar
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="festival"
                                       checked={selectedTypes.includes("festival")}
                                       onChange={(e) => handleCheckboxChange(e, selectedTypes, setSelectedTypes)}
                                    />
                                    Festival
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="priredba"
                                       checked={selectedTypes.includes("priredba")}
                                       onChange={(e) => handleCheckboxChange(e, selectedTypes, setSelectedTypes)}
                                    />
                                    Priredba
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="manifestacija"
                                       checked={selectedTypes.includes("manifestacija")}
                                       onChange={(e) => handleCheckboxChange(e, selectedTypes, setSelectedTypes)}
                                    />
                                    Manifestacija
                              </label>
                              <label>
                                    <input
                                       type="checkbox"
                                       value="ostalo"
                                       checked={selectedTypes.includes("ostalo")}
                                       onChange={(e) => handleCheckboxChange(e, selectedTypes, setSelectedTypes)}
                                    />
                                    Ostalo
                              </label>
                           </div>
                           <button className="btn btn-primary btn-add" onClick={handleDodajClick}>Dodaj</button>
                        </div>
                        </div>
                        </div>
                     </div>
                  )}

                              {/* Modal */}
                              {showModalDelete && (
                                 <div className="background">
                                    <div className="window">
                                       <span className='exit' onClick={closeModalDelete}>&times;</span>
                                       <div>Jesi siguran da želiš obrisati račun?</div>
                                       <div className='option-buttons'>
                                          <button className="btn btn-primary" id="yes-button" onClick={deleteMyProfile}>Da</button>
                                          <button className="btn btn-primary" id="no-button" onClick={closeModalDelete}>Ne</button>
                                       </div>
                                    </div>
                                 </div>
                              )}



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
               </div>
               </div> : ""
         }
      </>
   );
}

export default UserView;