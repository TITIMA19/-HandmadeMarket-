import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart({ token }) {
  const [cart, setCart] = useState({ items: [] });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchCart() {
      const res = await axios.get('http://localhost:3000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data);
    }
    fetchCart();
  }, [token]);

  useEffect(() => {
    let sum = 0;
    if (cart.items) {
      cart.items.forEach(item => sum += item.price * item.quantity);
    }
    setTotal(sum);
  }, [cart]);

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Prevent setting quantity below 1
    const updatedItems = cart.items.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    );
    setCart({ ...cart, items: updatedItems });
  };

  const removeProduct = (productId) => {
    const updatedItems = cart.items.filter(item => item.productId !== productId);
    setCart({ ...cart, items: updatedItems });
  };
  const handleCheckout = async () => {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/orders',
      {
        items: cart.items,
        total
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    alert("Order placed successfully!");
    setCart({ items: [] }); // Clear cart after order
    setTotal(0);
  } catch (err) {
    alert("Checkout failed: " + err.response?.data?.error || err.message);
  }
};


  return (
    <div className="table table-bordered">
      <h2>Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.items?.map((item, i) => (
            <tr key={i}>
              <td>{item.itemType} - {item.productId}</td>
              <td>
                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => removeProduct(item.productId)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total: ${total.toFixed(2)}</h4>
<button onClick={handleCheckout} className="btn btn-success">Checkout</button>
    </div>
  );
}

export default Cart;
