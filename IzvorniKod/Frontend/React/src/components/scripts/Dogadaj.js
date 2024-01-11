import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "../styles/Dogadaj.css";

function toString(array) {
  const blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  const url = URL.createObjectURL(blob);
  console.log(url);
  return url;
}

const Dogadaj = ({
  Id,
  Datum,
  Poster,
  Mjesto,
  Naslov,
  display,
  nemojPrikazatAdminu,
}) => {
  const formattedDate = format(new Date(Datum), "dd. MM. yyyy  HH:mm");
  const accessToken = sessionStorage.getItem("accessToken");
  const [vrstaPosjetitelja, setVrstaPosjetitelja] = useState("");
  const [prikazi, setPrikazi] = useState(false);

  const decodedImage = Poster ? atob(Poster) : null;
  const imageUrl = decodedImage ? `data:image/jpeg;base64,${decodedImage}` : "path/to/default/image.jpg";

  useEffect(() => {
    if (accessToken !== null) {
      fetch("/api/data/type", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Request failed");
            return;
          }
          return response.text();
        })
        .then((data) => {
          setVrstaPosjetitelja(data);
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    }
  }, []);
  useEffect(() => {
    if (
      //     vrstaPosjetitelja == "organizator" ||
      vrstaPosjetitelja == "administrator"
    ) {
      setPrikazi(true);
    } else {
      setPrikazi(false);
    }
  }, [vrstaPosjetitelja]);
  const izbrisiDogadaj = async (event) => {
    event.preventDefault();
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await fetch(`api/events/delete/${Id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      if (!response.ok) {
        return;
      }
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleClick = (event) => {
    if (event.target.tagName === "svg") {
      izbrisiDogadaj(event);
    } else {
      window.location.href = `/event/${Id}`;
    }
  };
  return (
    <div className="dogadaj" onClick={handleClick}>
      <div className="staviFlexOdKraja">
        <p>{formattedDate}</p>
        {(prikazi || display) && !nemojPrikazatAdminu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
            //             onClick={izbrisiDogadaj}
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        )}
      </div>
      <div>
        {Poster && <img src={imageUrl} alt={Naslov} />}
      </div>
      <div>
        <span>{Mjesto}</span>
        <h3>{Naslov}</h3>
      </div>
    </div>
  );
};

export default Dogadaj;


