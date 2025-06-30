import React, { useState } from "react";
import Logo from "../assets/Logo/tazrart.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ className, ...props }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual API endpoint
      const response = await axios.post("http://localhost:3000/api/login", form);
      
      if (response.status === 200) {
        // Example: Save token or user info
        localStorage.setItem("token", response.data.token);
        
        // Redirect after successful login
        navigate("/"); // Or any route you want
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className={`container-fluid ${className || ""}`} {...props}>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg d-flex flex-row overflow-hidden" style={{ width: '900px', height: '500px' }}>
          <div style={{ width: '50%', overflow: 'hidden' }}>
            <img src={Logo} alt="Login" className="login-img" style={{
              objectFit: 'cover',
              objectPosition: 'center',
              borderTopLeftRadius: '0.5rem',
              borderBottomLeftRadius: '0.5rem'
            }} />
          </div>

          <div className="p-4" style={{ width: '50%' }}>
            <div className="p-4" style={{ flex: 1 }}>
              <h2 className="card-title text-center mb-3">Welcome Back</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={form.email}
                    placeholder="m@example.com"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: "#fd7e14", color: "white", border: "2px solid #fd7e14" }}
                >
                  Login
                </button>
                <p className="text-center mt-3">
                  Don't have an account?{" "}
                  <a href="/register" style={{ color: "#fd7e14", textDecoration: 'none', fontWeight: 'light' }}>
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


