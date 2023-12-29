import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dogadaj from "./Dogadaj";
import "../styles/Events.css";

function Events() {
  const accessToken = sessionStorage.getItem("accessToken");
  const [dogadajcic, setdogadajcic] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const [clickedLink, setClickedLink] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);

  const setUserData = useState("");
  const navigate = useNavigate();

  const handleLinkClick = (filterValue, index) => {
    setClickedLink(index);
    setInitialLoad(false);
    dvadesetCetriSata(filterValue);
  };
  const clickedOnEvent = (id) => {
    console.log(id);
  };
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
        .then((data) => {})
        .catch((error) => {
          console.error("Error: " + error);
        });
    } else {
      navigate("/login");
    }
  }, []);
  const dvadesetCetriSata = async (x) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const filter = x; // Replace with the actual filter value you want to use

      const response = await fetch(`/api/events/all/${filter}`, {
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

  // Call the function
  useEffect(() => {}, [dogadajcic]); // Will log the updated value of dogadajcic whenever it changes

  useEffect(() => {
    if (initialLoad) {
      dvadesetCetriSata(0);
      setInitialLoad(false);
    }
  }, [initialLoad]);

  return (
    <div className="glavniKontejner">
      <div className="kontejnerZaNavbar">
        <nav className="navigacijaEvents">
          <a
            className={
              selectedLink === 0 || (selectedLink === null && clickedLink === 0)
                ? "active sveCss"
                : "sveCss"
            }
            onClick={() => handleLinkClick(0, 0)}
            onMouseEnter={() => setSelectedLink(0)}
            onMouseLeave={() => setSelectedLink(null)}
          >
            Sve
          </a>
          <a
            className={
              selectedLink === 1 || (selectedLink === null && clickedLink === 1)
                ? "active dvadesetCetriSataCss"
                : "dvadesetCetriSataCss"
            }
            onClick={() => handleLinkClick(24, 1)}
            onMouseEnter={() => setSelectedLink(1)}
            onMouseLeave={() => setSelectedLink(null)}
          >
            24h
          </a>
          <a
            className={
              selectedLink === 2 || (selectedLink === null && clickedLink === 2)
                ? "active dvadesetCetriSataCss"
                : "dvadesetCetriSataCss"
            }
            onClick={() => handleLinkClick(7, 2)}
            onMouseEnter={() => setSelectedLink(2)}
            onMouseLeave={() => setSelectedLink(null)}
          >
            7 dana
          </a>
          <a
            className={
              selectedLink === 3 || (selectedLink === null && clickedLink === 3)
                ? "active dvadesetCetriSataCss"
                : "dvadesetCetriSataCss"
            }
            onClick={() => handleLinkClick(30, 3)}
            onMouseEnter={() => setSelectedLink(3)}
            onMouseLeave={() => setSelectedLink(null)}
          >
            30 dana
          </a>
          <a
            className={
              selectedLink === 4 || (selectedLink === null && clickedLink === 4)
                ? "active dvadesetCetriSataCss"
                : "dvadesetCetriSataCss"
            }
            onClick={() => handleLinkClick(48, 4)}
            onMouseEnter={() => setSelectedLink(4)}
            onMouseLeave={() => setSelectedLink(null)}
          >
            Prije 48h
          </a>
          <div className="animation start-home"></div>
        </nav>
      </div>
      <div className="KontejnerZaKarice">
        {dogadajcic?.length > 0 ? (
          <div className="container">
            {dogadajcic.map((dogadaj) => {
              return (
                <div
                  key={dogadaj.id}
                  // onClick={() => clickedOnEvent(dogadaj.id)}
                >
                  <Dogadaj
                    key={dogadaj.id}
                    Id={dogadaj.id}
                    Mjesto={dogadaj.location}
                    Datum={dogadaj.timeOfTheEvent}
                    Naslov={dogadaj.eventName}
                    Poster={dogadaj.media}
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
}

export default Events;
