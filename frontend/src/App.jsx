import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Shop from './components/Shop';
import LandingPages from './components/LandingPages';
import Login from './components/login';
import Register from './components/Register';
import Cart from './components/Cart';
import AdminDashboard from './page/AdminDashboard';
import Users from './page/Users'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/admindashbord" element={<  AdminDashboard/>} />
          <Route path="/users" element={<  Users/>} />
      </Routes>
    </Router>
  );
}

export default App;
