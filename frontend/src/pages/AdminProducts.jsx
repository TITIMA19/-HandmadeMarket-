import React, { useEffect, useState } from 'react';
import axios from 'axios';
const categories = ['Accessories', 'Home Decor', 'Fashion'];
function AdminProducts({ token }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', description: '', price: '', imageBase64: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err); // Log full error for debugging
      alert('Failed to fetch products. Please check the console for more details.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, imageBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, description, price, imageBase64 } = form;

    if (!name || !category || !price) {
      alert('Name, Category, and Price are required');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/products/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Product updated!');
      } else {
        await axios.post('http://localhost:3000/api/products', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Product added!');
      }

      setForm({ name: '', category: '', description: '', price: '', imageBase64: '' });
      setEditingId(null);
      fetchProducts();
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      console.error("Error:", err); // Log the entire error object
      alert('Error: ' + (err.response?.data?.message || 'Failed'));
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      imageBase64: product.imageBase64,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete product?')) return;
    await axios.delete(`http://localhost:3000/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchProducts();
  };

  return (
    <div>
      <h3>{editingId ? 'Edit Product' : 'Add Product'}</h3>
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
          required
        />
       <select
       name="category"
       className="form-control mb-2"
       value={form.category}
       onChange={handleInputChange}
      required
        >
      <option value="">Sélectionnez une catégorie</option>
      {categories.map((cat) => (
       <option key={cat} value={cat}>{cat}</option>
       ))}
      </select>
        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
        />
        <input
          name="price"
          className="form-control mb-2"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="form-control mb-2"
          onChange={handleImageChange}
        />
        {form.imageBase64 && <img src={form.imageBase64} alt="preview" style={{ maxWidth: '150px', marginBottom: '10px' }} />}
        <button className="btn btn-primary" type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && (
          <button className="btn btn-secondary ms-2" onClick={() => { setEditingId(null); setForm({ name: '', category: '', description: '', price: '', imageBase64: '' }); }}>
            Cancel
          </button>
        )}
      </form>

      <h4 className="mt-4">Products List</h4>
      <table className="table table-bordered">
        <thead>
          <tr><th>Name</th><th>Category</th><th>Price</th><th>Image</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td><img src={p.imageBase64} alt={p.name} style={{ width: '80px' }} /></td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;

