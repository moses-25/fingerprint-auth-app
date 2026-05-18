import React, { useState } from 'react';
import '../styles/loginForm.css';
import FingerprintReader from './FingerprintReader.js';
import LoginServerError from './LoginServerError';

export default function Form({ setLoggedIn, loggedIn, token, setToken }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    title: '',
    message: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);

    try {
      const response = await submitLoginForm(formData);

      if (response.success) {
        // Login was successful
        // Update the App's state to indicate login success
        setLoggedIn(true);
        setToken(response.token);
      }

    } catch (error) {

      if (error.statusCode === 404 && error.error === 'Not Found') {
        setErrorDetails({
          title: 'Incorrect credentials',
          message: error.message,
        });
        setShowModal(true);
      } else if (error.statusCode === 401 && error.error === 'Unauthorized') {
        setErrorDetails({
          title: 'Incorrect credentials',
          message: error.message,
        });
        setShowModal(true);
      } else {
        setErrorDetails({
          title: 'Error',
          message: 'Server is unavailable. Please contact support.',
        });
        setShowModal(true);
      }
    }
  };

  const handleCloseModal = () => {
    // Clear the form data
    setFormData({
      username: '',
      password: '',
    });
    // Close the modal
    setShowModal(false);
  };

  return (
    <div>
      {!loggedIn ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-main-container">
            <h1 className="title-welcome">Welcome</h1>
            <p className="sub-title">Please sign in</p>

            <div className="fields-container">
              <InputField
                label="Username"
                id="username"
                value={formData.username}
                placeholder="enter your username"
                onChange={handleChange}
              />
              <InputField
                label="Password"
                id="password"
                type="password"
                value={formData.password}
                placeholder="enter your password"
                onChange={handleChange}
              />
            </div>

            <button type="button" className="forgot-password-btn">
              Forgot password
            </button>

            <button type="submit" className="sign-in-btn">
              Sign In
            </button>
          </div>
        </form>
      ) : (
        <FingerprintReader token={token} /> // Render the FingerprintReader component
      )}

      {showModal && (
        <LoginServerError
          title={errorDetails.title}
          message={errorDetails.message}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

function InputField({ label, id, value, placeholder, onChange, type = 'text' }) {
  return (
    <div className="form-element">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="value-input"
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}

async function submitLoginForm(formData) {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await sendLoginRequest(formData, { signal });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data
  } catch (error) {
    clearTimeout(timeoutId);
    throw error; // Rethrow the error to be caught by handleSubmit
  }
}

async function sendLoginRequest(formData, { signal }) {
  const response = await fetch('http://192.168.101.2:3000/api/v1/readers/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'APIKey': '48fdd9794d35198c4867fb0180252908cc742b18835545d4342ae9544748aa0d'
    },
    body: JSON.stringify(formData),
    mode: 'cors',
    signal
  });

  return response;
}
