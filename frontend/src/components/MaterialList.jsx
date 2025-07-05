import React from 'react';

function MaterialsList({ materials, addToCart }) {
  return (
    <div className="container mt-4">
      <h2>Materials</h2>
      {materials.length === 0 ? (
        <p>No materials available.</p>
      ) : (
        <div className="row">
          {materials.map((material) => (
            <div className="col-md-4 mb-3" key={material._id}>
              <div className="card h-100">
                {material.imageBase64 && (
                  <img
                    src={material.imageBase64}
                    alt={material.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{material.name}</h5>
                  <p className="card-text">{material.description}</p>
                  <p className="card-text fw-bold">${material.price.toFixed(2)}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => addToCart(material)}
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

export default MaterialsList;