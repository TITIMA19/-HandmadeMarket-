import React, { useState } from "react";
import Logo from "../assets/Logo/tazrart.png";
import { useNavigate } from "react-router-dom";

export default function Login({ className, ...props }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });     

      // Essaye d'abord de lire la réponse comme texte brut pour debug
      const text = await res.text();
      console.log("Réponse brute du serveur:", text);

      // Essaie de parser seulement si la réponse n'est pas vide
      const data = JSON.parse(text);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userEmail", form.email);
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Erreur lors du login:", error);
      alert("Erreur pendant la connexion.");
    }
  };

  return (
    <div className={`container-fluid ${className || ""}`} {...props}>
      <div className="row">
        <div className="col-md-6 d-none d-md-block p-0">
          <img src={Logo} alt="Login" className="login-img" />
        </div>

        <div className="col-md-6 form-container">
          <div className="w-75">
            <h2 className="mb-4 text-center">Welcome Back</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
              <p className="text-center mt-3">
                Don't have an account? <a href="/register">Register</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


