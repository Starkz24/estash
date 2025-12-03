import React, { useEffect, useState } from 'react';
import "../../CSS/scanner.css";

const Scanner = () => {
  const [boxes, setBoxes] = useState([]);
  const [points, setPoints] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const elements = [
    "Air-Conditioner", "Bar-Phone", "Battery", "Blood-Pressure-Monitor", "Boiler",
    "CRT-Monitor", "CRT-TV", "Calculator", "Camera", "Ceiling-Fan", "Christmas-Lights",
    "Clothes-Iron", "Coffee-Machine", "Compact-Fluorescent-Lamps", "Computer-Keyboard",
    "Computer-Mouse", "Cooled-Dispenser", "Cooling-Display", "Dehumidifier", "Desktop-PC",
    "Digital-Oscilloscope", "Dishwasher", "Drone", "Electric-Bicycle", "Electric-Guitar",
    "Electrocardiograph-Machine", "Electronic-Keyboard", "Exhaust-Fan", "Flashlight",
    "Flat-Panel-Monitor", "Flat-Panel-TV", "Floor-Fan", "Freezer", "Glucose-Meter",
    "HDD", "Hair-Dryer", "Headphone", "LED-Bulb", "Laptop", "Microwave", "Music-Player",
    "Neon-Sign", "Network-Switch", "Non-Cooled-Dispenser", "Oven", "PCB",
    "Patient-Monitoring-System", "Photovoltaic-Panel", "PlayStation-5", "Power-Adapter",
    "Printer", "Projector", "Pulse-Oximeter", "Range-Hood", "Refrigerator",
    "Rotary-Mower", "Router", "SSD", "Server", "Smart-Watch", "Smartphone",
    "Smoke-Detector", "Soldering-Iron", "Speaker", "Stove",
    "Straight-Tube-Fluorescent-Lamp", "Street-Lamp", "TV-Remote-Control", "Table-Lamp",
    "Tablet", "Telephone-Set", "Toaster", "Tumble-Dryer", "USB-Flash-Drive",
    "Vacuum-Cleaner", "Washing-Machine", "Xbox-Series-X"
  ];

  const elementPoints = [
    100, 10, 15, 20, 40, 60, 70, 8, 18, 25, 10,
    15, 20, 8, 10, 8, 40, 60, 35, 45, 55, 70,
    25, 80, 25, 55, 25, 15, 5, 40, 60, 18, 80,
    10, 12, 12, 10, 5, 35, 30, 15, 20, 20, 25,
    50, 5, 55, 70, 50, 6, 25, 30, 10, 30, 90,
    50, 15, 10, 70, 15, 25, 10, 8, 15, 40,
    8, 50, 5, 10, 20, 10, 12, 75, 5, 35, 95,
    50
  ];

  const handleUpload = async (event) => {
    setError('');
    setLoading(true); 

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image_file", file);

    try {
      const response = await fetch("http://localhost:4000/detect", {
        method: "POST",
        body: formData
      });

      const detected = (await response.json())[0];
      const index = elements.indexOf(detected);

      if (index !== -1) {
        const itemPoints = elementPoints[index];

        setBoxes(prev => [...prev, { name: detected, points: itemPoints }]);
        setPoints(prev => prev + itemPoints);
      } else {
        setError("Unknown item detected");
      }
    } catch (err) {
      setError("Error detecting object");
    }

    setLoading(false); 
  };

  useEffect(() => {
    async function updatePoints() {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:1337/api/points", {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ points })
      });
    }
    updatePoints();
  }, [points]);

  return (
    <div>
      <div className="button-borders mt-3">
        <label htmlFor="fileInput" className="primary-button">
          UPLOAD POINTS: {points}
          <input id="fileInput" type="file" onChange={handleUpload} style={{ display: "none" }} />
        </label>
      </div>

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p className="text-white mt-3">Calculating... Please wait</p>
        </div>
      )}

      {error && <div className="error-message text-white">{error}</div>}

      {!loading && (
        <div className="button-borders mt-7">
          <button className="primary-button">
            {boxes.map((box, index) => (
              <li key={index} className="points">
                {box.name} — {box.points} pts
              </li>
            ))}
          </button>
        </div>
      )}
    </div>
  );
};

export default Scanner;
