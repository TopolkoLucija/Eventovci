import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const categories = [
    /*{ img: 'https://cdn.iconscout.com/icon/free/png-256/free-menu-199-458540.png', title: 'IZBORNIK' }, */ // koristit ce se u mobile verziji
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-home-1767940-1502276.png', title: 'POČETNA STRANICA', path: 'home' },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Simpleicons_Business_calendar-check.svg', title: 'DOGAĐANJA', path: 'events' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-person-1767893-1502146.png', title: 'MOJ RAČUN', path: 'my-account' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-calendar-1273-433500.png', title: 'MOJ KALENDAR', path: 'my-calendar' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-people-1768021-1502195.png', title: 'O NAMA', path: 'about-us' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-login-1767822-1502402.png', title: 'PRIJAVA', path: 'login' },
  ];

  return (
    <div className="sidebar">
      {categories.map((category, index) => (
        <div key={index} className='box'>
          <a href={category.path}>
            <div className="category">
              <img src={category.img} alt={`img for ${category.title}`} />
              <span>{category.title}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;