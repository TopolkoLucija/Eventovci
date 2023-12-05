import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/MyAccount.css';

const AdminView = () => {

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

   const [showModalShowAll, setShowModalShowAll] = useState(false);

   const closeModalShowAll = () => {
      setShowModalShowAll(false);

   };

   return (
      <>
         <button className="btn btn-primary" id="edit-buttons" onClick={Edit}>Uredi profil</button>
         <button className="btn btn-primary" id="edit-buttons" onClick={() => {
            // navigate(location.pathname + "/show-all");
            setShowModalShowAll(true);
         }}>Pogledaj sve korisnike</button>

         {/* Modal */}
         {showModalShowAll && (
            <div className="background">
               <div className="window">
                  <span onClick={closeModalShowAll}>&times;</span>
                  <div>Prikaži sve</div>
               </div>
            </div>
         )}
      </>
   );
}

export default AdminView;