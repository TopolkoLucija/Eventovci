import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyAccount.css';
import UserView from "./views/UserView";
import OrganizerView from "./views/OrganizerView";
import AdminView from "./views/AdminView";

const MyAccount = () => {
  var accessToken = sessionStorage.getItem("accessToken");

  // console.log(accessToken);

  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [homeAdress, setHomeAdress] = useState("");

  // console.log(userData);

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


  const [showModalValidation, setShowModalValidation] = useState(false);

  const closeModalValidation = () => {
    setShowModalValidation(false);
  };

  const validation = () => {
    setShowModalValidation(true);
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

  const handleEdit = (e) => {
    // e.preventDefault();
    // console.log("handle edit")

    Edit();

    accessToken = sessionStorage.getItem("accessToken");
    // console.log("session1: " + accessToken);

    setShowModalValidation(false);

    userData.email = email;
    userData.username = username;

    if (userData.typeOfUser === "organizator") {
      userData.homeAdress = homeAdress;
    }

    setUserData(userData);
    const user = {
      username,
      email,
      homeAdress,
      password
    };

    // console.log(user);

    fetch('/api/data/change', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': accessToken
      },
      body: JSON.stringify(user)
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

      // Možda nepotreban ovaj blok?
      .then((response) => {
        // console.log("res: " + response);
        // console.log("session1: " + sessionStorage.getItem("accessToken"))
        // console.log(response === sessionStorage.getItem("accessToken"));
        sessionStorage.setItem("accessToken", response);
        // console.log(response === sessionStorage.getItem("accessToken"));
        console.log("session2: " + sessionStorage.getItem("accessToken"))
        accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken);
      })
      .catch((error) => {
        console.error('Error: ' + error);
      });


    setTimeout(() => {

      console.log(sessionStorage.getItem('accessToken'))
    }, 4000);

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
                <div className='form'>
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

                  <button className="btn btn-primary" onClick={validation} hidden>Spremi</button>
                </div>
              </div>
            </div>

            {/* TODO - dodati funkcionalnost buttona! */}
            <div className="edit-content">
              {(userData.typeOfUser === "administrator") ? <AdminView /> : <></>}
              {(userData.typeOfUser === "organizator") ? <OrganizerView /> : <></>}
              {(userData.typeOfUser === "posjetitelj") ? <UserView /> : <></>}
            </div>


            {/* Modal */}
            {showModalValidation && (
              <div className="background">
                <div className="window">
                  <span onClick={closeModalValidation}>&times;</span>
                  <div>Unesi lozinku</div>
                  <label htmlFor='password'>Lozinka:</label>
                  <input type='password' className='form-control' id='password' onChange={(e) => { setPassword(e.target.value); }}></input>
                  <button type="submit" className='btn btn-primary' onClick={handleEdit}>Provjeri</button>
                </div>
              </div>
            )}

          </div> : ""
      }
    </>
  );
}

export default MyAccount;