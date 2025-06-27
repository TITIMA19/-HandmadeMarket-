import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products"); // Change to your real API URL
      console.log(res.data);
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <div className="container mt-5">
    <h2 className="mb-4">🛍️ Shop Products & Materials</h2>

    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-3 mb-4">
          <div className="card h-100 shadow">
            <img
              src={product.image || "https://via.placeholder.com/150"}
              className="card-img-top"
              alt={product.name}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="text-muted">{product.type}</p>
              <p className="fw-bold">${product.price}</p>

              <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => toggleFavorite(product.id)}
                >
                  {favorites.includes(product.id) ? "♥" : "♡"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
); }

