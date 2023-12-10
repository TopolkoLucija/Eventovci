import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dogadaj from "./Dogadaj";
import "../styles/MyEvents.css";

const MyEvents = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const [dogadajcic, setdogadajcic] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [activeLink, setActiveLink] = useState(null);
  const setUserData = useState("");
  const navigate = useNavigate();

  /* provjeri samo san koristija isto ko sta je Iva napisala u Events.js */
  useEffect(() => {
    if (accessToken !== null) {
      fetch("/api/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Request failed");
            navigate("/login");
            return;
          }
          // console.log(response.json());
          return response.json();
        })
        .then((data) => {
          //setUserData(data);
          console.log("Hello");
          console.log(data);
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    } else {
      navigate("/login");
    }
  }, []);
  const mojiBuduciDogadaji = async (/* x */) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      /* const filter = x;  */ // Replace with the actual filter value you want to use

      const response = await fetch(`/api/events/myEvents`, {
        /* vj mogu normalne zagrade posto ne saljes filter */
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      if (!response.ok) {
        alert("Greska");
        return;
      }

      const data = await response.json(); /*.then((dataJeSon) => {
       setdogadajcic(dataJeSon);
       console.log("unutar awaita: " + dataJeSon);
     }); */

      /* console.log("Data nakon " + x + " : " + data); */

      setdogadajcic(data);
      // console.log("ovo je dogadajcic nakon 24h: " + dogadajcic);
      // Perform actions with the data here
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const mojiPrethodniDogadaji = async (/* x */) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      /* const filter = x;  */ // Replace with the actual filter value you want to use

      const response = await fetch(`/api/events/myOldEvents`, {
        /* vj mogu normalne zagrade posto ne saljes filter */
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      if (!response.ok) {
        alert("Greska");
        return;
      }

      const data = await response.json(); /*.then((dataJeSon) => {
      setdogadajcic(dataJeSon);
      console.log("unutar awaita: " + dataJeSon);
    }); */

      /* console.log("Data nakon " + x + " : " + data); */

      setdogadajcic(data);
      // console.log("ovo je dogadajcic nakon 24h: " + dogadajcic);
      // Perform actions with the data here
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    console.log("Updated dogadajcic:", dogadajcic);
  }, [dogadajcic]); // Will log the updated value of dogadajcic whenever it changes
  useEffect(() => {
    if (initialLoad) {
      mojiBuduciDogadaji();
      setInitialLoad(false);
    }
  }, [initialLoad]);
  return (
    <div className="glavniKontejner">
      <div className="kontejnerZaNavbar">
        <nav>
          <a
            onClick={() => mojiBuduciDogadaji()}
            /* className={activeLink === 1 ? "active" : ""}
            onClick={() => handleLinkClick(24, 1)}
            onMouseEnter={() => setActiveLink(null)}
            */
          >
            Budući događaji
          </a>
          <a
            onClick={() => mojiPrethodniDogadaji()}
            /*
            className={activeLink === 2 ? "active" : ""}
            onClick={() => handleLinkClick(7, 2)}
            onMouseEnter={() => setActiveLink(null)}
            */
          >
            Prethodni Događaji
          </a>
          <div className="animation start-home"></div>
        </nav>
      </div>
      <div className="KontejnerZaKarice">
        {dogadajcic?.length > 0 ? (
          <div className="container">
            {dogadajcic.map((dogadaj) => {
              return (
                <Dogadaj
                  key={dogadaj.id}
                  Mjesto={dogadaj.location}
                  Datum={dogadaj.timeOfTheEvent}
                  Naslov={dogadaj.eventName}
                  Poster={dogadaj.media}
                ></Dogadaj>
              );
            })}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
