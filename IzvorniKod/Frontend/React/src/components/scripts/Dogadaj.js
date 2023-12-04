import React from "react";
import "../styles/Dogadaj.css";
const Dogadaj = ({ dogadaj }) => {
  return (
    <div className="dogadaj">
      <div>
        <p>{dogadaj.Datum}</p>
      </div>
      <div>
        <img
          src={
            dogadaj.Poster !== "N/A"
              ? dogadaj.Poster
              : "https://via.placeholder.com/400"
          }
          alt={dogadaj.Naslov}
        ></img>
      </div>
      <div>
        <span>{dogadaj.Mjesto}</span>
        <h3>{dogadaj.Naslov}</h3>
      </div>
    </div>
  );
};

export default Dogadaj;
