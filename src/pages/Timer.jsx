import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [timer, setTimer] = useState();
  const [isRunning, setIsRunning] = useState(false);

  const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");

  const handleClick = () => {
    setIsRunning(!isRunning);
  };

  const handleTimer = (e) => {
    setTimer(e.target.value);
  }

  useEffect(() => {
    let intervalId;

    if (isRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      if (timer === 0) {
        setIsRunning(false);
        clearInterval(intervalId);
      }
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timer]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Focus Timer
        </h2>
        
        <div className="mb-8">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Duration (seconds):
          </label>
          <input 
            type="number" 
            placeholder="Enter seconds" 
            onChange={handleTimer} 
            className="w-full px-4 py-3 rounded-lg border border-purple-200 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 
                     focus:border-transparent transition-all duration-200
                     bg-purple-50"
          />
        </div>
        <div className="relative mb-8">
          <div className="text-8xl font-mono font-bold text-center tabular-nums tracking-tight
                        bg-gradient-to-r from-purple-600 to-indigo-600 
                        bg-clip-text text-transparent">
            {minutes}:{seconds}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-indigo-100 
                        opacity-10 blur-xl -z-10 rounded-full"></div>
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={handleClick}
            className={`px-8 py-3 rounded-lg font-semibold text-white 
                     transition-all duration-200 transform hover:scale-105
                     ${isRunning 
                       ? 'bg-red-500 hover:bg-red-600' 
                       : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                     }`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
         </div>
      </div>
    </div>
  );
};

export default Timer;
