import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../styles/MyAccount.css';
import '../../styles/views/AdminView.css'

const AdminView = (props) => {
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
   const [amount, setAmount] = useState("");
   const [filteredUsers, setFilteredUsers] = useState([{}]);

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

   const [showModalShowAll, setShowModalShowAll] = useState(false);
   const [showModalIncreaseMembership, setShowModalIncreaseMembership] = useState(false);
   const [showModalMessage, setShowModalMessage] = useState(false);
   const [showModalValidation, setShowModalValidation] = useState(false);

   const validation = () => {
      setShowModalValidation(true);
   }

   const closeModalShowAll = () => {
      setShowModalShowAll(false);
   };
   const openModalShowAll = () => {
      setShowModalShowAll(true);
   }

   const closeModalIncreaseMembership = () => {
      setShowModalIncreaseMembership(false);
   }
   const openModalIncreaseMembership = () => {
      setShowModalIncreaseMembership(true);
   }

   const closeModalMessage = () => {
      setShowModalMessage(false);
   }
   const openModalMessage = () => {
      setShowModalMessage(true);
   }

   const handleIncreaseMembership = (e) => {
      e.preventDefault();

      const accessToken = sessionStorage.getItem('accessToken');
      const filter = amount;

      console.log(accessToken);
      fetch(`/api/membership/changePrice/${filter}`, {
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
                  type: "membership-price",
                  content: "Nije moguće promijeniti iznos članarine!"
               });
            }
            else {
               setMessage({
                  type: "membership-price",
                  content: "Cijena članarine sada iznosi : " + amount + "€"
               });
            }
         })

      closeModalIncreaseMembership();

      setTimeout(() => {
         openModalMessage();
      }, 500)
      console.log(amount);
   }

   const handleDeleteUser = (e) => {
      const accessToken = sessionStorage.getItem('accessToken');
      var filter = e.target.id;

      fetch(`/api/data/deleteUser/${filter}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            'Authorization': accessToken
         }
      })
         .then((response) => {
            if (!response.ok) {
               setMessage({
                  type: "delete-user",
                  content: "Nije moguće izbrisati korisnika (id: " + filter + ")"
               });
               openModalMessage();
            }
            else {
               setMessage({
                  type: "delete-user",
                  content: "Korisnik (id: " + filter + ") izbrisan!"
               });
               openModalMessage();
               document.getElementById(`${filter}`).remove();
            }
         })
   }

   const handleAllUsers = (filter) => {
      const accessToken = sessionStorage.getItem('accessToken');

      fetch(`/api/data/allUsers/${filter}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            'Authorization': accessToken
         }
      })
         .then((response) => {
            if (!response.ok) {
               setMessage({
                  type: "show-all",
                  content: "Nije moguće prikazati sve korisnike!"
               });
               openModalMessage();
            }
            else {
               openModalShowAll();
               return response.json();
            }
         })
         .then((response) => {
            if (response) {
               setFilteredUsers(response);

               // ako je širina ekrana veća od 768px!!!
               if (window.innerWidth > 768) {
                  if (document.querySelector('.tableRowBody')) {
                     document.querySelector('.tbody').innerHTML = "";
                  }
                  
                  response.forEach((res) => {
                     if (res.typeOfUser === "administrator") {
                        return;
                     }
                     
                     var tableBody = document.querySelector('.tbody');
                     var tableRow = document.createElement('tr');
                     tableRow.className = "tableRowBody";
                     tableRow.id = `${res.userId}`;
                     var tdUserName = document.createElement('td');
                     tdUserName.innerText = res.username;
                     // dodavanje event listenera za navigaciju na detalje organizatora
                     tdUserName.addEventListener("click", () => {
                        if (res.typeOfUser === "organizator") {
                           navigate(`/organizer/${res.userId}`);
                        }
                     });
                     var tdEmail = document.createElement('td');
                     tdEmail.innerText = res.email;
                     var tdTypeOfUser = document.createElement('td');
                     tdTypeOfUser.innerText = `(${res.typeOfUser})`;
                     var tdButtonDelete = document.createElement('td');
                     const buttonDeleteTable = document.createElement('button');
                     buttonDeleteTable.innerHTML = "&times";
                     buttonDeleteTable.classList = "btn btn-primary";
                     buttonDeleteTable.classList = "delete-button";
                     buttonDeleteTable.id = `${res.userId}`;
                     buttonDeleteTable.addEventListener("click", handleDeleteUser);

                     tdButtonDelete.append(buttonDeleteTable);

                     tableRow.append(tdUserName);
                     tableRow.append(tdEmail);
                     tableRow.append(tdTypeOfUser);
                     tableRow.append(tdButtonDelete);

                     tableBody.append(tableRow);

                  })
               }
               else {
                  if (document.querySelector('.user')) {
                     document.querySelector('.allUsers').innerHTML = "";
                  }

                  response.forEach((res) => {
                     var divAllUsers = document.querySelector('.allUsers');
                     const divUser = document.createElement('div');
                     const divUserData = document.createElement('div');
                     const divButtonDelete = document.createElement('div');
                     const spanUserName = document.createElement('span');
                     const spanEmail = document.createElement('span');
                     const spanTypeOfUser = document.createElement('span');
                     const buttonDelete = document.createElement('button');

                     divUserData.append(spanUserName);
                     divUserData.append(spanEmail);
                     divUserData.append(spanTypeOfUser);
                     divButtonDelete.append(buttonDelete);

                     divUser.append(divButtonDelete);
                     divUser.append(divUserData);

                     divAllUsers.append(divUser);

                     spanUserName.innerText = res.username;
                     spanEmail.innerText = res.email;
                     spanTypeOfUser.innerText = `(${res.typeOfUser})`;
                     buttonDelete.innerHTML = "&times";

                     spanUserName.id = "username-span";
                     spanEmail.id = "email-span";
                     spanTypeOfUser.id = "typeOfUser-span";

                     divUser.className = "user";
                     divUser.id = `${res.userId}`;
                     divUserData.className = "div-userData";
                     divButtonDelete.className = "div-buttonDelete";
                     buttonDelete.classList = "btn btn-primary";
                     buttonDelete.classList = "delete-button";
                     buttonDelete.id = `${res.userId}`;

                     // dodavanje event listenera za navigaciju na detalje organizatora
                     spanUserName.addEventListener("click", () => {
                        if (res.typeOfUser === "organizator") {
                           navigate(`/organizer/${res.userId}`);
                        }
                     });

                     buttonDelete.addEventListener("click", handleDeleteUser);
                  });
               }
            }
         })
   }

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

                     <div className="edit-content">
                        <button className="btn btn-primary" id="edit-buttons" onClick={Edit}>Uredi profil</button>
                        <button className="btn btn-primary" id="edit-buttons" onClick={() => {
                           handleAllUsers(0);
                        }}>Pogledaj sve korisnike</button>
                        <button className="btn btn-primary" id='edit-buttons' onClick={() => {
                           openModalIncreaseMembership();
                        }}>Promijeni cijenu članarine</button>
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
                     {showModalShowAll && (
                        <div className="background">
                           <div className="window-show-all">
                              <span className='exit' onClick={closeModalShowAll}>&times;</span>
                              <div>Prikaži sve</div>
                              <div className='option-buttons'>
                                 <button className='btn btn-primary' onClick={() => {
                                    handleAllUsers(0);
                                 }}>Svi</button>
                                 <button className='btn btn-primary' onClick={() => {
                                    handleAllUsers(1);
                                 }}>Posjetitelji</button>
                                 <button className='btn btn-primary' onClick={() => {
                                    handleAllUsers(2);
                                 }}>Organizatori</button>
                              </div>
                              <div className='allUsers'>
                              </div>

                              <div className="container mt-5">
                                 <table className="table">
                                    <thead>
                                       <tr>
                                          <th scope="col">Username</th>
                                          <th scope="col">Email</th>
                                          <th scope="col">Type of user</th>
                                          <th scope="col"></th>
                                       </tr>
                                    </thead>
                                    <tbody className='tbody'></tbody>
                              </table>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Modal */}
                     {showModalIncreaseMembership && (
                        <div className="background">
                           <div className="window">
                              <span className='exit' onClick={closeModalIncreaseMembership}>&times;</span>
                              <div>Unesi iznos:</div>
                              <form>
                                 <input type='text' className='form-control' id='amount' onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (/^\d+$/.test(inputValue) || inputValue === '') {
                                       setAmount(inputValue);
                                    }
                                 }}
                                 />
                                 <button type="submit" className='btn btn-primary' onClick={handleIncreaseMembership}>Promijeni</button>
                              </form>
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

export default AdminView;