import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchJokes = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/randomjokes"
      );
      const json = await res.json();

      setData(json.data.data); // array of jokes
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  const nextJoke = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1 className="title">😂 Joke Viewer</h1>

      {data.length > 0 && (
        <div className="joke-card">
          <p className="punchline">{data[index].content}</p>
        </div>
      )}

      <button className="btn" onClick={nextJoke}>
        Random Joke generator
      </button>
    </div>
  );
};

export default App;