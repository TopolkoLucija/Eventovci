import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/MyAccount.css';
import '../../styles/views/AdminView.css'

const AdminView = () => {

   const navigate = useNavigate();
   const location = useLocation();
   const [amount, setAmount] = useState("");
   const [message, setMessage] = useState("");

   const Edit = () => {
      var sendButton = document.querySelector(".btn.btn-primary");
      var inputs = document.querySelectorAll(".form-control");
      sendButton.toggleAttribute("hidden");
      inputs.forEach((input) => {
         input.toggleAttribute("disabled");
      })
   }

   const [showModalShowAll, setShowModalShowAll] = useState(false);
   const [showModalIncreaseMembership, setShowModalIncreaseMembership] = useState(false);
   const [showModalMessage, setShowModalMessage] = useState(false);

   const closeModalShowAll = () => {
      setShowModalShowAll(false);
   };

   const closeModalIncreaseMembership = () => {
      setShowModalIncreaseMembership(false);
   }

   const closeModalMessage = () => {
      setShowModalMessage(false);
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
               setMessage("Nije moguće promijeniti iznos članarine!");
            }
            else {
               setMessage("Cijena članarine sada iznosi : " + amount + "€");
            }
         })

      closeModalIncreaseMembership();

      setTimeout(() => {
         setShowModalMessage(true);
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
               setMessage("Nije moguće izbrisati korisnika (id: " + filter + ")");
               setShowModalMessage(true);
            }
            else {
               setMessage("Korisnik (id: " + filter + ") izbrisan!");
               setShowModalMessage(true);
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
               setMessage("Nije moguće prikazati sve korisnike!");
               setShowModalMessage(true);
            }
            else {
               setShowModalShowAll(true);
               return response.json();
            }
         })
         .then((response) => {
            if (response) {
               if (document.querySelector('.user')) {
                  document.querySelector('.allUsers').innerHTML = "";
               }
               response.forEach((res) => {

                  if (res.typeOfUser === "administrator") {
                     return;
                  }

                  var divAllUsers = document.querySelector('.allUsers');
                  const divUser = document.createElement('div');
                  const spanUserName = document.createElement('span');
                  const spanEmail = document.createElement('span');
                  const spanTypeOfUser = document.createElement('span');
                  const buttonDelete = document.createElement('button');

                  divUser.append(spanUserName);
                  divUser.append(spanEmail);
                  divUser.append(spanTypeOfUser);
                  divUser.append(buttonDelete);

                  divAllUsers.append(divUser);

                  spanUserName.innerText = res.username;
                  spanEmail.innerText = res.email;
                  spanTypeOfUser.innerText = res.typeOfUser;
                  buttonDelete.innerHTML = "&times";

                  divUser.className = "user";
                  divUser.id = `${res.userId}`;
                  buttonDelete.classList = "btn btn-primary";
                  buttonDelete.classList = "delete-button";
                  buttonDelete.id = `${res.userId}`;

                  buttonDelete.addEventListener("click", handleDeleteUser);

               })
            }
         })
   }

   return (
      <>
         <button className="btn btn-primary" id="edit-buttons" onClick={Edit}>Uredi profil</button>
         <button className="btn btn-primary" id="edit-buttons" onClick={() => {
            // navigate(location.pathname + "/show-all");
            handleAllUsers(0);
         }}>Pogledaj sve korisnike</button>
         <button className="btn btn-primary" id='edit-buttons' onClick={() => {
            setShowModalIncreaseMembership(true);
         }}>Promijeni cijenu članarinu</button>

         {/* Modal */}
         {showModalShowAll && (
            <div className="background">
               <div className="window-show-all">
                  <span className='exit' onClick={closeModalShowAll}>&times;</span>
                  <div>Prikaži sve</div>
                  <div>
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
                  <div className='allUsers'></div>
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
                     <input type='text' className='form-control' id='amount' onChange={(e) => { setAmount(e.target.value); }}></input>
                     <button type="submit" className='btn btn-primary' onClick={handleIncreaseMembership}>Promijeni</button>
                  </form>
               </div>
            </div>
         )}

         {/* Modal */}
         {showModalMessage && (
            <div className="background">
               <div className="window">
                  <span className='exit' onClick={closeModalMessage}>&times;</span>
                  <div>{message}</div>
                  <button className='btn btn-primary' onClick={closeModalMessage}>Zatvori</button>
               </div>
            </div>
         )}
      </>
   );
}

export default AdminView;