import React from 'react';

function CoursesList({ courses, addToCart }) {
  return (
    <div className="container mt-4">
      <h2>Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div className="col-md-4 mb-3" key={course._id}>
              <div className="card h-100">
                {course.imageBase64 && (
                  <img
                    src={course.imageBase64}
                    alt={course.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p className="card-text fw-bold">${course.price.toFixed(2)}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => addToCart(course)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CoursesList;
