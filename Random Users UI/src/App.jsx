import React, { useEffect, useState } from 'react';

const App = () => {

  const [user, setUser] = useState(null); // ✅ single user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers");
      const json = await res.json();

      const users = json.data.data;

      const randomUser = users[Math.floor(Math.random() * users.length)];

      setUser(randomUser);

    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); 
  }, []);

  return (
    <div className="container">
      <h1 className="title">🎲 Random User</h1>

      <button className="btn" onClick={fetchUser}>
        Generate User
      </button>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {user && (
        <div className="profile-card">

          <img className="avatar" src={user.picture.large} alt={user.name.first} />

          <h2 className="name">
            {user.name.first} {user.name.last}
          </h2>

          <p className="email">{user.email}</p>

          <div className="meta">
            <span className="badge">{user.gender}</span>
            <span className="badge">{user.location.country}</span>
          </div>

        </div>
      )}
    </div>
  );
};

export default App;