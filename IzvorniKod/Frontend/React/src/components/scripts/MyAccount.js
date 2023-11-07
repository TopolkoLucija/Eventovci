import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyAccount.css';

const MyAccount = () => {
  const accessToken = sessionStorage.getItem('accessToken');

  // console.log(accessToken);

  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken !== null) {
      fetch('/Test/data', {
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
          // console.log(response.json());
          return response.json();
        })
        .then((data) => {
          setUserData(data);
          // console.log(data);
        })
        .catch((error) => {
          console.error('Error: ' + error);
        });
    }
    else {
      navigate('/login');
    }
  }, []);

  return (
    <>
      {
        (accessToken !== null) ? // ako je netko prijavljen onda vrati info o korisniku/organizatoru, inače ništa
          <div className="content">
            <div className='my-account-content'>
              <div className='my-account-content-title'>
                <h1>Bok, {userData.username}!</h1>
              </div>
              <div className='my-account-content-text'>
                <p>Ti si: {userData.typeOfUser}</p>
                <p>Trebaš platiti članarinu? {userData.shouldPayMembership ? "Da" : "Ne"}</p>
                <p>Adresa: {userData.homeAdress}</p>
                {userData.typeOfUser === "administrator" ? <button className='btn btn-primary' id='my-account'>Dodaj korisnika</button> : <></>}
                {userData.typeOfUser === "organizator" ? <button className='btn btn-primary' id='my-account'>Dodaj događaj</button> : <></>}
                {/* {userData.typeOfUser === "posjetitelj" ? <button className='btn btn-primary'></button> : <></>} */}
              </div>
            </div>
          </div> : ""
      }
    </>
  );
}

export default MyAccount;