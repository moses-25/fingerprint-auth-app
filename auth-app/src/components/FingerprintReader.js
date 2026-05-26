import React, { useState, useEffect } from 'react';
import '../styles/FingerprintReader.css';
import Header from './Header.js';
import CurrentTime from './CurrentTime.js';
import FingerprintIcon from './FingerprintIcon.js';
<<<<<<< HEAD

=======
import { FingerprintReader, SampleFormat } from '@digitalpersona/devices';
import WebSdk from '../sdk/index.js';
>>>>>>> origin/main

export default function FingerprintReaderFn() {
  const [status, setStatus] = useState('No device connected');
  const [fingerprint, setFingerprint] = useState(null);
  const [error, setError] = useState(null);

  // Function to initialize the WebSdk and Fingerprint Reader
  const initializeFingerprintReader = () => {
    if (WebSdk) {
      const reader = new FingerprintReader();

      reader.onDeviceConnected = (event) => {
        setStatus('Fingerprint reader connected: ' + event.device.id);
      };

      reader.onDeviceDisconnected = () => {
        setStatus('Fingerprint reader disconnected.');
      };

      reader.startAcquisition(SampleFormat.PngImage)
        .then(() => {
          setStatus('Device ready for fingerprint capture');
        })
        .catch((err) => {
          setError('Failed to start acquisition: ' + err.message);
        });
    } else {
      setError('Failed to initialize WebSdk');
    }
  };

  useEffect(() => {
<<<<<<< HEAD
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
=======
    initializeFingerprintReader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to capture the fingerprint
  const captureFingerprint = () => {
    const reader = new FingerprintReader();

    reader.capture(SampleFormat.PngImage)
      .then((sample) => {
        setFingerprint(sample.samples[0]);
        setError(null);
        setStatus('Fingerprint captured successfully');
      })
      .catch((err) => {
        setError('Fingerprint capture failed: ' + err.message);
>>>>>>> origin/main
      });
  };

  return (
    <div className="auth-main-container">
      <Header />
      <CurrentTime />
      <section className="auth-body-container">
        <h2 className="instructive-message">
          Please place your finger on the reader!
        </h2>
        <FingerprintIcon />
        <p>Status: {status}</p>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <button onClick={captureFingerprint}>Capture Fingerprint</button>
        {fingerprint && (
          <div>
            <h3>Captured Fingerprint:</h3>
            <img src={`data:image/png;base64,${fingerprint}`} alt="Fingerprint" />
          </div>
        )}
      </section>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
