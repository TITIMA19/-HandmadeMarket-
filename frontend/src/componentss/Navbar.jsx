import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ user, setUser }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <span className="navbar-brand">Tazrart</span>
      <div className="ml-auto">
        {user ? (
          <div style={{ position: "relative" }}>
            <FaUserCircle size={26} onClick={() => setShowInfo(!showInfo)} style={{ cursor: "pointer" }} />
            {showInfo && (
              <div className="position-absolute bg-white p-2 border rounded" style={{ right: 0 }}>
                <p className="mb-1">{user.name}</p>
                <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>{user.email}</p>
              </div>
            )}
          </div>
        ) : (
          <button className="btn btn-primary" onClick={() => setUser({ name: "Fatima", email: "fatima@example.com" })}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
