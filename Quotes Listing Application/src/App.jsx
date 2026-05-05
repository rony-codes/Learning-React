import React, { useEffect, useState } from 'react'

const App = () => {

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch("https://api.freeapi.app/api/v1/public/quotes")
        const json = await res.json()
        setQuotes(json.data.data)

      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="container">
      <h1 className="title">📜 Quotes</h1>



      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error">Something went wrong</p>}

      <div className="grid">

        {quotes.map((quote)=>(
          <div className='card' key={quote.id}>
            <p className="quote-text">"{quote.content}"</p>
            <p className="quote-author">— {quote.author}</p> 
            </div>        
        ))}


      </div>
    </div>
  );
}

export default App