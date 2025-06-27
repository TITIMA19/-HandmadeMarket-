import React from 'react';
import Logo from "../assets/Logo/tazrart.png";

function AdminDashboard() {
  return (
    <div className="d-flex">
      <aside className="sidebar bg-light">
        <div className="sidebar-header text-center">
          <img src={Logo} alt="Logo" className="mb-4" width="100"/>
          <h3>Admin Panel</h3>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="users">Users</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Products</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Orders</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Reports</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Settings</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </aside>

      <main className="main-content p-4">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1>Dashboard</h1>
          <div>
            <button className="btn btn-primary">Add User</button>
          </div>
        </header>

        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">120</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Products</h5>
                <p className="card-text">300</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Orders</h5>
                <p className="card-text">150</p>
              </div>
            </div>
          </div>
        </div>

        <h2>Recent Activities</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Activity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>Added a new product</td>
              <td>2023-06-25</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>Updated user details</td>
              <td>2023-06-24</td>
            </tr>
            <tr>
              <td>Mike Johnson</td>
              <td>Placed an order</td>
              <td>2023-06-23</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default AdminDashboard;