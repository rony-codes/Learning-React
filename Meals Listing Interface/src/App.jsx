import React, { useEffect, useState } from 'react'




const App = () => {

  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("https://api.freeapi.app/api/v1/public/meals")
      const json = await res.json()
      setMeal(json.data.data)

    } catch (error) {
      console.log("Error", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => fetchData(), [])


  return (
    <div className="container">
      <h1 className="title">🍽️ Meals</h1>

      {loading && <p>Loading...</p>}

      <div className="grid">
        {meal.map((item) => (
          <div className="card" key={item.idMeal}>
            <img src={item.strMealThumb} alt={item.strMeal} />
            <h3>{item.strMeal}</h3>
            <p>{item.strCategory}</p>
            <p>{item.strArea}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App