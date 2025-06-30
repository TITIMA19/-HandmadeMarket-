import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from '../assets/Logo/tazrart.png'; // Adjust the path to your logo image

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState(null); // ✅ for success
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      console.log(res.data);
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (product, type) => {
    const userId = '685dd0f8fcae4d5aa26be601'; // Replace with real user ID or fetch from localStorage
    const payload = {
      itemId: product._id,
      itemType: type,
      quantity: 1
    };

    try {
      const res = await axios.post(`http://localhost:3000/cart/${userId}/add`, payload);
      setMessage("✅ Product added to cart!");
      setError(null);
      // Auto-hide message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setError("❌ Failed to add product to cart.");
      setMessage(null);
      setTimeout(() => setError(null), 3000);
    }
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // Handlers for login and register button clicks
  const handleLoginClick = () => {
    // Implement login logic
    console.log("Login clicked");
  };

  const handleRegisterClick = () => {
    // Implement register logic
    console.log("Register clicked");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light px-4" style={{ backgroundColor: "#f2f2f2" }}>
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="Logo" style={{ height: "80px", width: "auto", borderRadius: "50%", objectFit: "cover" }} className="d-inline-block align-text-top" />
        </a>
        
      </nav>

      <div className="container mt-5">
        {message && (
          <div className="alert alert-success text-center" role="alert">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <div className="card h-100 shadow">
                <img
                  src={`http://localhost:3000/uploads/${product.image}`}
                  className="card-img-top"
                  alt="No image"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="text-muted">{product.description}</p>
                  <p className="fw-bold">${product.price}</p>
                  <div className="d-flex justify-content-between">
                    {product.categories && product.categories.includes("Laptops") && (
                      <button onClick={() => addToCart(product, "product")}>Add Product</button>
                    )}
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => toggleFavorite(product._id)}
                    >
                      {favorites.includes(product._id) ? "♥" : "♡"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        <footer className="text-white py-5 mt-5" style={{ backgroundColor: "#fd7e14" }}>
        <div className="container">
          <div className="row">
            {/* Left: Logo + Description + Social Links */}
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="mb-2">
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    height: "80px",
                    width: "auto",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  className="d-inline-block align-text-top"
                />
              </div>
              <p className="text-light">
                Handmade Market — your destination for unique artisan products made
                with love and tradition.
              </p>
              <div>
                <a href="#" className="text-white me-3">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white me-3">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-white me-3">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>
      
            {/* Middle: Projects */}
            <div className="col-md-4">
              <h5 className="mb-3">Our Projects</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Leather Collection
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Traditional Pottery
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Rural Artisans Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Custom Orders
                  </a>
                </li>
              </ul>
            </div>
      
            {/* Right: Categories and Materials */}
            <div className="col-md-4">
              <h5 className="mb-3">Categories</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Accessories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Home Decor
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Fashion
                  </a>
                </li>
              </ul>
              <h5 className="mt-4 mb-3">Materials</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Clay
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Leather
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Wood
                  </a>
                </li>
              </ul>
               <h5 className="mt-4 mb-3">Machine</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Clay
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Leather
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Wood
                  </a>
                </li>
              </ul>
            </div>
          </div>
      
          {/* Footer Bottom */}
          <div className="text-center mt-5 pt-3 border-top border-white">
            <p className="mb-0 text-white-50">
              &copy; {new Date().getFullYear()} Handmade Market. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}