import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminCourses({ token }) {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    imageBase64: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all courses on load
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axios.get('http://localhost:3000/api/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      }
    }
    fetchCourses();
  }, [token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file input & convert to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, imageBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Submit form: create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        // Update existing course
        const res = await axios.put(
          `http://localhost:3000/api/courses/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourses((prev) =>
          prev.map((c) => (c._id === editingId ? res.data : c))
        );
      } else {
        // Create new course
        const res = await axios.post('http://localhost:3000/api/courses', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses((prev) => [...prev, res.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving course', error);
    }
    setLoading(false);
  };

  // Start editing course
  const handleEdit = (course) => {
    setEditingId(course._id);
    setForm({
      title: course.title,
      description: course.description || '',
      price: course.price,
      imageBase64: course.imageBase64 || '',
    });
  };

  // Delete course
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error('Error deleting course', error);
    }
  };

  // Reset form to empty
  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: '',
      description: '',
      price: '',
      imageBase64: '',
    });
  };

  return (
    <div className="container mt-4">
      <h2>Admin Courses</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="title"
          className="form-control mb-2"
          placeholder="Title"
          value={form.title}
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
          {editingId ? 'Update Course' : 'Add Course'}
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

      <h4>Courses List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price ($)</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.price.toFixed(2)}</td>
              <td>
                {course.imageBase64 && (
                  <img
                    src={course.imageBase64}
                    alt={course.title}
                    style={{ width: '80px', height: 'auto' }}
                  />
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {courses.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCourses;

