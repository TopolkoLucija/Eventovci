import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../styles/MyAccount.css';

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

   const closeModalPayMembership = () => {
      setShowModalPayMembership(false);
   }

   const openModalPayMembership = () => {
      setShowModalPayMembership(true)
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
                        <div className="window">
                           <span className='exit' onClick={closeModalAddEvent}>&times;</span>
                           <div>Unesi podatke o dođagaju</div>
                        </div>
                     </div>
                  )}

                  {/* Modal */}
                  {showModalPayMembership && (
                     <div className="background">
                        <div className="window">
                           <span className='exit' onClick={closeModalPayMembership}>&times;</span>
                           <div>Plati!</div>
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