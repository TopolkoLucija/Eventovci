import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dogadaj from "./Dogadaj";
import "../styles/Events.css";

const dogadaj = {
  Naslov: "Shrek",
  Datum: "05.01.2024",
  Mjesto: "Dolac",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
};
/*      {dogadaj ? (
        <div className="container">
          <Dogadaj dogadaj={dogadaj}></Dogadaj>
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
*/
function Events() {
  const accessToken = sessionStorage.getItem("accessToken");
  const [dogadajcic, setdogadajcic] = useState([]);
  // console.log(accessToken);

  const setUserData = useState("");
  const navigate = useNavigate();

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

      const data = await response.json(); /*.then((dataJeSon) => {
        setdogadajcic(dataJeSon);
        console.log("unutar awaita: " + dataJeSon);
      }); */

      console.log("Data nakon " + x + " : " + data);

      setdogadajcic(data);
      // console.log("ovo je dogadajcic nakon 24h: " + dogadajcic);
      // Perform actions with the data here
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Call the function
  useEffect(() => {
    console.log("Updated dogadajcic:", dogadajcic);
  }, [dogadajcic]); // Will log the updated value of dogadajcic whenever it changes
  return (
    <div className="glavniKontejner">
      <div className="kontejnerZaNavbar">
        <nav>
          <a onClick={() => dvadesetCetriSata(24)}>24h</a>
          <a onClick={() => dvadesetCetriSata(7)}>7 dana</a>
          <a onClick={() => dvadesetCetriSata(30)}>30 dana</a>
          <a onClick={() => dvadesetCetriSata(48)}>Prije 48h</a>
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
}

export default Events;