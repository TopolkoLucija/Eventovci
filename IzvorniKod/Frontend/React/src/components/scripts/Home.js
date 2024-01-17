import React from 'react';
import '../styles/Home.css';
import '../styles/App.css';

const Home = () => {

  const accessToken = sessionStorage.getItem('accessToken');

  return (
    <div className='content'>
      <div className='main-content'>
        <div className='main-content-title'>
          <h1>
            <div className='title-box'>
              <a href='/home'>CONNECTIMA</a>
            </div>
          </h1>
        </div>
        <div className='main-content-image'>
          <img src="https://media.istockphoto.com/id/1189205501/photo/cheering-crowd-of-unrecognized-people-at-a-rock-music-concert-concert-crowd-in-front-of.jpg?s=612x612&w=0&k=20&c=_vgyStdIBHCbnDHdu3lNTwfJxt2fTcJc9PB345ryhZo=" alt="Naslovna slika" />
        </div>
        <div className='main-content-text'>
          <p>Dobrodošli na mjesto povezivanja i razmjene informacija putem zabavnih događaja.</p>
          <p>Za više informacija kliknite <a href={accessToken ? '/about-us' : '/login'} className='more-info'>ovdje</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;