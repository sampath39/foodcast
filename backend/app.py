from flask import Flask, request, jsonify
from flask_cors import CORS
from model import train_model

app = Flask(__name__)
CORS(app)

model = train_model()

# ✅ Home route
@app.route("/")
def home():
    return "FoodCast Backend Running ✅"

# ✅ POST API (UPDATED)
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    input_data = [[
        data['registered_students'],
        data['day'],
        data['weather'],
        data['holiday'],
        data['event']
    ]]

    # 🔹 ML prediction
    ml_prediction = model.predict(input_data)[0]

    # 🔥 Factor logic (ADD THIS)
    factor = 0.8

    if data['weather'] == 1:   # Rainy
        factor -= 0.2
    if data['holiday'] == 1:
        factor -= 0.3
    if data['event'] == 1:
        factor += 0.1

    # 🔹 Rule-based prediction
    rule_prediction = data['registered_students'] * factor

    # 🔹 Final hybrid prediction
    prediction = (ml_prediction + rule_prediction) / 2

    # Food calculation
    rice_per_person = 0.2
    food_required = prediction * rice_per_person

    return jsonify({
        "predicted_diners": int(prediction),
        "food_required_kg": round(food_required, 2)
    })

# ✅ Test route (unchanged)
@app.route("/predict-test", methods=["GET"])
def predict_test():
    sample = {
        "registered_students": 500,
        "day": 2,
        "weather": 0,
        "holiday": 0,
        "event": 0
    }

    input_data = [[
        sample['registered_students'],
        sample['day'],
        sample['weather'],
        sample['holiday'],
        sample['event']
    ]]

    prediction = model.predict(input_data)[0]

    return jsonify({
        "predicted_diners": int(prediction)
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)