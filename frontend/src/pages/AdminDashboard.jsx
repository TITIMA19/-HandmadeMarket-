import React, { useState } from 'react';
import AdminProducts from './AdminProducts';
import AdminMaterials from './AdminMaterials';
import AdminCourses from './AdminCourses';
import AdminStats from './AdminStats';

function AdminDashboard({ token }) {
  const [tab, setTab] = useState('products');

  return (
    <div className="container-fluid mt-4">
  <h1>Admin Dashboard</h1>
  <div className="row">
    {/* Sidebar */}
    <div className="col-md-3">
      <div className="list-group">
        <button
          className={`list-group-item list-group-item-action ${tab === 'products' ? 'active' : ''}`}
          onClick={() => setTab('products')}
        >
          Products
        </button>
        <button
          className={`list-group-item list-group-item-action ${tab === 'materials' ? 'active' : ''}`}
          onClick={() => setTab('materials')}
        >
          Materials
        </button>
        <button
          className={`list-group-item list-group-item-action ${tab === 'courses' ? 'active' : ''}`}
          onClick={() => setTab('courses')}
        >
          Courses
        </button>
        <button
          className={`list-group-item list-group-item-action ${tab === 'stats' ? 'active' : ''}`}
          onClick={() => setTab('stats')}
        >
          Stats
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="col-md-9">
      {tab === 'products' && <AdminProducts token={token} />}
      {tab === 'materials' && <AdminMaterials token={token} />}
      {tab === 'courses' && <AdminCourses token={token} />}
      {tab === 'stats' && <AdminStats token={token} />}
    </div>
  </div>
</div>

  );
}

export default AdminDashboard;
