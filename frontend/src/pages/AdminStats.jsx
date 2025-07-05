import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminStats({ token }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      const res = await axios.get('http://localhost:3000/api/stats', { headers: { Authorization: `Bearer ${token}` } });
      setStats(res.data);
    }
    fetchStats();
  }, [token]);

  if (!stats) return <div>Loading stats...</div>;

  return (
    <div>
      <h3>Website Statistics</h3>
      <ul>
        <li>Total Visitors: {stats.visitors}</li>
        <li>Total Products: {stats.products}</li>
        <li>Total Materials: {stats.materials}</li>
        <li>Total Courses: {stats.courses}</li>
      </ul>
    </div>
  );
}

export default AdminStats;
