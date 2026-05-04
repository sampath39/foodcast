import React, { useState } from "react";
import axios from "axios";

function App() {
  const [result, setResult] = useState(null);

  const getPrediction = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        registered_students: 500,
        day: 2,
        weather: 0,
        holiday: 0,
        event: 0
      });

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Backend not running!");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🍽️ FoodCast Dashboard</h1>

      <button onClick={getPrediction} style={{ padding: "10px", fontSize: "16px" }}>
        Predict Food Demand
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>👥 Predicted Diners: {result.predicted_diners}</h2>
          <h2>🍚 Food Required: {result.food_required_kg} kg</h2>
        </div>
      )}
    </div>
  );
}

export default App;