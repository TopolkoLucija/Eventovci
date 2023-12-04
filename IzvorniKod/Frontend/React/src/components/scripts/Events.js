import React from "react";
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
  return (
    <div>
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
