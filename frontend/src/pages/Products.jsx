import React, { useEffect, useState } from 'react';
import API from '../api';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <div className="container mt-4">
      <h2>Products</h2>
      <div className="row">
        {products.map(p => (
          <div key={p._id} className="col-md-4">
            <div className="card mb-3">
              <img src={p.image} className="card-img-top" alt={p.title} />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text">${p.price}</p>
                <button className="btn btn-primary" onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
