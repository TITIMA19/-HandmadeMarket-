import React, { useState, useEffect } from 'react';
import API from '../api';

function AdminDashboard() {
  const [productForm, setProductForm] = useState({ title: '', description: '', image: '', price: '' });
  const [materialForm, setMaterialForm] = useState({ title: '', description: '', image: '', price: '' });
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingMaterial, setEditingMaterial] = useState(null);

  // Load products and materials
  useEffect(() => {
    fetchProducts();
    fetchMaterials();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const fetchMaterials = async () => {
    const res = await API.get("/materials");
    setMaterials(res.data);
  };

  // Handle product creation/update
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      await API.put(`/products/${editingProduct._id}`, productForm);
    } else {
      await API.post("/products", productForm);
    }
    setProductForm({ title: '', description: '', image: '', price: '' });
    setEditingProduct(null);
    fetchProducts();
  };

  const handleEditProduct = (product) => {
    setProductForm(product);
    setEditingProduct(product);
  };

  const handleDeleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  // Handle material creation/update
  const handleMaterialSubmit = async (e) => {
    e.preventDefault();
    if (editingMaterial) {
      await API.put(`/materials/${editingMaterial._id}`, materialForm);
    } else {
      await API.post("/materials", materialForm);
    }
    setMaterialForm({ title: '', description: '', image: '', price: '' });
    setEditingMaterial(null);
    fetchMaterials();
  };

  const handleEditMaterial = (material) => {
    setMaterialForm(material);
    setEditingMaterial(material);
  };

  const handleDeleteMaterial = async (id) => {
    await API.delete(`/materials/${id}`);
    fetchMaterials();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      {/* PRODUCTS SECTION */}
      <div className="mb-5">
        <h4>Products ({products.length})</h4>
        <form onSubmit={handleProductSubmit} className="mb-3 row g-2">
          <div className="col-md-2"><input value={productForm.title} onChange={(e) => setProductForm({ ...productForm, title: e.target.value })} className="form-control" placeholder="Title" required /></div>
          <div className="col-md-2"><input value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} className="form-control" placeholder="Description" required /></div>
          <div className="col-md-2"><input value={productForm.image} onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} className="form-control" placeholder="Image URL" required /></div>
          <div className="col-md-2"><input type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })} className="form-control" placeholder="Price" required /></div>
          <div className="col-md-2">
            <button className="btn btn-success w-100">{editingProduct ? "Update" : "Add"}</button>
          </div>
          {editingProduct && <div className="col-md-2"><button onClick={() => { setProductForm({ title: '', description: '', image: '', price: '' }); setEditingProduct(null); }} className="btn btn-secondary w-100">Cancel</button></div>}
        </form>
        <ul className="list-group">
          {products.map(p => (
            <li key={p._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{p.title} - ${p.price}</span>
              <div>
                <button onClick={() => handleEditProduct(p)} className="btn btn-sm btn-warning me-2">Edit</button>
                <button onClick={() => handleDeleteProduct(p._id)} className="btn btn-sm btn-danger">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* MATERIALS SECTION */}
      <div>
        <h4>Materials ({materials.length})</h4>
        <form onSubmit={handleMaterialSubmit} className="mb-3 row g-2">
          <div className="col-md-2"><input value={materialForm.title} onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })} className="form-control" placeholder="Title" required /></div>
          <div className="col-md-2"><input value={materialForm.description} onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })} className="form-control" placeholder="Description" required /></div>
          <div className="col-md-2"><input value={materialForm.image} onChange={(e) => setMaterialForm({ ...materialForm, image: e.target.value })} className="form-control" placeholder="Image URL" required /></div>
          <div className="col-md-2"><input type="number" value={materialForm.price} onChange={(e) => setMaterialForm({ ...materialForm, price: parseFloat(e.target.value) })} className="form-control" placeholder="Price" required /></div>
          <div className="col-md-2">
            <button className="btn btn-success w-100">{editingMaterial ? "Update" : "Add"}</button>
          </div>
          {editingMaterial && <div className="col-md-2"><button onClick={() => { setMaterialForm({ title: '', description: '', image: '', price: '' }); setEditingMaterial(null); }} className="btn btn-secondary w-100">Cancel</button></div>}
        </form>
        <ul className="list-group">
          {materials.map(m => (
            <li key={m._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{m.title} - ${m.price}</span>
              <div>
                <button onClick={() => handleEditMaterial(m)} className="btn btn-sm btn-warning me-2">Edit</button>
                <button onClick={() => handleDeleteMaterial(m._id)} className="btn btn-sm btn-danger">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
