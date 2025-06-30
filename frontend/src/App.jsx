import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Material from './components/Materials';
import Shop from './components/Shop';
import LandingPages from './components/LandingPages';
import Login from './components/login';
import Register from './components/Register';
import Cart from './components/Cart';
// import User from './components/User'
import "./App.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/material" element={<Material/>} />
          {/* <Route path="/user" element={<  User/>} /> */}

      </Routes>
    </Router>
  );
}

export default App;
