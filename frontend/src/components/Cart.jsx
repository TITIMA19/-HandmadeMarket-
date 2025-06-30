import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from '../assets/Logo/tazrart.png'; 
export default function Cart() {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const userId = '685dd0f8fcae4d5aa26be601';
    try {
      const res = await axios.get(`http://localhost:3000/cart/${userId}`);
      setCart(res.data.cart.products);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  const removeFromCart = async (itemId, itemType) => {
    try {
      await axios.put(`http://localhost:3000/cart/${userId}/remove`, {
        itemId,
        itemType,
      });
      fetchCart(); // reload cart after deletion
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-light px-4" style={{ backgroundColor: "#f2f2f2" }}>
             <a className="navbar-brand" href="/">
               <img src={Logo} alt="Logo" style={{ height: "80px", width: "auto", borderRadius: "50%", objectFit: "cover" }} className="d-inline-block align-text-top" />
             </a>
            
           </nav>
      <div className="container my-5">
        <h2 className="text-center mb-4">Your Shopping Cart</h2>

        <div className="table-responsive">
          <table className="table align-middle table-bordered bg-white">
            <thead className="table-primary">
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                cart.map((item) => (
                  <tr key={item.itemId}>
                    <td>
                      <img
                        src={`http://localhost:3000/uploads/${item.image || "placeholder.jpg"}`}
                        width="80"
                        alt="Product"
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          removeFromCart(item.itemId, item.itemType)
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="row mt-4">
          <div className="col-md-6 offset-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <p className="card-text">Subtotal: <strong>${getTotal().toFixed(2)}</strong></p>
                <p className="card-text">Shipping: <strong>$5.00</strong></p>
                <p className="card-text">Total: <strong>${(getTotal() + 5).toFixed(2)}</strong></p>
                <a href="#" className="btn btn-success w-100">Proceed to Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>

       <footer className="text-white py-5 mt-5" style={{ backgroundColor: "#fd7e14" }}>
       <div className="container">
         <div className="row">
           {/* Left: Logo + Description + Social Links */}
           <div className="col-md-4 mb-4 mb-md-0">
             <div className="mb-2">
               <img
                 src={Logo}
                 alt="Logo"
                 style={{
                   height: "80px",
                   width: "auto",
                   borderRadius: "50%",
                   objectFit: "cover",
                 }}
                 className="d-inline-block align-text-top"
               />
             </div>
             <p className="text-light">
               Handmade Market — your destination for unique artisan products made
               with love and tradition.
             </p>
             <div>
               <a href="#" className="text-white me-3">
                 <i className="bi bi-facebook"></i>
               </a>
               <a href="#" className="text-white me-3">
                 <i className="bi bi-instagram"></i>
               </a>
               <a href="#" className="text-white me-3">
                 <i className="bi bi-twitter-x"></i>
               </a>
               <a href="#" className="text-white">
                 <i className="bi bi-youtube"></i>
               </a>
             </div>
           </div>
     
           {/* Middle: Projects */}
           <div className="col-md-4">
             <h5 className="mb-3">Our Projects</h5>
             <ul className="list-unstyled">
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Leather Collection
                 </a>
               </li>
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Traditional Pottery
                 </a>
               </li>
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Rural Artisans Support
                 </a>
               </li>
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Custom Orders
                 </a>
               </li>
             </ul>
           </div>
     
           {/* Right: Categories and Materials */}
           <div className="col-md-4">
             <h5 className="mb-3">Categories</h5>
             <ul className="list-unstyled">
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Accessories
                 </a>
               </li>
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Home Decor
                 </a>
               </li>
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Fashion
                 </a>
               </li>
             </ul>
             <h5 className="mt-4 mb-3">Materials</h5>
             <ul className="list-unstyled">
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Clay
                 </a>
               </li>
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Leather
                 </a>
               </li>
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Wood
                 </a>
               </li>
             </ul>
              <h5 className="mt-4 mb-3">Machine</h5>
             <ul className="list-unstyled">
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Clay
                 </a>
               </li>
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Leather
                 </a>
               </li>
               <li>
                 <a href="#" className="text-white text-decoration-none">
                   Wood
                 </a>
               </li>
             </ul>
           </div>
         </div>
     
         {/* Footer Bottom */}
         <div className="text-center mt-5 pt-3 border-top border-white">
           <p className="mb-0 text-white-50">
             &copy; {new Date().getFullYear()} Handmade Market. All rights reserved.
           </p>
         </div>
       </div>
     </footer>
    </div>
  );
}
