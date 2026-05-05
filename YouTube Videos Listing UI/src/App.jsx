import React, { useEffect, useState } from 'react'

const App = () => {

  const [videodata, setVideoData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const formatDuration = (duration) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    const h = match[1] || 0;
    const m = match[2] || 0;
    const s = match[3] || 0;

    if (h > 0) {
      return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch('https://api.freeapi.app/api/v1/public/youtube/videos');
      const json = await res.json()
      console.log(json.data.data)
      setVideoData(json.data.data)
    }
    catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className="container">
      <h1 className="title">📺 Video Feed</h1>

      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error">Something went wrong</p>}

      <div className="grid">
        {videodata.map((video) => (
          <div className="card" key={video.items.id}>

            <div className="thumbnail-wrapper">
              <img
                className="thumbnail"
                src={video.items.snippet.thumbnails.medium.url}
                alt={video.items.snippet.title}
              />
              <span className="duration">
                {formatDuration(video.items.contentDetails.duration)}
              </span>
            </div>

            <div className="video-info">
              <h3 className="video-title">
                {video.items.snippet.title}
              </h3>

              <p className="channel-name">
                {video.items.snippet.channelTitle}
              </p>

              <div className="video-meta">
                <span>{video.items.statistics.viewCount} views</span>
                <span>•</span>
                <span>Just now</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default App