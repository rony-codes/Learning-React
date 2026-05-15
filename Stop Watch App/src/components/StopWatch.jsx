import React, { useEffect, useState } from 'react'

const StopWatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {

        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTime(prev => prev + 10)
            }, 10)
        }

        return () => clearInterval(interval)
    }, [isRunning])

    const minutes = Math.floor(time / 60000)

    const seconds = Math.floor((time % 60000) / 1000)

    const milliseconds = Math.floor((time % 1000) / 10)

    const formatTime = () => {
        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0") +
            ":" +
            String(milliseconds).padStart(2, "0")
        )
    }
    return (

        <div className="bg-slate-800 p-8 rounded-2xl shadow-lg">

            <h2 className="text-3xl font-bold text-center mb-6">
                Stopwatch
            </h2>

            <h1 className="text-6xl font-mono text-center mb-8">
                {formatTime()}
            </h1>

            <div className="flex gap-3">

                <button onClick={() => setIsRunning(true)} className="bg-green-500 px-4 py-3 rounded-xl flex-1 font-semibold">
                    Start
                </button>

                <button onClick={() => setIsRunning(false)} className="bg-yellow-500 px-4 py-3 rounded-xl flex-1 font-semibold">
                    Pause
                </button>

                <button onClick={() => { setIsRunning(false) 
                    setTime(0) }} className="bg-red-500 px-4 py-3 rounded-xl flex-1 font-semibold">
                    Reset
                </button>

            </div>

        </div>

    )
}

export default StopWatch