import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import '../styles/ShowEvent.css';
import StarRating from "./StarRating";
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ShowEvent = () => {

   const navigate = useNavigate();
   const [typeOfUser, setTypeOfUser] = useState("");
   const [userId, setUserId] = useState(0);
   const [loading, setLoading] = useState(true);

   const { id } = useParams();
   const accessToken = sessionStorage.getItem("accessToken");
   const [eventInfo, setEventInfo] = useState({});
   const [eventTime, setEventTime] = useState(new Date())
   const [eventMedia, setEventMedia] = useState([]);
   const [reviews, setReviews] = useState([]);
   const [userRatingGrade, setUserRatingGrade] = useState(0);
   const [userRatingText, setUserRatingText] = useState("");
   const [reviewError, setReviewError] = useState(false);
   var [myRSVP, setMyRSVP] = useState(0);
   var [RSVP1, setRSVP1] = useState(0);
   var [RSVP2, setRSVP2] = useState(0);
   var [RSVP3, setRSVP3] = useState(0);
   const [showModalRate, setShowModalRate] = useState(false);
   const [showModalSendReview, setShowModalSendReview] = useState(false);
   const [showModalDeleteReview, setShowModalDeleteReview] = useState({ delete: false, reviewId: 0 });

   const PrevArrow = (props) => {
      return (
         <div className="slick-arrow slick-prev black-arrow" onClick={props.onClick}>
            &larr; Prev
         </div>
      );
   };

   const NextArrow = (props) => {
      return (
         <div className="slick-arrow slick-next black-arrow" onClick={props.onClick}>
            Next &rarr;
         </div>
      );
   };

   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
   };



   useEffect(() => {
      if (accessToken != null) {

         fetch('/api/data', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': accessToken
            }
         })
            .then((response) => {
               if (!response.ok) {
                  console.error('Request failed');
                  navigate('/login');
                  return;
               }
               return response.json();
            })
            .then((data) => {
               setTypeOfUser(data.typeOfUser);
            })
            .catch((error) => {
               console.error('Error: ' + error);
            });

         fetch('/api/data/id', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': accessToken
            }
         })
            .then((response) => {
               if (!response.ok) {
                  navigate('/login');
                  return;
               }
               return response.json();
            })
            .then((data) => {
               setUserId(data);
            })

         // podatci o događaju
         fetch(`/api/events/getEvent/${id}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: accessToken,
            },
         })
            .then(async (response) => {
               if (!response.ok) {
                  console.error("Request failed");
                  return;
               }
               return await response.json();
            })
            .then((data) => {
               setEventInfo(data);
               setEventTime(parseISO(data.timeOfTheEvent));
            })
            .catch((error) => {
               console.error("Error: " + error);
            });


         // slike i videi
         fetch(`/api/media/get/${id}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: accessToken,
            },
         })
            .then(async (response) => {
               if (!response.ok) {
                  console.error("Request failed");
                  return;
               }
               return await response.json();
            })
            .then((data) => {
               setEventMedia(data);
            })
            .catch((error) => {
               console.error("Error: " + error);
            });


         // recenzije
         fetch(`/api/review/get/${id}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: accessToken,
            },
         })
            .then(async (response) => {
               if (!response.ok) {
                  console.error("Request failed");
                  return;
               }
               return await response.json();
            })
            .then((data) => {
               setReviews(data);
            })
            .catch((error) => {
               console.error("Error: " + error);
            });


         // odabir interesa
         fetch(`/api/rsvp/get/${id}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: accessToken,
            },
         })
            .then(async (response) => {
               if (!response.ok) {
                  console.error("Request failed");
                  return;
               }
               return await response.json();
            })
            .then((data) => {
               setMyRSVP(data[0]);
               setRSVP1(data[1]);
               setRSVP2(data[2]);
               setRSVP3(data[3]);

               if (data[0] === 1) {
                  document.getElementById('option-1').classList.remove('btn-primary');
                  document.getElementById('option-1').classList.add('chosen');
                  document.getElementById('option-1').classList.add('btn-success');
               }
               else if (data[0] === 2) {
                  document.getElementById('option-2').classList.remove('btn-primary');
                  document.getElementById('option-2').classList.add('chosen');
                  document.getElementById('option-2').classList.add('btn-success');
               }
               else if (data[0] === 3) {
                  document.getElementById('option-3').classList.remove('btn-primary');
                  document.getElementById('option-3').classList.add('chosen');
                  document.getElementById('option-3').classList.add('btn-success');
               }
            })
            .catch((error) => {
               console.error("Error: " + error);
            });

         setLoading(false);
      }
   }, []);

   const handleChoose = (e) => {
      var filter = e.target.value;

      document.querySelectorAll('.chosen').forEach((btn) => {
         if (btn.value !== filter) {
            btn.classList.remove('chosen');
            btn.classList.remove('btn-success');
            btn.classList.add('btn-primary');
         }
      })

      e.target.classList.toggle('chosen');
      e.target.classList.toggle('btn-success');
      e.target.classList.toggle('btn-primary');

      if (!e.target.classList.contains('chosen')) {
         filter = 0;
      }

      const eventId = id;

      const data = {
         filter,
         eventId
      }

      fetch('/api/rsvp', {
         method: 'POST',
         headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
         },
         body: JSON.stringify(data)
      })
         .then((response) => {
            if (!response.ok) {
               console.log("Request failed");
               return;
            }

            if (filter !== 0) {
               setMyRSVP(filter);
            }
            else {
               setMyRSVP(-1);
            }

            if (myRSVP === 1) {
               setRSVP1(RSVP1--);
               document.getElementById('option-1').innerHTML = `Sigurno dolazim ${RSVP1}`;
            }
            else if (myRSVP === 2) {
               setRSVP2(RSVP2--);
               document.getElementById('option-2').innerHTML = `Možda dolazim ${RSVP2}`;
            }
            else if (myRSVP === 3) {
               setRSVP3(RSVP3--);
               document.getElementById('option-3').innerHTML = `Ne dolazim ${RSVP3}`;
            }

            if (filter === 1) {
               setRSVP1(RSVP1++);
               document.getElementById('option-1').innerHTML = `Sigurno dolazim ${RSVP1}`;
            }
            else if (filter === 2) {
               setRSVP2(RSVP2++);
               document.getElementById('option-2').innerHTML = `Možda dolazim ${RSVP2}`;
            }
            else if (filter === 3) {
               setRSVP3(RSVP3++);
               document.getElementById('option-3').innerHTML = `Ne dolazim ${RSVP3}`;
            }


            fetch(`/api/rsvp/get/${id}`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: accessToken,
               },
            })
               .then(async (response) => {
                  if (!response.ok) {
                     console.log("Request failed");
                     return;
                  }
                  return await response.json();
               })
               .then((data) => {
                  setRSVP1(data[1]);
                  setRSVP2(data[2]);
                  setRSVP3(data[3]);
               })
         })
   }

   const deleteReview = (reviewId) => {
      fetch(`/api/review/delete/${reviewId}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
         },
      })
         .then((response) => {
            if (!response.ok) {
               console.log("Request failed");
               return;
            }
         })
      window.location.reload();
   }

   const handleDeleteReview = (reviewId) => {
      deleteReview(reviewId);
   }

   const handleRate = () => {

      if (userId === eventInfo.eventCoordinatorid) {
         alert("Ne možeš stavljati recenziju na svoj događaj!");
         closeModalRate();
         return;
      }

      const reviewText = userRatingText;
      const grade = userRatingGrade;
      const eventId = id;


      const data = {
         reviewText, grade, eventId
      }

      fetch('/api/review', {
         method: 'POST',
         headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
         },
         body: JSON.stringify(data)
      })
         .then((response) => {
            if (!response.ok) {
               alert('Već si napisao recenziju za ovaj događaj!');
               closeModalRate();
               console.log("Request failed");
               return;
            }
            else {
               openSendReview();
            }
         })

   }

   const openModalRate = () => {
      setShowModalRate(true);
      setUserRatingGrade(0);
      setUserRatingText("");
   }
   const closeModalRate = () => {
      setReviewError(false);
      setShowModalRate(false);
   }

   const openSendReview = () => {
      closeModalRate();
      setShowModalSendReview(true);
   }
   const closeSendReview = () => {
      setShowModalSendReview(false);
      window.location.reload();
   }

   const openDeleteReview = (reviewId) => {
      setShowModalDeleteReview({ delete: true, reviewId: reviewId });

   }
   const closeDeleteReview = () => {
      setShowModalDeleteReview(false);
   }

   return (
      <>
         {loading ?
            <p className='p-4'>Loading...</p> :
            <div className="event-content">
               <div className="event-content-title text-center">
                  <h1 className="h1">{eventInfo.eventName}</h1>
               </div>
               <Slider {...settings} className="media-slider">
                  {eventMedia.map((slide, index) => (
                     <div key={index} className="media-item">
                        {slide.type === 'image' ? (
                           <img src={`data:image/png;base64,${slide.content}`} alt={`Slide ${index + 1}`} width={300} height={416} className="center" />
                        ) : (
                           <ReactPlayer
                              url={`data:video/mp4;base64,${slide.content}`}
                              width="90%"
                              height="100%"
                              controls
                              className="center"
                           />
                        )}
                     </div>
                  ))}
               </Slider>
               <div className="event-content-info-and-choose">
                  <div>
                     <div className="event-content-info">
                        <p>Vrijeme: {format(eventTime, 'dd.MM.yyyy HH:mm')}</p>
                        <p>Trajanje: {eventInfo.duration}</p>
                        <p>Mjesto: {eventInfo.location}</p>
                        <p>Organizator: <a href={`/organizer/${eventInfo.eventCoordinatorid}`}>{eventInfo.username}</a></p>
                        <p>Opis: {eventInfo.typeOfEvent}</p>
                        <p>Cijena: {eventInfo.ticketPrice}€</p>
                     </div>
                     <div className="event-content-choose">
                        <button id="option-1" className="btn btn-primary" disabled={((new Date() - eventTime) / 36e5) >= 0 || typeOfUser === "administrator" || userId === eventInfo.eventCoordinatorid} value={1} onClick={(e) => {
                           handleChoose(e);
                        }}>Sigurno dolazim {RSVP1}</button>
                        <button id="option-2" className="btn btn-primary" disabled={((new Date() - eventTime) / 36e5) >= 0 || typeOfUser === "administrator" || userId === eventInfo.eventCoordinatorid} value={2} onClick={(e) => {
                           handleChoose(e);
                        }}>Možda dolazim {RSVP2}</button>
                        <button id="option-3" className="btn btn-primary" disabled={((new Date() - eventTime) / 36e5) >= 0 || typeOfUser === "administrator" || userId === eventInfo.eventCoordinatorid} value={3} onClick={(e) => {
                           handleChoose(e);
                        }}>Ne dolazim {RSVP3}</button>
                     </div>
                  </div>
               </div>

               {(((new Date() - eventTime) / 36e5) >= 0 && ((new Date() - eventTime) / 36e5) <= 48) ? (
                  <div className="reviews-content">
                     <div>
                        <h3 className="h3 text-center">Recenzije</h3>
                        <div className="text-center">
                           <button className="btn btn-primary" id="rate-btn" disabled={typeOfUser === "administrator" || userId === eventInfo.eventCoordinatorid} onClick={openModalRate}>
                              Dodaj recenziju
                           </button>
                        </div>
                        {reviews.map((r, index) => (
                           <div key={index} className="review">
                              <p>
                                 {r.username}
                                 <StarRating rating={r.grade} />
                                 {(typeOfUser === 'administrator' || userId === r.userId) ? <button className="btn btn-danger" id="delete" value={r.reviewId} onClick={(e) => { openDeleteReview(e.target.value) }}>&times;</button> : <></>}
                              </p>
                              <p>
                                 {r.reviewText}
                              </p>
                              <hr />
                           </div>
                        ))}
                     </div>
                  </div>
               ) : (
                  <></>
               )}

               {showModalRate && (
                  <div className="background">
                     <div className="window-rating">
                        <span className='exit' onClick={closeModalRate}>&times;</span>
                        <div>Napiši recenziju!</div>
                        {reviewError ?
                           <div>
                              <p className="error-text">Nedostaju podatci</p>
                           </div> : <></>
                        }
                        <div><StarRating rating={userRatingGrade} onRatingChange={(newRating) => setUserRatingGrade(newRating)} /></div>
                        <div>
                           <textarea rows={10} cols={30} className="textarea-review" onChange={(e) => { setUserRatingText(e.target.value) }}></textarea>
                        </div>
                        <div><button className="btn btn-primary" id="post-review" onClick={() => {
                           if (userRatingText === "" || userRatingGrade === 0) {
                              setReviewError(true);
                           }
                           else {
                              setReviewError(false);
                              handleRate();
                           }

                        }}>Objavi</button></div>
                     </div>
                  </div>
               )}

               {showModalSendReview && (
                  <div className="background">
                     <div className="window">
                        <div>
                           <p>Recenzija objavljena!</p>
                        </div>
                        <div>
                           <button className="btn btn-primary" onClick={closeSendReview} id="close">Zatvori</button>
                        </div>
                     </div>
                  </div>
               )}

               {showModalDeleteReview.delete && (
                  <div className="background">
                     <div className="window">
                        <div>Želite li izbrisati recenziju?</div>
                        <div className="option-buttons">
                           <button className="btn btn-primary" onClick={() => { handleDeleteReview(showModalDeleteReview.reviewId) }}>Izbriši</button>
                           <button className="btn btn-primary" onClick={closeDeleteReview}>Zatvori</button>
                        </div>
                     </div>
                  </div>
               )}
            </div>}
      </>
   );
}



export default ShowEvent;