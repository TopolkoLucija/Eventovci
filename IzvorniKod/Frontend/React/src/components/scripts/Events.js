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

function Events() {
  const accessToken = sessionStorage.getItem("accessToken");

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
          setUserData(data);
          // console.log(data);
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="glavniKontejner">
      <div className="kontejnerZaNavbar">
        <nav>
          <a href="">24h</a>
          <a href="">48h</a>
          <a href="">7 dana</a>
          <a href="">30 dana</a>
          <a href="">Prije 48h</a>
          <div className="animation start-home"></div>
        </nav>
      </div>
      {dogadaj ? (
        <div className="container">
          <Dogadaj dogadaj={dogadaj}></Dogadaj>
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default Events;
