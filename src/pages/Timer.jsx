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
    <div className="border p-4 flex flex-col items-center">
      <input type="number" placeholder='Input Timer In seconds' onChange={handleTimer} className="bg-blue-300 rounded p-2 border-2"/>
      <h1 className="text-4xl font-bold mb-4">{minutes}:{seconds}</h1>
      <button 
        onClick={handleClick} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default Timer;
