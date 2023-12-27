import React, { useState } from "react";
import "../styles/LoginM.css";
import { useNavigate } from "react-router-dom";
import MyToast from "./MyToast";
const LoginM = ({ getType }) => {
  const [dodatnoZaRegistraciju, setDodatnoZaRegistraciju] = useState(false);
  const [PrijaviSeOrganizator, setPrijaviSeOrganizator] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [homeAdress, setHomeAdress] = useState("");
  const [shouldPayMembership, setShouldPayMembership] = useState(false);
  const [typeOfUser, setTypeOfUser] = useState("posjetitelj");
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailField = document.getElementById("email-label");
    const emailError = document.getElementById("email-error");
    const kvadrat = document.getElementById("email-field");
    if (!kvadrat.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
      emailError.innerText = "Email format nije ispravan";
      emailError.style.color = "red";
      kvadrat.style.borderColor = "red";
      kvadrat.style.color = "black";
      return false;
    } else {
      emailError.innerText = "";
      emailError.style.color = "green";
      kvadrat.style.borderColor = "green";
      return true;
    }
  };
  const validatePassword = () => {
    const sifra = document.getElementById("sifrafild");
    const errSifra = document.getElementById("sifra-errors");
    if (sifra.value == "") {
      sifra.style.borderColor = "red";
      errSifra.innerText = "Upišite lozinku";
      errSifra.style.color = "red";
      return false;
    } else {
      if (sifra.value.length > 30) {
        sifra.style.borderColor = "black";
        errSifra.innerText = "Maksimalna duzina je 30 znakova";
        errSifra.style.color = "black";
        return false;
      } else {
        if (sifra.value.length < 6) {
          sifra.style.borderColor = "red";
          errSifra.innerText = "Minimalna duzina je 6 znakova";
          errSifra.style.color = "red";
          return false;
        } else {
          sifra.style.borderColor = "green";
          errSifra.innerText = "";
          errSifra.style.color = "green";
          return true;
        }
      }
    }
  };
  const validateName = () => {
    const nameErr = document.getElementById("name-error");
    const sifra = document.getElementById("nameField");
    if (sifra.value == "") {
      sifra.style.borderColor = "red";
      nameErr.innerText = "Upišite korisničko ime";
      nameErr.style.color = "red";
      return false;
    } else {
      if (sifra.value.length > 30) {
        sifra.style.borderColor = "black";
        nameErr.innerText = "Maksimalna duzina je 30 znakova";
        nameErr.style.color = "black";
        return false;
      } else {
        if (sifra.value.length < 4) {
          sifra.style.borderColor = "red";
          nameErr.innerText = "Minimalna duzina je 4 znakova";
          nameErr.style.color = "red";
          return false;
        } else {
          sifra.style.borderColor = "green";
          nameErr.innerText = "";
          nameErr.style.color = "green";
          return true;
        }
      }
    }
  };
  const validateAdress = () => {
    if (PrijaviSeOrganizator) {
      const poljeAdresa = document.getElementById("adress");
      const adresaErr = document.getElementById("adresa-errors");
      if (poljeAdresa.value == "null" || poljeAdresa.value == "") {
        poljeAdresa.style.borderColor = "red";
        adresaErr.innerText = "Upišite adresu";
        adresaErr.style.color = "red";
      } else {
        poljeAdresa.style.borderColor = "green";
        adresaErr.innerText = "";
        adresaErr.style.color = "black";
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const alrt = document.getElementById("gmb");
    alrt.style.visibility = "hidden";
    const podatci = { username, password };
    //console.log(JSON.stringify(podatci));
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(podatci),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No user found");
        }
        return response.text();
      })
      .then((response) => {
        sessionStorage.setItem("accessToken", response);
        navigate("/home");
        getType(true, "Uspješna prijava", "success"); // uspjesna prijava stavi show na true i posalji poruku uspiješna prijava "success" znaci da okvir mora biti zelen
        //       setTimeout(() => {
        //         window.location.reload();
        //       }, 1000); // cekaj jednu sekundu prije nego sta refreshas tako da ne nestane zeleni prozorcic instant
      })
      .catch((error) => {
        if (error.message === "No user found") {
          alrt.style.visibility = "visible";
          setUserName("");
          setPassword("");
          const sifra = document.getElementById("nameField");
          sifra.style.borderColor = "red";
          const sifra1 = document.getElementById("sifrafild");
          sifra1.style.borderColor = "red";
        } else {
          console.error("Error fetching data: ", error);
        }
      });
  };

  // Ispraviti Register dio!
  const handleRegister = (e) => {
    validatePassword();
    validateName();
    validateAdress();
    e.preventDefault();
    const data = {
      username,
      password,
      email,
      typeOfUser,
      homeAdress,
      shouldPayMembership,
    };
    const alrt = document.getElementById("gmb");
    alrt.style.visibility = "hidden";
    if (
      username !== "" &&
      password !== "" &&
      validateEmail() &&
      validatePassword() &&
      validateName()
    ) {
      if (PrijaviSeOrganizator) {
        if (homeAdress != "null" && homeAdress != "") {
          fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("No user found");
              }
              return response.text();
            })
            .then((response) => {
              // console.log(response);
              sessionStorage.setItem("accessToken", response);
              navigate("/home");
              getType(true, "Uspješna registracija", "success"); // uspjesna registracija stavi show na true i posalji poruku uspiješna prijava "success" znaci da okvir mora biti zelen
              //             setTimeout(() => {
              //               window.location.reload();
              //             }, 1000); // cekaj jednu sekundu prije nego sta refreshas tako da ne nestane zeleni prozorcic instant
            })
            .catch((error) => {
              if (error.message === "No user found") {
                alrt.style.visibility = "visible";
              } else {
                console.error("Error fetching data: ", error);
              }
            });
        } else {
        }
      } else {
        fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("No user found");
            }
            return response.text();
          })
          .then((response) => {
            // console.log(response);
            sessionStorage.setItem("accessToken", response);
            navigate("/home");
            getType(true, "Uspješna registracija", "success"); // uspjesna registracija stavi show na true i posalji poruku uspiješna prijava "success" znaci da okvir mora biti zelen
            //          setTimeout(() => {
            //            window.location.reload();
            //          }, 1000); // cekaj jednu sekundu prije nego sta refreshas tako da ne nestane zeleni prozorcic instant
          })
          .catch((error) => {
            if (error.message === "No user found") {
              alrt.style.visibility = "visible";
            } else {
              console.error("Error fetching data: ", error);
            }
          });
      }
    }
  };

  return (
    <div className="contents" id="NaCentarDiva">
      <div className="JosImasNemas">
        {!dodatnoZaRegistraciju ? (
          <>
            {" "}
            Još nemaš račun?{" "}
            <button
              className="btn btn-primary"
              onClick={() => {
                setDodatnoZaRegistraciju(true);
                const alrt = document.getElementById("gmb");
                alrt.style.visibility = "hidden";
              }}
            >
              Registriraj se
            </button>{" "}
          </>
        ) : (
          <>
            {" "}
            Već imaš račun?{" "}
            <button
              className="btn btn-primary"
              onClick={() => {
                setDodatnoZaRegistraciju(false);
                setPrijaviSeOrganizator(false);
                const alrt = document.getElementById("gmb");
                alrt.style.visibility = "hidden";
              }}
            >
              Prijavi se
            </button>{" "}
          </>
        )}
      </div>
      <div className="formaDio">
        <div className="alert alert-danger gmb" id="gmb" role="alert">
          {!dodatnoZaRegistraciju
            ? "Neispravno korisničko ime ili lozinka"
            : "Korisničko ime je zauzeto"}
        </div>
        <form className="forma">
          <div className="mb-3">
            <label htmlFor="nameField" className="form-label">
              Korisničko ime
            </label>
            <input
              type="name"
              className="form-control"
              id="nameField"
              value={username}
              onChange={(e) => {
                const trimmedName = e.target.value.slice(0, 30);
                setUserName(trimmedName);
                if (dodatnoZaRegistraciju) validateName();
              }}
            />
            <div id="name-error" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="sifrafild" className="form-label">
              Lozinka{" "}
            </label>
            <input
              type="password"
              className="form-control sifrafild"
              id="sifrafild"
              value={password}
              onChange={(e) => {
                const trimmedPassword = e.target.value.slice(0, 30);
                setPassword(trimmedPassword);
                if (dodatnoZaRegistraciju) {
                  validatePassword();
                }
              }}
            />
            <div id="sifra-errors" className="form-text"></div>
          </div>
          {!dodatnoZaRegistraciju && (
            <div className="RazmakniBotune">
              <button
                type="submit"
                className="btn btn-primary "
                onClick={handleSubmit}
              >
                Prijavi se
              </button>
            </div>
          )}
          {dodatnoZaRegistraciju && (
            <>
              <div className="mb-3">
                <label htmlFor="email-field" className="form-label">
                  Email adresa
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email-field"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail();
                  }}
                />
                <div id="email-error" className="form-text"></div>
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
                <label className="form-check-label" htmlFor="exampleCheck2">
                  Registriraj se kao organizator
                </label>
              </div>
              {PrijaviSeOrganizator && (
                <div className="mb-3">
                  <label htmlFor="adress" className="form-label">
                    Adresa:
                  </label>
                  <input
                    type="adress"
                    className="form-control"
                    id="adress"
                    value={homeAdress}
                    onChange={(e) => {
                      setHomeAdress(e.target.value);
                      setTypeOfUser("organizator");
                      validateAdress();
                    }}
                  />
                  <div id="adresa-errors" className="form-text"></div>
                </div>
              )}
            </>
          )}
          {dodatnoZaRegistraciju && (
            <div className="cnt">
              <button
                type="submit"
                className="btn btn-primary cnt"
                onClick={handleRegister}
              >
                Registriraj se
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginM;
