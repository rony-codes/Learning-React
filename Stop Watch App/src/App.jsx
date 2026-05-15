import React from 'react'
import StopWatch from './components/StopWatch'

const App = () => {
  return (

    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center gap-10">

      <h1 className="text-5xl font-bold">
        Stopwatch & Timer
      </h1>

      <StopWatch />

    </div>

  )
}

export default App