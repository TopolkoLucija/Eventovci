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

  const [clickedLink, setClickedLink] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);

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
          return response.json();
        })
        .then((data) => {
          //setUserData(data);
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
      setClickedLink(0)

      const response = await fetch(`/api/events/myEvents`, {
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

      const data = await response.json();


      setdogadajcic(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const mojiPrethodniDogadaji = async (/* x */) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      setClickedLink(1)

      const response = await fetch(`/api/events/myOldEvents`, {
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

      const data = await response.json();

      setdogadajcic(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
  }, [dogadajcic]);
  useEffect(() => {
    if (initialLoad) {
      mojiBuduciDogadaji();
      setInitialLoad(false);
    }
  }, [initialLoad]);
  const clickedOnEvent = (id) => {
  };
  return (
    <div className="glavniKontejner">
      <div className="kontejnerZaNavbar">
        <nav className="navigacijaEvents1">
          <a
            className={
              selectedLink === 0 || (selectedLink === null && clickedLink === 0)
                  ? "active myeventsBucuciDogadaji"
                  : "myeventsBucuciDogadaji"
            }
            onClick={() => mojiBuduciDogadaji()}
            onMouseEnter={() => setSelectedLink(0)}
            onMouseLeave={() => setSelectedLink(null)}
          >
            Buduća događanja
          </a>
          <a
            className={
              selectedLink === 1 || (selectedLink === null && clickedLink === 1)
                  ? "active myeventsBucuciDogadaji"
                  : "myeventsBucuciDogadaji"
            }
            onClick={() => mojiPrethodniDogadaji()}
            onMouseEnter={() => setSelectedLink(1)}
            onMouseLeave={() => setSelectedLink(null)}
          >
            Prethodna događanja
          </a>
          <div className="animation start-home"></div>
        </nav>
      </div>
      <div className="KontejnerZaKarice">
        {dogadajcic?.length > 0 ? (
          <div className="container1">
            {dogadajcic.map((dogadaj) => {
              return (
                <div
                  key={dogadaj.id}
                >
                  <Dogadaj
                    key={dogadaj.id}
                    Id={dogadaj.id}
                    Mjesto={dogadaj.location}
                    Datum={dogadaj.timeOfTheEvent}
                    Naslov={dogadaj.eventName}
                    Poster={dogadaj.media}
                    display={true}
                  ></Dogadaj>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty"></div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
