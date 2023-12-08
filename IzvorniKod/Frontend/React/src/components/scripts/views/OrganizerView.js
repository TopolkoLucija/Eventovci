import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/MyAccount.css';

const OrganizerView = () => {

   const navigate = useNavigate();
   const location = useLocation();
   const accessToken = sessionStorage.getItem('accessToken');

   const Edit = () => {
      var sendButton = document.querySelector(".btn.btn-primary");
      var inputs = document.querySelectorAll(".form-control");
      sendButton.toggleAttribute("hidden");
      console.log(inputs);
      inputs.forEach((input) => {
         input.toggleAttribute("disabled");
      })
   }

   const [showModalAddEvent, setShowModalAddEvent] = useState(false);
   const [showModalDelete, setShowModalDelete] = useState(false);

   const closeModalAddEvent = () => {
      setShowModalAddEvent(false);
   };

   const closeModalDelete = () => {
      setShowModalDelete(false);
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
            console.log(response);
            if (!response.ok) {
               throw new Error("Nemoguće promijeniti podatke");
            }
            else {
               return response.text();
            }
         })
         .then((response) => {
            console.log(response);
            sessionStorage.removeItem("accessToken");
            navigate('/home');
         })
   }

   return (
      <>
         <button className="btn btn-primary" id="edit-buttons" onClick={Edit}>Uredi profil</button>
         <button className="btn btn-primary" id="edit-buttons" onClick={() => {
            // navigate(location.pathname + "/add-events");
            setShowModalAddEvent(true);
         }}>Dodaj događanje</button>
         <button className="btn btn-primary" id="edit-buttons">Plati članarinu</button>
         <button className="btn btn-primary" id="edit-buttons" onClick={() => {
            setShowModalDelete(true);
         }}>Obriši moj račun</button>


         {/* Modal */}
         {showModalAddEvent && (
            <div className="background">
               <div className="window">
                  <span onClick={closeModalAddEvent}>&times;</span>
                  <div>Uređivanje postavke obavijesti</div>
               </div>
            </div>
         )}

         {/* Modal */}
         {showModalDelete && (
            <div className="background">
               <div className="window">
                  <span onClick={closeModalDelete}>&times;</span>
                  <div>Jesi siguran da želiš obrisati račun?</div>
                  <div>
                     <button className="btn btn-primary" id="yes-button" onClick={deleteMyProfile}>Da</button>
                     <button className="btn btn-primary" id="no-button" onClick={closeModalDelete}>Ne</button>
                  </div>
               </div>
            </div>
         )}

      </>
   );
}

export default OrganizerView;