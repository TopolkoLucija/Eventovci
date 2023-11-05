import React from 'react';

const MyAccount = () => {


  const accessToken = sessionStorage.getItem('accessToken');

  console.log(accessToken);

  fetch('/Test/data', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error("No user found");
    }
    return response.JSON();
  });

  return (
    <div className="content">
      <h1>My account</h1>

    </div>
  );
}

export default MyAccount;