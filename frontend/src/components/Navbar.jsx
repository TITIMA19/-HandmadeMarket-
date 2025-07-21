import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/Logo/tazrart.png";
import 'bootstrap-icons/font/bootstrap-icons.css';
function Navbar({ user, cartItems, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // your logout logic: clear auth, token, user state
    navigate('/login');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <img
            src={Logo}
            alt="Logo"
            style={{
              height: "80px",
              width: "auto",
              borderRadius: "50%",
              objectFit: "cover",
            }} to="/"/>
        
    

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        {user ? (
          <>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/materials">
                  Materials
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/courses">
                  Courses
                </Link>
              </li>

             <li className="nav-item">
             <Link className="nav-link" to="/cart">
              <i className="bi bi-cart me-2"></i> {/* Cart icon */}
               {totalCartCount > 0 && <span>({totalCartCount})</span>}
             </Link>
             </li>

              {user.role === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin Dashboard
                  </Link>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center">
              <span className="me-3">Hello, {user.name}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}  style={{ backgroundColor: '#fd7e14', color: 'white' , border:'#fd7e14'  }}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-2">
              <Link className="btn btn-outline-primary"  style={{ backgroundColor: '#fd7e14', color: 'white' , border:'#fd7e14'  }} to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary"  style={{ backgroundColor: '#fd7e14', color: 'white', border:'#fd7e14' }} to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
