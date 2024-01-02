import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "../styles/Dogadaj.css";

const Dogadaj = ({ Id, Datum, Poster, Mjesto, Naslov, display }) => {
  const formattedDate = format(new Date(Datum), "dd. MM. yyyy  HH:mm");
  const accessToken = sessionStorage.getItem("accessToken");
  const [vrstaPosjetitelja, setVrstaPosjetitelja] = useState("");
  const [prikazi, setPrikazi] = useState(false);
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
          console.log(response);
          return response.text();
        })
        .then((data) => {
          console.log(data);
          setVrstaPosjetitelja(data);
          //         console.log(vrstaPosjetitelja);
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

  return (
    <a href={`/event/${Id}`}>
      <div className="dogadaj">
        <div className="staviFlexOdKraja">
          <p>{formattedDate}</p>
          {(prikazi || display) && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          )}
        </div>
        <div>
          <img
            src={
              Poster !== "N/A" && Poster != null
                ? `data:image/png;base64,${Poster}`
                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAAAXNSR0IArs4c6QAAE9pJREFUeF7t1rENADAMw7D2/6NdoDdoZA7wQGTQ3bbjCBAgQIAAAQIEMoErsDJLQwQIECBAgACBLyCwPAIBAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECDxMKDurAIQr8QAAAABJRU5ErkJggg=="
            }
            alt={Naslov}
          ></img>
        </div>
        <div>
          <span>{Mjesto}</span>
          <h3>{Naslov}</h3>
        </div>
      </div>
    </a>
  );
};

export default Dogadaj;
