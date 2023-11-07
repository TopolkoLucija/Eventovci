import React from 'react';
import '../styles/Sidebar.css';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const location = useLocation();

  const categories = [
    /* { img: 'https://cdn.iconscout.com/icon/free/png-256/free-menu-199-458540.png', title: 'IZBORNIK' }, */ // koristit će se u mobilnoj verziji
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-home-1767940-1502276.png', title: 'POČETNA STRANICA', path: 'home' },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Simpleicons_Business_calendar-check.svg', title: 'DOGAĐANJA', path: 'events' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-person-1767893-1502146.png', title: 'MOJ RAČUN', path: 'my-account' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-calendar-1273-433500.png', title: 'MOJ KALENDAR', path: 'my-calendar' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-people-1768021-1502195.png', title: 'O NAMA', path: 'about-us' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-login-1767822-1502402.png', title: 'PRIJAVA', path: 'login' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-login-1767822-1502402.png', title: 'ODJAVA', path: 'logout' }
  ];

  return (
    <div className="sidebar">
      {categories.map((category, index) => (
        (accessToken !== null && index !== categories.length - 2) || (accessToken === null && index !== categories.length - 1) ? (
          <div key={index} className={`box ${category.path === 'logout' ? 'mirror-image' : ''} ${location.pathname === `/${category.path}` ? 'active-category' : ''}`}>
            <a href={category.path}>
              <div className="category">
                <img src={category.img} alt={`img for ${category.title}`} />
                <span>{category.title}</span>
              </div>
            </a>
          </div>
        ) : null
    ))}
    </div>
  );
};

export default Sidebar;