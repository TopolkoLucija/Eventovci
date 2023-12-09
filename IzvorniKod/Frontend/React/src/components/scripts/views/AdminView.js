import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/MyAccount.css';
import { FormText } from 'react-bootstrap';

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
               setMessage("Nemoguće promijeniti iznos članarine");
            }
            else {
               setMessage("Promijenjen iznos članarine na: " + amount + "€");
            }
         })

      closeModalIncreaseMembership();

      setTimeout(() => {
         setShowModalMessage(true);
      }, 500)
      console.log(amount);
   }

   return (
      <>
         <button className="btn btn-primary" id="edit-buttons" onClick={Edit}>Uredi profil</button>
         <button className="btn btn-primary" id="edit-buttons" onClick={() => {
            // navigate(location.pathname + "/show-all");
            setShowModalShowAll(true);
         }}>Pogledaj sve korisnike</button>
         <button className="btn btn-primary" id='edit-buttons' onClick={() => {
            setShowModalIncreaseMembership(true);
         }}>Povećaj članarinu</button>

         {/* Modal */}
         {showModalShowAll && (
            <div className="background">
               <div className="window">
                  <span onClick={closeModalShowAll}>&times;</span>
                  <div>Prikaži sve</div>
               </div>
            </div>
         )}

         {/* Modal */}
         {showModalIncreaseMembership && (
            <div className="background">
               <div className="window">
                  <span onClick={closeModalIncreaseMembership}>&times;</span>
                  <div>Unesi iznos:</div>
                  <form>
                     <input type='text' className='form-control' id='amount' onChange={(e) => { setAmount(e.target.value); }}></input>
                     <button type="submit" className='btn btn-primary' onClick={handleIncreaseMembership}>Povećaj</button>
                  </form>
               </div>
            </div>
         )}

         {/* Modal */}
         {showModalMessage && (
            <div className="background">
               <div className="window">
                  <span onClick={closeModalMessage}>&times;</span>
                  <div>{message}</div>
                  <button className='btn btn-primary' onClick={closeModalMessage}>Zatvori</button>
               </div>
            </div>
         )}
      </>
   );
}

export default AdminView;