import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    registered_students: 500,
    day: 2,
    weather: 0,
    holiday: 0,
    event: 0
  });

  const [result, setResult] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  // Call backend API
  const getPrediction = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("❌ Backend not connected");
    }
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>🍽️ FoodCast Dashboard</h1>

      {/* Input Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          name="registered_students"
          placeholder="Registered Students"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="day"
          placeholder="Day (0=Mon)"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="weather"
          placeholder="Weather (0=Sunny,1=Rainy)"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="holiday"
          placeholder="Holiday (0/1)"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="event"
          placeholder="Event (0/1)"
          onChange={handleChange}
        />
      </div>

      {/* Button */}
      <button onClick={getPrediction} style={{ padding: "10px" }}>
        Predict Food Demand
      </button>

      {/* Result */}
      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>👥 Predicted Diners: {result.predicted_diners}</h2>
          <h2>🍚 Food Required: {result.food_required_kg} kg</h2>
        </div>
      )}
    </div>
  );
}

export default App;