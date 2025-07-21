// import React, { useState } from 'react';
// import AdminProducts from './AdminProducts';
// import AdminMaterials from './AdminMaterials';
// import AdminCourses from './AdminCourses';
// import AdminStats from './AdminStats';

// function AdminDashboard({ token }) {
//   const [tab, setTab] = useState('products');

//   return (
//     <div className="container-fluid mt-4">
//   <h1>Admin Dashboard</h1>
//   <div className="row">
//     {/* Sidebar */}
//     <div className="col-md-3">
//       <div className="list-group">
//         <button
//           className={`list-group-item list-group-item-action ${tab === 'products' ? 'active' : ''}`}
//           onClick={() => setTab('products')}
//         >
//           Products
//         </button>
//         <button
//           className={`list-group-item list-group-item-action ${tab === 'materials' ? 'active' : ''}`}
//           onClick={() => setTab('materials')}
//         >
//           Materials
//         </button>
//         <button
//           className={`list-group-item list-group-item-action ${tab === 'courses' ? 'active' : ''}`}
//           onClick={() => setTab('courses')}
//         >
//           Courses
//         </button>
//         <button
//           className={`list-group-item list-group-item-action ${tab === 'stats' ? 'active' : ''}`}
//           onClick={() => setTab('stats')}
//         >
//           Stats
//         </button>
//       </div>
//     </div>

//     {/* Content */}
//     <div className="col-md-9">
//       {tab === 'products' && <AdminProducts token={token} />}
//       {tab === 'materials' && <AdminMaterials token={token} />}
//       {tab === 'courses' && <AdminCourses token={token} />}
//       {tab === 'stats' && <AdminStats token={token} />}
//     </div>
//   </div>
// </div>

//   );
// }

// export default AdminDashboard;
import React, { useState } from 'react';
import AdminProducts from './AdminProducts';
import AdminMaterials from './AdminMaterials';
import AdminCourses from './AdminCourses';
import AdminStats from './AdminStats';

function AdminDashboard({ token }) {
  const [tab, setTab] = useState('products');

  return (
    <div className="container-fluid mt-4">
      <h1 className="mb-4 text-center text-orange">Admin Dashboard</h1>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-3">
          <div className="list-group shadow rounded">
            <button
              className={`list-group-item list-group-item-action ${tab === 'products' ? 'active bg-primary text-white' : ''}`}
              onClick={() => setTab('products')}
            >
              Products
            </button>
            <button
              className={`list-group-item list-group-item-action ${tab === 'materials' ? 'active bg-primary text-white' : ''}`}
              onClick={() => setTab('materials')}
            >
              Materials
            </button>
            <button
              className={`list-group-item list-group-item-action ${tab === 'courses' ? 'active bg-primarytext-dark' : ''}`}
              onClick={() => setTab('courses')}
            >
              Courses
            </button>
            <button
              className={`list-group-item list-group-item-action ${tab === 'stats' ? 'active bg-primary text-white' : ''}`}
              onClick={() => setTab('stats')}
            >
              Stats
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="col-md-9">
          <div className="card shadow rounded">
            <div className="card-body">
              {tab === 'products' && <AdminProducts token={token} />}
              {tab === 'materials' && <AdminMaterials token={token} />}
              {tab === 'courses' && <AdminCourses token={token} />}
              {tab === 'stats' && <AdminStats token={token} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
