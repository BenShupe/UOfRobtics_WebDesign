import React, { useState } from 'react';
import './Components_css/RegistrationModal.css';

function RegistrationModal({ show, onClose, isHomePage }) {
  const [isLoginMode, setIsLoginMode] = useState(isHomePage ? true : false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (isHomePage) {
      // Mock authentication for login/signup on home page
      if (username && password) {
        alert('User logged in successfully!');
        onClose();
      }
    } else {
      // Webhook for registration on events page
      const webhookURL = 'https://discord.com/api/webhooks/1301071779040595978/ogZMLeYOe_maqxqhm3TY6Iy561v0Vo0Dcoih-vMNb-iYtRhIOy-M3ZVY6zXyD5CnmRi5';

      try {
        const message = {
          content: `New user registered:\nEmail: ${username}`,
        };

        await fetch(webhookURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });

        alert('Registration successful and Discord notified!');
        onClose();
      } catch (error) {
        console.error('Error sending message to Discord:', error);
      }
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className={isHomePage ? "modal-content-large" : "modal-content"}>
        <h2>{isHomePage ? (isLoginMode ? 'Login' : 'Sign Up') : 'Register Now'}</h2>
        <form onSubmit={formSubmitHandler}>
          <div className="form-control">
            <label htmlFor="username">{isHomePage ? 'Username' : 'E-Mail'}</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isHomePage ? (isLoginMode ? 'LOGIN' : 'SIGN UP') : 'Register'}</button>
        </form>
        {isHomePage && (
          <button onClick={() => setIsLoginMode((prevMode) => !prevMode)} className="switch-mode-button">
            SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOGIN'}
          </button>
        )}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default RegistrationModal;
