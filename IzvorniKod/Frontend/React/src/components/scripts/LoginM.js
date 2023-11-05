  import React, { useState } from 'react'
  import '../styles/LoginM.css';
  import { useNavigate } from 'react-router-dom';

  const LoginM = ({getData}) => {
    const [dodatnoZaRegistraciju, setDodatnoZaRegistraciju] = useState(false);
    const [PrijaviSeOrganizator, setPrijaviSeOrganizator] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [homeAdress, setHomeAdress] = useState("null");
    const [shouldPayMembership, setShouldPayMembership] = useState(false);
    const [typeOfUser, setTypeOfUser] = useState("posjetitelj");
    const navigate = useNavigate();

   
    const validateEmail = () => {
      const emailField = document.getElementById("email-label");
      const emailError = document.getElementById("email-error");
      const kvadrat = document.getElementById("email-field");
      if (!kvadrat.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerText = "Email mora biti formata <ime>@<adresa>.<nes>";
        emailError.style.color = "red";
        kvadrat.style.borderColor = "red";
        kvadrat.style.color = "black";
        return false;
      } else {
        emailError.innerText = "We'll never share your email with anyone else.";
        emailError.style.color = "green";
        kvadrat.style.borderColor = "green"
        return true;
      }
    };
    const validatePassword = () => {
      const sifra = document.getElementById("sifrafild");
      const errSifra = document.getElementById("sifra-errors");
      if(sifra.value == ""){
        sifra.style.borderColor = "red"
        errSifra.innerText = "Šifra ne smije biti prazan niz.";
        errSifra.style.color = "red";
      }else{
        sifra.style.borderColor = "green"
        errSifra.innerText = "";
        errSifra.style.color = "green";
      }
    }
    const validateName = () => {
      const nameErr = document.getElementById("name-error");
      const sifra = document.getElementById("nameField");
      if(sifra.value == ""){
        sifra.style.borderColor = "red"
        nameErr.innerText = "Upišite korisničko ime";
        nameErr.style.color = "red";
      }else{
        sifra.style.borderColor = "green"
        nameErr.innerText = "";
        nameErr.style.color = "green";
      }
    }
    const validateAdress = () => {
      if(PrijaviSeOrganizator){
        const poljeAdresa = document.getElementById("adress");
        const adresaErr = document.getElementById("adresa-errors");
        if(poljeAdresa.value == "null" || poljeAdresa.value == ""){
          poljeAdresa.style.borderColor = "red";
          adresaErr.innerText = "Upišite adresu";
          adresaErr.style.color = "red";
        }else{
          poljeAdresa.style.borderColor = "green";
          adresaErr.innerText = "";
          adresaErr.style.color = "black";
        }
      }






    }
    const handleSubmit = (e) => {
      e.preventDefault();
      const alrt = document.getElementById("gmb");
      alrt.style.visibility = "hidden";
      const podatci = { username, password };
      // console.log(JSON.stringify(podatci));
      fetch('/Test/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(podatci)
      }).then((response) => {
        if (!response.ok) {
          throw new Error("No user found");
        }
        return response.json();
      }).then((data) => {
        getData(data);
        navigate('/home')
      }).catch((error) => {
        if (error.message === "No user found") {
          
          alrt.style.visibility = "visible";
        } else {
          console.error("Error fetching data: ", error);
        }
        
      });
    }

    const handleRegister = (e) => {
      validateEmail();
      validatePassword();
      validateName();
      validateAdress();
      e.preventDefault();
      const data = { username, password, email, typeOfUser, homeAdress, shouldPayMembership };
      if(username !== "" && password !== "" && email !== ""){
      if(PrijaviSeOrganizator){
        if(homeAdress != "null" && homeAdress != ""){
        fetch('/Test/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then((response) => {
        if (!response.ok) {
          throw new Error("No user found");
        }
        if (response.ok) {
          alert("Dodano");
          getData(data);
          navigate('/home');
        }

      }).catch((error) => {
        if (error.message === "No user found") {
          alert("No user found");
        } else {
          console.error("Error fetching data: ", error);
        }
      });
    }else{
      alert("Nije popunjena adresa")
    } 
    }else{
      fetch('/Test/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then((response) => {
        if (!response.ok) {
          throw new Error("No user found");
        }
        if (response.ok) {
          alert("Dodano");
          getData(data);
          navigate('/home');
        }

      }).catch((error) => {
        if (error.message === "No user found") {
          alert("No user found");
        } else {
          console.error("Error fetching data: ", error);
        }
      });
    }
    }

    }

    return (
      <div className="content" id='NaCentarDiva'>
        <div class="alert alert-danger gmb" id='gmb' role="alert">
          Neispravno korisničko ime ili lozinka
        </div>
        <form className='forma'>
        <div className="mb-3">
                <label htmlFor="name" className="form-label" >
                  Korisničko ime
                </label>
                <input type="name" className="form-control" id="nameField" value={username} onChange={(e) => {setUserName(e.target.value);validateName()}} />
                <div id="name-error" className="form-text" ></div>
              </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Šifra  </label>
            <input type="password" className="form-control sifrafild" id="sifrafild" value={password} onChange={(e) => {setPassword(e.target.value);
            validatePassword()}} />
            <div id="sifra-errors" className="form-text" ></div>
          </div>
          {!dodatnoZaRegistraciju && (
            <div className='RazmakniBotune'>
              <button type="submit" className="btn btn-primary " onClick={handleSubmit}  >Prijavi se</button>
              <button className='btn btn-primary' onClick={() => {
                setDodatnoZaRegistraciju(true);
                const alrt = document.getElementById("gmb");
                alrt.style.visibility = "hidden";
              }}>Registriraj se</button>
            </div>
          )}
          {dodatnoZaRegistraciju && (
            <>
              
              <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email adresa</label>
            <input type="email" className="form-control" id="email-field" aria-describedby="emailHelp" value={email} onChange={(e) => {setEmail(e.target.value);
            validateEmail();}} />
            <div id="email-error" className="form-text" ></div>
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
                    validateAdress();
                  }} />
                  <div id="adresa-errors" className="form-text" ></div>
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