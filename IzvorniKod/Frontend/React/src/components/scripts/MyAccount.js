import React, { useState } from 'react'

const MyAccount = () => {


  const accessToken = sessionStorage.getItem('accessToken');

  // console.log(accessToken);

  const [userData, setUserData] = useState("");


  fetch('/Test/data', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    }
  }).then((response) => {
    if (!response.ok) {
      console.error("Request failed");
      return;
    }
    return response.json();
  }).then((data) => {
    setUserData(data);
    console.log(data);
  }).catch((error) => {
    console.error("Error: " + error);
  });


  return (
    <div className="content">
      <div className='my-account-content'>
        <div className='my-account-content-title'>
          <h1>Bok, { userData.username }!</h1>
        </div>
        <div className='my-account-content-text'>
          <p>Ti si: {userData.typeOfUser}</p>
          <p>Trebaš platiti članarinu? {userData.shouldPayMembership ? "Da" : "Ne"}</p>
          <p>Adresa: { userData.homeAdress }</p>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;