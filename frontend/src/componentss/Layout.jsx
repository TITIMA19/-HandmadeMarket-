// components/Layout.jsx
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

export default function Layout() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/products").then((res) => setProducts(res.data));
  }, []);

  const handleAddToCart = (product, quantity) => {
    const exists = cart.find(item => item._id === product._id);
    if (exists) {
      setCart(cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Outlet context={{ user, setUser, products, cart, handleAddToCart }} />
    </>
  );
}
