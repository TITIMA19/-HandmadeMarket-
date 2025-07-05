import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products({ token }) {
  const [products, setProducts] = useState([]);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get('http://localhost:3000/api/products');
      setProducts(res.data);
    }
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      await axios.post(
        'http://localhost:3000/api/cart/add',
        {
          productId: product._id,
          itemType: 'Product',
          quantity: 1,
          price: product.price,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartMessage('Added to cart!');
      setTimeout(() => setCartMessage(''), 2000);
    } catch {
      setCartMessage('Failed to add to cart');
    }
  };

  return (
    <div className="container mt-3">
      <h2>Products</h2>
      {cartMessage && <div className="alert alert-success">{cartMessage}</div>}
      <div className="row">
        {products.map(p => (
          <div className="col-md-4" key={p._id}>
            <div className="card mb-3">
              <img src={p.imageBase64} className="card-img-top" alt={p.name} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p>{p.description}</p>
                <p><b>${p.price}</b></p>
                <button className="btn btn-primary" style={{ backgroundColor: "#fd7e14", color: "white" , border: "2px solid #fd7e14",}} onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
