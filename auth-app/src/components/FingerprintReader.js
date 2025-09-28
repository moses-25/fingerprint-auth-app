import React, { useState, useEffect } from 'react';
import '../styles/FingerprintReader.css';
import Header from './Header.js';
import CurrentTime from './CurrentTime.js';
import FingerprintIcon from './FingerprintIcon.js';


export default function FingerprintReaderFn() {

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isListening, setIsListening] = useState(true);

  useEffect(() => {
    if (isListening) {
      //startListening();
    }
    return () => setIsListening(false); // Cleanup on unmount
  }, [isListening]);

  /*
  const startListening = () => {
    // Set up an interval to continuously check for fingerprint input
    const listener = setInterval(async () => {
      const fingerprintData = await captureFingerprint();
      if (fingerprintData) {
        await handleFingerprintAuthentication(fingerprintData);
      }
    }, 1000); // Adjust the interval timing as needed

    // Cleanup the interval when the component unmounts or listening stops
    return () => clearInterval(listener);
  };
  */

  const fingerprintToJWT = (fingerprintData) => {
    const payload = {
      fingerprint: fingerprintData,
    };
    //const token = createJWT(payload, JWT_KEY);
    //return token;
  };

  const handleFingerprintAuthentication = async (fingerprintData) => {
    setIsListening(false); // Stop listening while processing
    setShowModal(true);
    setModalData("Autenticando...");

    try {
      const fingerprintJWT = fingerprintToJWT(fingerprintData);
      const response = await fetch('/api/auth/fingerprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': '48fdd9794d35198c4867fb0180252908cc742b18835545d4342ae9544748aa0d',
          'Authorization': `Bearer ${fingerprintJWT}`
        },
        body: JSON.stringify({ fingerPrintToken: fingerprintJWT }),
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setModalData(data.username ? `Bienvenido, ${data.username}` : 'Error de autenticación');
    } catch (error) {
      console.error('Error during fingerprint authentication:', error);
      setModalData('Error en el servidor');
    }

    setTimeout(() => {
      setShowModal(false);
      setModalData(null);
      setIsListening(true); // Restart listening after handling the response
    }, 3000);
  };

  return (
    <div className="auth-main-container">
      <Header />
      <CurrentTime />
      <section className="auth-body-container">
        <h2 className="instructive-message">
          Por favor ponga su huella!
        </h2>
        <FingerprintIcon />
        {showModal && (
          <div className="modal">
            <p>{modalData}</p>
          </div>
        )}
      </section>
    </div>
  );
}
