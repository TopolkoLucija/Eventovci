import React, { useEffect } from 'react';
import '../styles/Logout.css';
import { useNavigate } from 'react-router-dom';

function Logout() {

   const navigate = useNavigate();

   sessionStorage.removeItem('accessToken');

   useEffect(() => {
      navigate('/home');
      window.location.reload();
   }, [])

   return (
      <></>
   );
}

export default Logout;