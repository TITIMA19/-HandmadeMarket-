import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminMaterials({ token }) {
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    imageBase64: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch materials list
  useEffect(() => {
    async function fetchMaterials() {
      try {
        const res = await axios.get('http://localhost:3000/api/materials', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMaterials(res.data);
      } catch (error) {
        console.error('Failed to fetch materials', error);
      }
    }
    fetchMaterials();
  }, [token]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload & convert to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, imageBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Submit add or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        // Update
        const res = await axios.put(
          `http://localhost:3000/api/materials/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMaterials((prev) =>
          prev.map((mat) => (mat._id === editingId ? res.data : mat))
        );
      } else {
        // Create
        const res = await axios.post('http://localhost:3000/api/materials', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMaterials((prev) => [...prev, res.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving material', error);
    }
    setLoading(false);
  };

  // Edit button clicked
  const handleEdit = (material) => {
    setEditingId(material._id);
    setForm({
      name: material.name,
      category: material.category,
      description: material.description || '',
      price: material.price,
      imageBase64: material.imageBase64 || '',
    });
  };

  // Delete material
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/materials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials((prev) => prev.filter((mat) => mat._id !== id));
    } catch (error) {
      console.error('Error deleting material', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: '',
      category: '',
      description: '',
      price: '',
      imageBase64: '',
    });
  };

  return (
    <div className="container mt-4">
      <h2>Admin Materials</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <input
          name="category"
          className="form-control mb-2"
          placeholder="Category"
          value={form.category}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
        />
        <input
          name="price"
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          value={form.price}
          onChange={handleInputChange}
          required
          min="0"
          step="0.01"
        />
        <input
          type="file"
          accept="image/*"
          className="form-control mb-2"
          onChange={handleImageChange}
        />
        {form.imageBase64 && (
          <img
            src={form.imageBase64}
            alt="Preview"
            style={{ maxWidth: '150px', marginBottom: '10px' }}
          />
        )}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {editingId ? 'Update Material' : 'Add Material'}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={resetForm}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </form>

      <h4>Materials List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price ($)</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((mat) => (
            <tr key={mat._id}>
              <td>{mat.name}</td>
              <td>{mat.category}</td>
              <td>{mat.description}</td>
              <td>{mat.price.toFixed(2)}</td>
              <td>
                {mat.imageBase64 && (
                  <img
                    src={mat.imageBase64}
                    alt={mat.name}
                    style={{ width: '80px', height: 'auto' }}
                  />
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(mat)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(mat._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {materials.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No materials found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMaterials;
