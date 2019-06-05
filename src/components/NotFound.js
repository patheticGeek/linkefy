import React from 'react';
import '../assets/notfound.css';

export default function NotFound() {
  return (
    <div id='notfound'>
      <div className='notfound'>
        <div className='notfound-404'>
          <h1>
            4<span>0</span>4
          </h1>
        </div>
        <p>The page you are looking for cannot be found.</p>
        <a href='/'>home page</a>
      </div>
    </div>
  );
}
