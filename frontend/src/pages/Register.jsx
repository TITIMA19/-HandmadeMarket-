import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo/tazrart.png'; // Make sure path is correct

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      alert('Registered successfully, please login!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg d-flex flex-row overflow-hidden" style={{ maxWidth: '900px', width: '100%', height: '500px' }}>
          {/* Form Side */}
          <div className="p-4" style={{ flex: 1 }}>
            <h3 className="card-title text-center mb-3">Register</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select
                  className="form-select"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="client">Client</option>
                  <option value="admin">Admin (Only allowed with special name)</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn w-100"
                style={{ backgroundColor: "#fd7e14", color: "white", border: "2px solid #fd7e14" }}
              >
                Register
              </button>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <a href="/login" style={{ color: "#fd7e14", textDecoration: 'none' }}>
                  Login
                </a>
              </p>
            </form>
          </div>

          {/* Image Side */}
          <div style={{ flex: 1, overflow: 'hidden' }} className="d-none d-md-block">
            <img
              src={Logo}
              alt="Register Illustration"
              className="img-fluid"
              style={{
                objectFit: 'cover',
                height: '100%',
                borderTopRightRadius: '0.5rem',
                borderBottomRightRadius: '0.5rem'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
