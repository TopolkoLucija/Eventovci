import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/MyAccount.css';


const UserView = () => {

   const navigate = useNavigate();
   const location = useLocation();
   const accessToken = sessionStorage.getItem('accessToken');
   const [message, setMessage] = useState("");

   const [showModalSettings, setShowModalSettings] = useState(false);
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [showModalMessage, setShowModalMessage] = useState(false);

   const closeModalSettings = () => {
      setShowModalSettings(false);
   };

   const closeModalDelete = () => {
      setShowModalDelete(false);
   }

   const closeModalMessage = () => {
      setShowModalMessage(false);
   }

   const Edit = () => {
      var sendButton = document.querySelector(".btn.btn-primary");
      var inputs = document.querySelectorAll(".form-control");
      sendButton.toggleAttribute("hidden");
      // console.log(inputs);
      inputs.forEach((input) => {
         input.toggleAttribute("disabled");
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
               setMessage("Nemoguće izbrisati korisnika!");
            }
            else {
               return response.text();
            }
         })
         .then((response) => {
            //  console.log(response);
            sessionStorage.removeItem("accessToken");
            setMessage("Korisnik obrisan!");
         })
      
      closeModalDelete();
      setTimeout(() => {
         setShowModalMessage(true);
      }, 500)
   }

   return (
      <>
         <button className="btn btn-primary" id="edit-buttons" onClick={Edit}>Uredi profil</button>
         <button className="btn btn-primary" id="edit-buttons" onClick={() => {
            setShowModalSettings(true)
         }
         }>Uredi postavke obavijesti</button>
         <button className="btn btn-primary" id="edit-buttons" onClick={() => {
            setShowModalDelete(true);
         }}>Obriši moj račun</button>


         {/* Modal */}
         {showModalSettings && (
            <div className="background">
               <div className="window">
                  <span className='exit' onClick={closeModalSettings}>&times;</span>
                  <div>Uređivanje postavke obavijesti</div>
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
                  <span className='exit' onClick={closeModalMessage}>&times;</span>
                  <div>{message}</div>
                  <button className='btn btn-primary' onClick={() => {
                     closeModalMessage();
                     navigate('/home');
                     window.location.reload();
                  }}>Zatvori</button>
               </div>
            </div>
         )}
      </>
   );
}

export default UserView;