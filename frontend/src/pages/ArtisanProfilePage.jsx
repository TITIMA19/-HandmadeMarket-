import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ArtisanProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/admin-profile').then((res) => {
      setProfile(res.data);
    });
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="container mt-4">
      <h2>Meet the Artisan: {profile.name}</h2>
      {profile.photoBase64 && (
        <img src={profile.photoBase64} alt="artisan" className="img-fluid mb-3" style={{ maxWidth: '300px' }} />
      )}
      <h4>About Me</h4>
      <p>{profile.bio}</p>
      <h4>My Vision</h4>
      <p>{profile.vision}</p>
    </div>
  );
}

export default ArtisanProfilePage;
