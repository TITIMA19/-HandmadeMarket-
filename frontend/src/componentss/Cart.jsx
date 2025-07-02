// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Cart = ({ userId }) => {
//     const [cartItems, setCartItems] = useState([]);

//     useEffect(() => {
//         const fetchCartItems = async () => {
//             const token = localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODYzZDY1MGQ3NzQyZmZiMjM1YjQ3YzgiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1MTM3MzUzNCwiZXhwIjoxNzUxMzc3MTM0fQ.ZY7B6BMchBeG1lon4n-LPnNlJ_wZrk0-wsb0VXQmQDg'); // Retrieve the token
//             try {
//                 const res = await axios.get("http://localhost:3000/api/user/cart", {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 setCartItems(res.data.cartItems); // Adjust based on your response structure
//             } catch (error) {
//                 console.error("Failed to fetch cart items:", error);
//             }
//         };

//         fetchCartItems();
//     }, [userId]);

//     return (
//         <div>
//             <h2>Your Cart</h2>
//             {cartItems.length > 0 ? (
//                 cartItems.map(item => (
//                     <div key={item.product}>
//                         <p>Product ID: {item.product}</p>
//                         <p>Quantity: {item.quantity}</p>
//                         <p>Price: {item.price}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No items in the cart.</p>
//             )}
//         </div>
//     );
// };

// export default Cart;
import React from "react";

export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h4>Cart Summary</h4>
      {cart.length === 0 ? <p>No items in cart</p> : (
        <ul className="list-group">
          {cart.map(item => (
            <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
              {item.title} × {item.quantity}
              <span>${item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
      <h5 className="mt-3">Total: ${total}</h5>
      <button className="btn btn-primary mt-2">Proceed to Payment</button>
    </div>
  );
}
