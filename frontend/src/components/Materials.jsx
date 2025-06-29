import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";

export default function Material() {
  const [Materials, setMaterials] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get("http://localhost:3000/materials"); // Change to your real API URL
      console.log(res.data);
      setMaterials(res.data.Materials);
    } catch (error) {
      console.error("Error fetching Materials:", error);
    }
  };

  const addToCart = (Materials) => {
    setCart([...cart, Materials]);
  };

  const toggleFavorite = (MaterialsId) => {
    if (favorites.includes(MaterialsId)) {
      setFavorites(favorites.filter((id) => id !== MaterialsId));
    } else {
      setFavorites([...favorites, MaterialsId]);
    }
  };

  return (
    <div className="container mt-5">
    <h2 className="mb-4">🛍️ Shop Materials & Materials</h2>

    <div className="row">
      {Materials.map((Materials) => (
        <div key={Materials.id} className="col-md-3 mb-4">
          <div className="card h-100 shadow">
            <img
              src={"http://localhost:3000/uploads/${filename}"}
              className="card-img-top"
              alt={Materials.name}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{Materials.name}</h5>
              <p className="text-muted">{Materials.type}</p>
              <p className="fw-bold">${Materials.price}</p>

              <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={() => addToCart(Materials)}>
                  Add to Cart
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => toggleFavorite(Materials.id)}
                >
                  {favorites.includes(Materials.id) ? "♥" : "♡"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
); }
