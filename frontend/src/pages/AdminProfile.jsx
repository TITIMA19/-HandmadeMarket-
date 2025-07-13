import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminProfile() {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    vision: '',
    photoBase64: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/admin-profile').then((res) => {
      if (res.data) setProfile(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, photoBase64: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/api/admin-profile', profile, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Profile saved!');
  };

  return (
    <div className="container mt-4">
      <h2>Update Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="form-control mb-2"
        />
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Short bio"
          className="form-control mb-2"
        />
        <textarea
          name="vision"
          value={profile.vision}
          onChange={handleChange}
          placeholder="Your artistic vision"
          className="form-control mb-2"
        />
        <input type="file" onChange={handleImage} className="form-control mb-2" />
        {profile.photoBase64 && (
          <img src={profile.photoBase64} alt="preview" width="150" className="mb-2" />
        )}
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default AdminProfile;
