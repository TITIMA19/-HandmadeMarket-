import React, { useState } from 'react'; 
import Logo from "../assets/Logo/tazrart.png";
import { useNavigate } from 'react-router-dom';

export default function Register({ className, ...props }) {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading

    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: form.username, email: form.email, password: form.password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setRegistered(true);
      navigate("/login");
    } else {
      const errorData = await res.json(); // Get error details
      alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
    }
  };

  return (
    <div className={`container-fluid ${className}`} {...props}>
      <div className="row">
        {/* Left: Register Form */}
        <div className="col-md-6 form-container">
          <div className="w-75">
            <h2 className="mb-4 text-center">Create Your Account</h2>
            <form onSubmit={handleSubmit}>  {/* Attach onSubmit here */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" placeholder="Your full name" value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="you@example.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="••••••••" value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required />
              </div>
              <div className="mb-3">
                <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirm-password" placeholder="••••••••" value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  required />
              </div>
              <button type="submit" className="btn btn-success w-100">Register</button>
              <p className="text-center mt-3">Already have an account? <a href="/login">Login</a></p>
            </form>
          </div>
        </div>

        {/* Right: Image */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img src={Logo} alt="Register image" className="register-img" />
        </div>
      </div>
    </div>
  );
}