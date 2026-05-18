import React, { useState, useEffect } from 'react';
import '../styles/CurrentTime.css';

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      // Update time every second
    }, 1000);
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString(
      [],
      {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }
    );
  };

  return (
    <section className="current-date-container">
      <h3 className="current-date">Time:</h3>
      <h3 className="current-date-value">{formatTime(currentTime)}</h3>
    </section>
  );
}
