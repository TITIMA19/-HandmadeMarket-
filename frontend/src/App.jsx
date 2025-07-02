// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Material from './components/Materials';
// import Shop from './components/Shop';
// import LandingPages from './components/LandingPages';
// import Login from './components/login';
// import Register from './components/Register';
// import Cart from './components/Cart';

// import "./App.css"
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPages />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/shop" element={<Shop />} />
//          <Route path="/cart" element={<Cart />} />
//          <Route path="/material" element={<Material/>} />
//           {/* <Route path="/user" element={<  User/>} /> */}

//       </Routes>
//     </Router>
//   );
// }
// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Products from "./pages/Products";
import Materials from "./pages/Materials";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
