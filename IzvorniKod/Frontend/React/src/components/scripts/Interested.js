import React, { useEffect, useState } from "react";
import "../styles/Interested.css";
import { useNavigate } from "react-router-dom";
import Dogadaj from "./Dogadaj";

const Interested = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const [dogadajcic, setdogadajcic] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [activeLink, setActiveLink] = useState(null);
  const setUserData = useState("");
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState(null);
  const [clickedLink, setClickedLink] = useState(null);
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
          console.log(data);
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    } else {
      navigate("/login");
    }
  }, []);
  const posaljiZahtjev = async (x) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const filter = x; // Replace with the actual filter value you want to use

      const response = await fetch(`/api/events/myInterests/${filter}`, {
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
  const handleLinkClick = (filter, index) => {
    setClickedLink(index);
    setInitialLoad(false);
    posaljiZahtjev(filter);
  };
  useEffect(() => {
    if (initialLoad) {
      posaljiZahtjev(0);
      setInitialLoad(false);
    }
  }, [initialLoad]);
  return (
    <div className="glavniKontejner">
      <div className="kontejnerZaNavbar">
        <nav className="SmanjiNa60Posto">
          <a
            className={
              selectedLink === 0 || (selectedLink === null && clickedLink === 0)
                ? "active Sigurnodolazim"
                : "Sigurnodolazim"
            }
            onClick={() => handleLinkClick(0, 0)}
            onMouseEnter={() => setSelectedLink(0)}
            onMouseLeave={() => setSelectedLink(null)}
          >
            Sigurno dolazim
          </a>
          <a
            className={
              selectedLink === 1 || (selectedLink === null && clickedLink === 1)
                ? "active Sigurnodolazim"
                : "Sigurnodolazim"
            }
            onClick={() => handleLinkClick(1, 1)}
            onMouseEnter={() => setSelectedLink(1)}
            onMouseLeave={() => setSelectedLink(null)}
          >
            Možda dolazim
          </a>
          <a
            className={
              selectedLink === 2 || (selectedLink === null && clickedLink === 2)
                ? "active Sigurnodolazim"
                : "Sigurnodolazim"
            }
            onClick={() => handleLinkClick(2, 2)}
            onMouseEnter={() => setSelectedLink(2)}
            onMouseLeave={() => setSelectedLink(null)}
          >
            Ne dolazim
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
          <div className="empty"></div>
        )}
      </div>
    </div>
  );
};

export default Interested;
