import React, { useState, useEffect } from 'react';
import '../styles/Sidebar.css';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ className }) => {
  const accessToken = sessionStorage.getItem('accessToken');
  const location = useLocation();
  const [userData, setUserData] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (accessToken !== null) {
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
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
          setUserType(data.typeOfUser);
        })
        .catch((error) => {
          console.error('Error: ' + error);
        });
    }
  }, [accessToken]);

  const categories = [
    /* { img: 'https://cdn.iconscout.com/icon/free/png-256/free-menu-199-458540.png', title: 'IZBORNIK' }, */ // koristit će se u mobilnoj verziji
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-home-1767940-1502276.png', title: 'POČETNA STRANICA', path: 'home' },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Simpleicons_Business_calendar-check.svg', title: 'DOGAĐANJA', path: 'events' },
    { img: 'https://icons.veryicon.com/png/o/miscellaneous/r-definition/event-20.png', title: 'MOJA DOGAĐANJA', path: 'my-events' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-inbox-1767938-1502274.png', title: 'INBOX', path: 'inbox' },
    { img: 'https://cdn-icons-png.flaticon.com/512/4384/4384371.png', title: 'ZANIMA ME', path: 'interested' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-person-1767893-1502146.png', title: 'MOJ RAČUN', path: 'my-account' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-people-1768021-1502195.png', title: 'O NAMA', path: 'about-us' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-login-1767822-1502402.png', title: 'PRIJAVA', path: 'login' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-login-1767822-1502402.png', title: 'ODJAVA', path: 'logout' }
  ];

  const renderCategory = (category, index) => {
    if (accessToken !== null) { // korisnik je prijavljen
      if (index !== categories.length - 2) {
        if(userData.typeOfUser === "posjetitelj") { // različitim tipovima korisnika različite su kategorije na navigacijskoj traci
          if (index !== 2) { // posjetitelju se ne prikazuje kategotija Moji događaji s indexom 2
            return (
              <div key={index} className={`box ${category.path === 'logout' ? 'mirror-image' : ''} ${location.pathname === `/${category.path}` ? 'active-category' : ''}`}>
                <a href={category.path}>
                  <div className="category">
                    <img src={category.img} alt={`img for ${category.title}`} />
                    <span>{category.title}</span>
                  </div>
                </a>
              </div>
            );
        }
      }
      else if(userData.typeOfUser === "organizator") {
        return (
          <div key={index} className={`box ${category.path === 'logout' ? 'mirror-image' : ''} ${location.pathname === `/${category.path}` ? 'active-category' : ''}`}>
            <a href={category.path}>
              <div className="category">
                <img src={category.img} alt={`img for ${category.title}`} />
                <span>{category.title}</span>
              </div>
            </a>
          </div>
        );
      }
      else if(userData.typeOfUser === "administrator") {
        if(index !== 2 && index !== 3 && index !== 4) { // administratoru se ne prikazuju kategorije Moja događanja, Zanima me i Inbox
        return (
          <div key={index} className={`box ${category.path === 'logout' ? 'mirror-image' : ''} ${location.pathname === `/${category.path}` ? 'active-category' : ''}`}>
            <a href={category.path}>
              <div className="category">
                <img src={category.img} alt={`img for ${category.title}`} />
                <span>{category.title}</span>
              </div>
            </a>
          </div>
        );
      }
      }
      }
    } else { // korisnik nije prijavljen
      if (index !== categories.length - 1 && index !== 2 && index !== 3 && index !== 4) {
        return (
          <div key={index} className={`box ${category.path === 'logout' ? 'mirror-image' : ''} ${location.pathname === `/${category.path}` ? 'active-category' : ''}`}>
            <a href={category.path}>
              <div className="category">
                <img src={category.img} alt={`img for ${category.title}`} />
                <span>{category.title}</span>
              </div>
            </a>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className={`sidebar ${className} ${userType}`}>
      {categories.map((category, index) => (
        renderCategory(category, index)
      ))}
    </div>
  );
};

export default Sidebar;