import React, { useState } from 'react'
import '../styles/LoginM.css';
const LoginM = () => {
  const [dodatnoZaRegistraciju, setDodatnoZaRegistraciju] = useState(false);
  const [PrijaviSeOrganizator, setPrijaviSeOrganizator] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [homeAdress, setHomeAdress] = useState("null");
  const [shouldPayMembership, setShouldPayMembership] = useState(false);
  const [typeOfUser, setTypeOfUser] = useState("posjetitelj");
  const handleSubmit = (e) => {
    e.preventDefault();
    const podatci = { email, password };
    // console.log(JSON.stringify(podatci));
    fetch('http://localhost:8080/Test/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(podatci)
    }).then((response) => {
      if (!response.ok) {
        throw new Error("No user found");
      }
      return response.json();
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      if (error.message === "No user found") {
        alert("No user found");
      } else {
        console.error("Error fetching data: ", error);
      }
    });
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const data = { username, password, email, typeOfUser, homeAdress, shouldPayMembership };
    fetch('http://localhost:8080/Test/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then((response) => {
      if (!response.ok) {
        throw new Error("No user found");
      }
      if (response.ok) {
        alert("Dodano")
      }

    }).catch((error) => {
      if (error.message === "No user found") {
        alert("No user found");
      } else {
        console.error("Error fetching data: ", error);
      }
    });




  }

  return (
    <div className="main-content" id='NaCentarDiva'>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {!dodatnoZaRegistraciju && (
          <div className='RazmakniBotune'>
            <button type="submit" className="btn btn-primary " onClick={handleSubmit}  >Submit</button>
            <button className='btn btn-primary' onClick={() => {
              setDodatnoZaRegistraciju(true);
            }}>Registriraj se</button>
          </div>
        )}
        {dodatnoZaRegistraciju && (
          <>
            <div className="mb-3">
              <label htmlFor="name" className="form-label" >
                Name:
              </label>
              <input type="name" className="form-control" id="name" value={username} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck2"
                onChange={() => {
                  setPrijaviSeOrganizator(!PrijaviSeOrganizator);
                }}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Registriraj se kao organizator
              </label>
            </div>
            {PrijaviSeOrganizator && (
              <div className="mb-3">
                <label htmlFor="adress" className="form-label">
                  Adresa:
                </label>
                <input type="adress" className="form-control" id="adress" value={homeAdress} onChange={(e) => {
                  setHomeAdress(e.target.value);
                  setTypeOfUser("organizator");
                }} />
              </div>
            )}
          </>
        )}
        {dodatnoZaRegistraciju && (
          <button type="submit" className="btn btn-primary" onClick={handleRegister}>
            Registriraj se
          </button>
        )}
      </form>
    </div>
  )
}

export default LoginM;