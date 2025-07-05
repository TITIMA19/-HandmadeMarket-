import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

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

//   const handleApprove = (orderId) => {
//     alert('Payment Successful! Order ID: ' + orderId);
//     // TODO: Clear cart after successful payment
//   };

  return (
    <div className="table table-bordered">
      <h2>Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>Quantity</th><th>Price</th><th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.items?.map((item, i) => (
            <tr key={i}>
              <td>{item.itemType} - {item.productId}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total: ${total.toFixed(2)}</h4>

      {/* <PayPalScriptProvider options={{ "client-id": "test" }}>
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: { value: total.toFixed(2) }
              }]
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(details => {
              handleApprove(data.orderID);
            });
          }}
        />
      </PayPalScriptProvider> */}
    </div>
  );
}

export default Cart;
