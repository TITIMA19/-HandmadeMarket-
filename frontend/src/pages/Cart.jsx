import React, { useState, useEffect } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> :
        <div>
          <ul className="list-group">
            {cart.map((item, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                {item.title} - ${item.price}
                <button className="btn btn-danger btn-sm" onClick={() => removeItem(i)}>Remove</button>
              </li>
            ))}
          </ul>
          <h4 className="mt-3">Total: ${total}</h4>
        </div>}
    </div>
  );
}

export default Cart;
