import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyAccount.css';
import UserView from "./views/UserView";
import OrganizerView from "./views/OrganizerView";
import AdminView from "./views/AdminView";

const MyAccount = () => {
   var accessToken = sessionStorage.getItem("accessToken");

   const navigate = useNavigate();
   const [userData, setUserData] = useState("");

   useEffect(() => {
      if (accessToken !== null) {

         fetch('/api/data', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': accessToken
            }
         })
            .then((response) => {
               if (!response.ok) {
                  console.error('Request failed');
                  navigate('/login');
                  return;
               }
               return response.json();
            })
            .then((data) => {
               setUserData(data);
            })
            .catch((error) => {
               console.error('Error: ' + error);
            });
      }
      else {
         navigate('/login');
      }
   }, [accessToken, navigate]);

   return (
      <>

         {(userData.typeOfUser === "administrator") ? <AdminView myProp={ userData } /> : <></>}
         {(userData.typeOfUser === "organizator") ? <OrganizerView myProp={ userData } /> : <></>}
         {(userData.typeOfUser === "posjetitelj") ? <UserView myProp={ userData } /> : <></>}

      </>
   );
}

export default MyAccount;