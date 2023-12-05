import React from "react";
import "../styles/Dogadaj.css";
const Dogadaj = ({ Datum, Poster, Mjesto, Naslov }) => {
  return (
    <div className="dogadaj">
      <div>
        <p>{Datum}</p>
      </div>
      <div>

        <img
          src={Poster !== "N/A" && Poster != null ? `data:image/png;base64,${Poster}` : "https://via.placeholder.com/400"}
          alt={Naslov}
        ></img>
      </div>
      <div>
        <span>{Mjesto}</span>
        <h3>{Naslov}</h3>
      </div>
    </div>
  );
};

export default Dogadaj;
