import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/MyAccount.css';

const OrganizerView = () => {

   const navigate = useNavigate();
   const location = useLocation();

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
               </div>
            </div>
         )}

      </>
   );
}

export default OrganizerView;