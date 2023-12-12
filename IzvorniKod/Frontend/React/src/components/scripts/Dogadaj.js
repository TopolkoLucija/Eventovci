import React from "react";
import { format } from "date-fns";
import "../styles/Dogadaj.css";

const Dogadaj = ({ Datum, Poster, Mjesto, Naslov }) => {
    const formattedDate = format(new Date(Datum), "dd. MM. yyyy  HH:mm");
    return (
        <div className="dogadaj">
            <div>
                <p>{formattedDate}</p>
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
