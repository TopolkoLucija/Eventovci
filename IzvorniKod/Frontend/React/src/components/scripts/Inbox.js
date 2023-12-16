import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dogadaj from "./Dogadaj";
import "../styles/Inbox.css";

const Inbox = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const [dogadajcic, setdogadajcic] = useState([]);
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
          console.log(data);
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    } else {
      navigate("/login");
    }
  }, []);
  const posaljiZahtjevInbox = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      // const filter = x;

      const response = await fetch(`/api/events/inbox`, {
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
    posaljiZahtjevInbox();
  }, []);
  useEffect(() => {
    console.log(dogadajcic);
  }, [dogadajcic]);

  return (
    <div className="inboxContainer">
      <h1 className="inBoxCenter">Inbox</h1>
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

export default Inbox;
