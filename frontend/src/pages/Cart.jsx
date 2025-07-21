// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// function Cart({ token }) {
//   const [cart, setCart] = useState({ items: [] });
//   const [total, setTotal] = useState(0);
//   const [showPayPal, setShowPayPal] = useState(false);

//   useEffect(() => {
//     async function fetchCart() {
//       const res = await axios.get('http://localhost:3000/api/cart', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setCart(res.data);
//     }
//     fetchCart();
//   }, [token]);

//   useEffect(() => {
//     let sum = 0;
//     if (cart.items) {
//       cart.items.forEach(item => sum += item.price * item.quantity);
//     }
//     setTotal(sum);
//   }, [cart]);

//   const updateQuantity = (productId, quantity) => {
//     if (quantity < 1) return;
//     const updatedItems = cart.items.map(item => 
//       item.productId === productId ? { ...item, quantity } : item
//     );
//     setCart({ ...cart, items: updatedItems });
//   };

//   const removeProduct = (productId) => {
//     const updatedItems = cart.items.filter(item => item.productId !== productId);
//     setCart({ ...cart, items: updatedItems });
//   };

//   return (
//     <div className="table table-bordered">
//       <h2>Cart</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Subtotal</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cart.items?.map((item, i) => (
//             <tr key={i}>
//               <td>{item.itemType} - {item.productId}</td>
//               <td>
//                 <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
//                 {item.quantity}
//                 <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
//               </td>
//               <td>${item.price.toFixed(2)}</td>
//               <td>${(item.price * item.quantity).toFixed(2)}</td>
//               <td>
//                 <button onClick={() => removeProduct(item.productId)}>Remove</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h4>Total: ${total.toFixed(2)}</h4>

//       {!showPayPal ? (
//         <button className="btn btn-success" onClick={() => setShowPayPal(true)}>Proceed to Checkout</button>
//       ) : (
//         <PayPalScriptProvider options={{ "client-id": "AUaPgO0_-nWxLwxGsOJtc34SoUz7xbFVYO2DH-R7Yjt0AVGo8f9yE4l79ZMpNxT9V5i9OWBcXy5I7xZ-" }}>
//           <PayPalButtons
//             style={{ layout: "vertical" }}
//             createOrder={(data, actions) => {
//               return actions.order.create({
//                 purchase_units: [{
//                   amount: { value: total.toFixed(2) }
//                 }]
//               });
//             }}
//             onApprove={(data, actions) => {
//               return actions.order.capture().then(details => {
//                 alert(`Payment completed by ${details.payer.name.given_name}`);
//                 // Optionally you can clear the cart or call your backend here
//               });
//             }}
//           />
//         </PayPalScriptProvider>
//       )}
//     </div>
//   );
// }

// export default Cart;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Cart({ token }) {
  const [cart, setCart] = useState({ items: [] });
  const [total, setTotal] = useState(0);
  const [showPayPal, setShowPayPal] = useState(false);

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
    if (quantity < 1) return;
    const updatedItems = cart.items.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCart({ ...cart, items: updatedItems });
  };

  const removeProduct = (productId) => {
    const updatedItems = cart.items.filter(item => item.productId !== productId);
    setCart({ ...cart, items: updatedItems });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Shopping Cart</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th style={{ width: "180px" }}>Quantity</th>
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
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <button className="btn btn-sm btn-outline-danger" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-sm btn-outline-success" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                </div>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => removeProduct(item.productId)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>Total: <span className="text-darck">${total.toFixed(2)}</span></h4>
        {!showPayPal ? (
          <button className="btn btn-primary btn-lg" style={{ backgroundColor: "#fd7e14", color: "white" , border: "2px solid #fd7e14",}} onClick={() => setShowPayPal(true)}>
            Checkout
          </button>
        ) : (
          <div style={{ width: '350px' }}>
            <PayPalScriptProvider options={{ "client-id": "AUaPgO0_-nWxLwxGsOJtc34SoUz7xbFVYO2DH-R7Yjt0AVGo8f9yE4l79ZMpNxT9V5i9OWBcXy5I7xZ-" }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: { value: total.toFixed(2) }
                    }]
                  });
                }}
                onApprove={async (_data, actions) => {
                  const details = await actions.order.capture();
                  alert(`Payment completed by ${details.payer.name.given_name}`);
                }}
              />
            </PayPalScriptProvider>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
