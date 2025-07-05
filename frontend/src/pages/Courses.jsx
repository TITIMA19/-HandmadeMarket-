import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const res = await axios.get('http://localhost:3000/api/courses');
      setCourses(res.data);
    }
    fetchCourses();
  }, []);

  return (
    <div className="container mt-3">
      <h2>Courses</h2>
      <div className="row">
        {courses.map(c => (
          <div className="col-md-4 mb-3" key={c._id}>
            <div className="card">
              <img src={c.imageBase64} className="card-img-top" alt={c.title} />
              <div className="card-body">
                <h5>{c.title}</h5>
                <p>{c.description}</p>
                <p><strong>${c.price}</strong></p>
                {/* Add course purchase button or info here if needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
