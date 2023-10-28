import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className='content'>
      <div className='main-content'>
        <div className='main-content-title'>
          <h1>Connectima</h1>
        </div>
        <div className='main-content-text'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ea omnis inventore libero esse, unde illo,
            tenetur aut quis facere iusto atque nobis pariatur necessitatibus vel? Harum recusandae exercitationem numquam!</p>
          <a href='/about-us' className='more-info'>More info</a>
        </div>
      </div>
    </div>
  );
}

export default Home;