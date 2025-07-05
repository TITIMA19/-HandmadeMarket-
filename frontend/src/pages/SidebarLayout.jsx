// SidebarLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const SidebarLayout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="d-flex flex-column bg-light p-3" style={{ height: '100vh', width: '200px' }}>
      <h4 className="mb-4">Menu</h4>
      <Link to="/products" className="text-decoration-none text-dark mb-2"> Products</Link>
      <Link to="/materials" className="text-decoration-none text-dark mb-2"> Materials</Link>
      <Link to="/courses" className="text-decoration-none text-dark mb-2"> Courses</Link>
      <Link to="/cart" className="text-decoration-none text-dark">Cart</Link>
      </div>

      {/* Page content */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
