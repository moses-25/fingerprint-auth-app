import React from 'react';
import Logo from './LogoLarge.js'
import '../styles/LoginLogo.css';

export default function LogoWelcome() {
  return(
    <div className="main-card">
      <h1 className="title-name">
        I.E Our Lady of Chiquinquirá
      </h1>
      <Logo/>
    </div>
  );
};
