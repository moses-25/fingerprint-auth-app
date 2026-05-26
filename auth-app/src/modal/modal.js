import React from 'react';
import { createPortal } from 'react-dom';
import '../styles/modal.css';

export default function LoginError() {
  return createPortal(
    <div className='ModalBackground'>
    </div>,
    document.getElementById('modal')
  );
}
