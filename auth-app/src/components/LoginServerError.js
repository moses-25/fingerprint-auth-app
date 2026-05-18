import React from 'react';
import { createPortal } from 'react-dom';
import '../styles/modal.css';

export default function LoginServerError({ title, message, onClose }) {
  return createPortal(
    <div className="ModalBackground">
      <div className="ModalContent">
        <h2 className="login-error-title">{title}</h2>
        <p className="login-error-message">{message}</p>
        <button className="accept-login-error-button" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>,
    document.getElementById('modal')
  );
}
