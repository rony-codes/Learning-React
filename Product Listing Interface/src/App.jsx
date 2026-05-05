import React, { useEffect, useState } from 'react'

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fecthData = async () => {
      try{
        setLoading(true);
        const res = await fetch("https://api.freeapi.app/api/v1/public/randomproducts");
        const json = await res.json();
        setData(json.data.data)
      }
      catch(err){
        console.log("Error:", err);
      } finally {
        setLoading(false)
      }
    }
    fecthData()
  }, [])

  if(loading) return <p>Loading...</p>

  return (
    <div className='container'>
      <h1 className='title'>Products</h1>

      <div className='grid'>
        {data.map((product) => (
          <div className='card' key={product.id}>
            <img src={product.images?.[0]} alt={product.title} />
            <h3>{product.title}</h3>
            <p className='price'>₹ {product.price}</p>
            <p className="category">{product.category}</p>
            <p className="desc">
              {product.description.slice(0, 80)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App