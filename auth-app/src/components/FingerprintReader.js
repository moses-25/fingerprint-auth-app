import React, { useState, useEffect } from 'react';
import '../styles/FingerprintReader.css';
import Header from './Header.js';
import CurrentTime from './CurrentTime.js';
import FingerprintIcon from './FingerprintIcon.js';
import { FingerprintReader, SampleFormat } from '@digitalpersona/devices';
import WebSdk from '../sdk/index.js';

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

