import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const categories = [
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-menu-199-458540.png', title: 'IZBORNIK' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-home-1767940-1502276.png', title: 'POČETNA STRANICA' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-person-1767893-1502146.png', title: 'MOJ RAČUN' },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Simpleicons_Business_calendar-check.svg', title: 'DOGAĐANJA' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-calendar-1273-433500.png', title: 'MOJ KALENDAR' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-people-1768021-1502195.png', title: 'O NAMA' },
    { img: 'https://cdn.iconscout.com/icon/free/png-256/free-login-1767822-1502402.png', title: 'PRIJAVA' },
  ];

  return (
    <div className="sidebar">
      {categories.map((category, index) => (
  <div key={index} className="category">
    <img src={category.img} alt={`img for ${category.title}`} />
    <span>{index === 0 ? '' : category.title}</span>
  </div>
))}
    </div>
  );
};

export default Sidebar;