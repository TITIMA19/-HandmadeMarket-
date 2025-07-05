import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Materials({ token }) {
  const [materials, setMaterials] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchMaterials() {
      const res = await axios.get('http://localhost:3000/api/materials');
      setMaterials(res.data);
    }
    fetchMaterials();
  }, []);

  const addToCart = async (material) => {
    try {
      await axios.post('http://localhost:3000/api/cart/add',
        { productId: material._id, itemType: 'Material', quantity: 1, price: material.price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } catch {
      setMessage('Failed to add to cart.');
    }
  };

  return (
    <div className="container mt-3">
      <h2>Materials</h2>
      {message && <div className="alert alert-success">{message}</div>}
      <div className="row">
        {materials.map(m => (
          <div className="col-md-4 mb-3" key={m._id}>
            <div className="card">
              <img src={m.imageBase64} className="card-img-top" alt={m.name} />
              <div className="card-body">
                <h5>{m.name}</h5>
                <p>{m.description}</p>
                <p><strong>${m.price}</strong></p>
                <button className="btn btn-success" style={{ backgroundColor: "#fd7e14", color: "white" , border: "2px solid #fd7e14",}} onClick={() => addToCart(m)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Materials;
