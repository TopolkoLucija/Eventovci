import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/MyAccount.css';


const UserView = () => {

   const navigate = useNavigate();
   const location = useLocation();

   const [showModalSettings, setShowModalSettings] = useState(false);
   const [showModalDelete, setShowModalDelete] = useState(false);

   const closeModalSettings = () => {
      setShowModalSettings(false);
   };

   const closeModalDelete = () => {
      setShowModalDelete(false);
   }

   const Edit = () => {
      var sendButton = document.querySelector(".btn.btn-primary");
      var inputs = document.querySelectorAll(".form-control");
      sendButton.toggleAttribute("hidden");
      console.log(inputs);
      inputs.forEach((input) => {
         input.toggleAttribute("disabled");
      })
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
                  <span onClick={closeModalSettings}>&times;</span>
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

export default UserView;