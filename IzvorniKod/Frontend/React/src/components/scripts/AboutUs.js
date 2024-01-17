import React from 'react';
import '../styles/AboutUs.css';


const AboutUs = () => {

  const accessToken = sessionStorage.getItem('accessToken');
  const infoText = accessToken ? 'Za pregled događanja kliknite' : 'Za više informacija kliknite';

  return (
    <div className='content'>
      <div className='main-content'>
        <div className='main-content-title'>
          <h1>
            <div className='title-box'>
              <a href='/about-us'>O NAMA</a>
            </div>
          </h1>
        </div>
        <div className='main-content-text'>
          <p><a href='/home' className='bold-text'>Connectima</a> je inovativna platforma pomoću koje možete pronaći zabavna događanja u gradu.</p>
          <p>Platforma je zamišljena da bude više od običnog mjesta za informiranje o koncertima i kazališnim predstavama.</p>
          <p>Ona je i mjesto povezivanja zajednice putem dobrotvornih događanja i mnogih drugih besplatnih inicijativa.</p>
          <p>{infoText} <a href={accessToken ? '/events' : '/login'} className='more-info'>ovdje</a>.</p>
        </div>
        <div className='main-content-image'>
          <img src="https://eprosta.com/Content/img/shutterstock_252817174.jpeg" alt="O nama slika" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;