import React, { useEffect, useState } from 'react'

const App = () => {

  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("https://api.freeapi.app/api/v1/public/cats/cat/random");
      const json = await res.json();

      setCat(json.data)

    } catch (error) {
      setError('Something is wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container">
      <h1 className="title">🐱 Random Cat Viewer</h1>

      <button className="btn" onClick={fetchData}>
        Generate Cat
      </button>

      {/* Loading */}
      {loading && <p className="loading">Loading...</p>}

      {/* Error */}
      {error && <p className="error">Something went wrong</p>}

      {/* Cat Card */}
      {
        cat && (
          <div className="card">

            <img className="cat-img" src={cat.image} alt={cat.name} />

            <div className="card-body">
              <h2 className="cat-name">{cat.name}</h2>

              <div className="meta">
                <span className="badge">Origin: {cat.origin}</span>
                <span className="badge">Life: {cat.life_span} years</span>
              </div>

              <p className="desc">{cat.description}</p>
            </div>

          </div>
        )}
    </div>
  )
}

export default App