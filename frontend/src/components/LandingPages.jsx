import React from 'react';
import Logo from "../assets/Logo/tazrart.png";
import headerimage from "../assets/Logo/headerimage.jpg";

function LandingPages() {
  const handleRegisterClick = () => {
    // Redirect to the registration page or show a modal
    window.location.href = '/register'; // Example redirect
  };
const handleLoginClick = () => {
    // Redirect to the registration page or show a modal
    window.location.href = '/login'; // Example redirect
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="Logo" width="100" height="100" className="d-inline-block align-text-top"/>
        </a>

        <div className="ms-auto">
          <button className="btn btn-outline-primary me-2"onClick={handleLoginClick}>Login</button>
          <button className="btn btn-primary" onClick={handleRegisterClick}>Register</button>
        </div>
      </nav>
      <header className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-5 fw-bold">Welcome to TAZRART Market</h1>
            <p className="lead text-muted">
              Discover unique creations from local artisans. Support small businesses and find something truly special.
            </p>
            <a href="/Shop" className="btn btn-primary">Explore Now</a>
          </div>
          <div className="col-md-6 text-center">
            <img src={headerimage} alt="Header Image" className="img-fluid rounded"/>
          </div>
        </div>
      </header>
      <main className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="mb-3">
              <i class="bi bi-tags-fill"></i>
              <span className="fw-bold">Category: Handmade Bags</span>
              <i class="bi bi-bag-fill"></i>
            </div>
            <div className="col-md-6 bg-warning-subtle" >
            <h2 className="fw-bold">Stylish Moroccan Leather Bag</h2>
            <p className="text-muted">Made by skilled artisans in Fès, using high-quality leather. Perfect for everyday use or as a gift.</p>
            <ul className="list-unstyled">
              <li><i className="bi bi-check-circle-fill text-success me-2"></i> 100% Genuine Leather</li>
              <li><i className="bi bi-check-circle-fill text-success me-2"></i> Eco-friendly</li>
              <li><i className="bi bi-check-circle-fill text-success me-2"></i> Supports local artisans</li>
            </ul>
              </div>
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <img src={headerimage} className="card-img-top" alt="Handmade Item"/>
                    <div className="card-body">
                      <h5 className="card-title">Handmade Basket</h5>
                      <p className="card-text">Beautiful, eco-friendly woven basket perfect for storage or decor.</p>
                      <div className="d-flex align-items-center mt-3">
                        <span className="fw-bold me-3">$49.99</span>
                        <button className="btn btn-outline-success">
                          <i className="bi bi-cart-plus"></i> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <img src={headerimage} className="card-img-top" alt="Artisan Jewelry"/>
                    <div className="card-body">
                      <h5 className="card-title">Artisan Jewelry</h5>
                      <p className="card-text">Handcrafted jewelry with traditional designs and modern style.</p>
                      <div className="d-flex align-items-center mt-3">
                        <span className="fw-bold me-3">$39.99</span>
                        <button className="btn btn-outline-success">
                          <i className="bi bi-cart-plus"></i> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form className="mt-4">
              <label htmlFor="email" className="form-label">Get updates & offers</label>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter your email" id="email"/>
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer className="bg-dark text-white py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="mb-2">
                <img src={Logo} alt="Logo" className="mb-2"/>
              </div>
              <p className="text-muted">Handmade Market — your destination for unique artisan products made with love and tradition.</p>
              <div>
                <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white me-3"><i className="bi bi-twitter-x"></i></a>
                <a href="#" className="text-white"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
            <div className="col-md-6">
              <h5 className="mb-3">Our Projects</h5>
              <ul className="list-unstyled ">
                <li><a href="#" className="text-muted text-decoration-none bg-info text-white">Leather Collection</a></li>
                <li><a href="#" className="text-muted text-decoration-none bg-info text-white">Traditional Pottery</a></li>
                <li><a href="#" className="text-muted text-decoration-none bg-info text-white">Rural Artisans Support</a></li>
                <li><a href="#" className="text-muted text-decoration-none bg-info text-white">Custom Orders</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPages;