import React, { useState, useEffect } from 'react';
import Scanner from './Scanner';
import Stats from './Stats';

const App = () => {
  const [points, setPoints] = useState(0);

  const updatePoints = (newPoints) => {
    setPoints(newPoints);
  };

  useEffect(() => {
    async function fetchPoints() {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("/api/points", {
          method: "POST",
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ points: 0 }),
        });

        if (response.ok) {
          const data = await response.json();
          const { points } = data;

          setPoints(points);
        } else {
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchPoints();
  }, []);

  return (
    <div>
      <Scanner points={points} updatePoints={updatePoints} />
      <Stats points={points} />
    </div>
  );
}

export default App;
