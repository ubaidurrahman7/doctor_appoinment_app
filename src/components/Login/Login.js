import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [hideErrorTimer, setHideErrorTimer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('auth-token')) {
      navigate('/');
    }

    // Clear the timer when the component unmounts
    return () => {
      if (hideErrorTimer) {
        clearTimeout(hideErrorTimer);
      }
    };
  }, [navigate, hideErrorTimer]);

  const login = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await response.json();

    if (json.authtoken) {
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);
      navigate('/');
      window.location.reload();
    } else {
        if (json.errors) {
          const errorMessages = json.errors.map((error) => error.msg);
          setErrorMessages(errorMessages);
          setShowError(true);
        } else if (json.error) {
          setErrorMessages([json.error]);
          setShowError(true);

          setHideErrorTimer(
            setTimeout(() => {
              setShowError(false);
              setErrorMessages([]);
            }, 10000)
          );
        }
      }
  };

  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member?{' '}
            <span>
              <Link to="/sign_up" style={{ color: '#2190FF' }}>
                {' '}
                Sign Up Here
              </Link>
            </span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login}>
              <div className="form-group">
            {showError && (
              <div className="err" style={{ color: 'red' }}>
              
                {errorMessages.map((errorMessage, index) => (
                 <>
                  <li key={index}>{errorMessage}</li>
              <div
                className="error-line"
                style={{ animationDuration: '10s' }}
                ></div>
                </>
                ))}
              
            </div>
            )}
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-describedby="helpId"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                />
              </div>
              <div className="btn-group">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
