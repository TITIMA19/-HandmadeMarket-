import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo/tazrart.png'; // Make sure the path is correct

function Login({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      login(res.data);

      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg d-flex flex-row overflow-hidden" style={{ width: '900px', height: '500px' }}>
          {/* Left Side Image */}
          <div style={{ width: '50%', overflow: 'hidden' }}>
            <img
              src={Logo}
              alt="Login Visual"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                borderTopLeftRadius: '0.5rem',
                borderBottomLeftRadius: '0.5rem',
                width: '100%',
                height: '100%'
              }}
            />
          </div>

          {/* Right Side Login Form */}
          <div className="p-4" style={{ width: '50%' }}>
            <div className="p-4">
              <h3 className="text-center mb-4">Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <button className="btn w-100" style={{ backgroundColor: '#fd7e14', color: 'white' }} type="submit">
                  Login
                </button>
                <p className="text-center mt-3">
                  Don't have an account?{' '}
                  <a href="/register" style={{ color: '#fd7e14', textDecoration: 'none' }}>
                    Register
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

