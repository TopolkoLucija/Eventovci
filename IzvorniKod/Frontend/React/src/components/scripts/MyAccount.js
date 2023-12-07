import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyAccount.css';
import UserView from "./views/UserView";
import OrganizerView from "./views/OrganizerView";
import AdminView from "./views/AdminView";

const MyAccount = () => {
  const accessToken = sessionStorage.getItem('accessToken');

  // console.log(accessToken);

  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [homeAdress, setHomeAdress] = useState("");

  // console.log(userData);

  useEffect(() => {
    if (accessToken !== null) {

      console.log(accessToken === sessionStorage.getItem('accessToken'));

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
          setUserName(data.username);
          setEmail(data.email);
          setHomeAdress(data.homeAdress);
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


  const handleEdit = (e) => {
    // e.preventDefault();
    // console.log("handle edit")

    userData.email = email;
    userData.username = username;

    if (userData.typeOfUser === "organizator") {
      userData.homeAdress = homeAdress;
    }

    setUserData(userData);
    // console.log(userData);

    fetch('/api/data/change', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': accessToken
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Nemoguće promijeniti podatke");
        }
        else {
          return response.text();
        }
      })
      
      // Možda nepotreban ovaj blok?
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("accessToken", response);
      })
      .catch((error) => {
        console.error('Error: ' + error);
      });
  }

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
                <form>
                  <div className="form-group">
                    <label htmlFor="korisnicko-ime">Korisničko ime:</label>
                    <input type="text" className="form-control" id="korisnicko-ime" value={username} onChange={(e) => { setUserName(e.target.value); }} disabled></input>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">E-mail adresa:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => { setEmail(e.target.value); }} disabled></input>
                  </div>

                  {(userData.typeOfUser === "organizator") ?
                    <>
                      <div className="form-group">
                        <label htmlFor="address">Adresa:</label>
                        <input type="text" className="form-control" id="address" value={homeAdress} onChange={(e) => { setHomeAdress(e.target.value); }} disabled></input>
                      </div>
                    </> : <></>}

                  <button type="submit" className="btn btn-primary" onClick={handleEdit} hidden>Spremi</button>
                </form>
              </div>
            </div>

            {/* TODO - dodati funkcionalnost buttona! */}
            <div className="edit-content">
              {(userData.typeOfUser === "administrator") ? <AdminView /> : <></>}
              {(userData.typeOfUser === "organizator") ? <OrganizerView /> : <></>}
              {(userData.typeOfUser === "posjetitelj") ? <UserView /> : <></>}
            </div>

          </div> : ""
      }
    </>
  );
}

export default MyAccount;