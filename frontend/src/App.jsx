import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import Materials from './pages/Materials';
import Courses from './pages/Courses';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';
import ArtisanProfilePage from './pages/ArtisanProfilePage';
// import OrderHistory from './pages/OrderHistory';
function App() {
  const [user, setUser] = useState(null); // { token, role, name }
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setCartItems([]);
    localStorage.removeItem('user');
  };

  return (
    <>
      <Navbar user={user} cartItems={cartItems} onLogout={logout} />
      <Routes>
       
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login login={login} />} />
        
        {user &&  (
          <>
            <Route path="/home" element={<Home/>}/>
            <Route path="/products" element={<Products token={user.token}/>}/>
            <Route path="/materials" element={<Materials token={user.token}/>}/>
            <Route path="/courses" element={<Courses />} />
            <Route path="/cart" element={<Cart token={user.token} />} />
            {/* <Route path="/orders" element={<OrderHistory token={user.token} />} /> */}

            <Route path="/about-artisan" element={<ArtisanProfilePage />} />
          </>
        )} 

        {user && user.role === 'admin' && ( 
          <><Route path="/admin" element={<AdminDashboard token={user.token} />} /><Route path="/admin/profile" element={<AdminProfile />} /></>
        )}
      </Routes>
    </>
  );
}

export default App;

