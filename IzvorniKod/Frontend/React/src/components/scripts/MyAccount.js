import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyAccount.css';
import UserView from "./views/UserView";
import OrganizerView from "./views/OrganizerView";
import AdminView from "./views/AdminView";

const MyAccount = () => {
  const accessToken = sessionStorage.getItem('accessToken');

  // console.log(accessToken);

  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

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
          <div className="my-account-content">
            <div className='my-account-content-title-and-text'>
              <div className='my-account-content-title'>
                <h1>Pozdrav, {userData.username}!</h1>
                <h4>{userData.typeOfUser}</h4>
              </div>
              <div className='my-account-content-text'>
                <p>Korisničko ime: {userData.username}</p>
                <p>E-mail adresa: {userData.email}</p>
              </div>
            </div>

            {/* TODO - dodati funkcionalnost buttona i uljepšati ih! */}
            <div className="edit-content">
              {(userData.typeOfUser === "administrator") ? <AdminView /> : <></>}
              {(userData.typeOfUser === "organizator") ? <OrganizerView/> : <></>}
              {(userData.typeOfUser === "posjetitelj") ? <UserView /> : <></>}
            </div>

          </div> : ""
      }
    </>
  );
}

export default MyAccount;