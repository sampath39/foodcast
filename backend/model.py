import pandas as pd
from sklearn.ensemble import RandomForestRegressor

def train_model():
    df = pd.read_csv("data.csv")

    # 🔴 Safety check
    if df.empty:
        raise ValueError("Dataset is empty! Please add data.")

    # Convert date → day of week
    df['day'] = pd.to_datetime(df['date']).dt.dayofweek

    # Encode weather
    df['weather'] = df['weather'].map({
        'Sunny': 0,
        'Rainy': 1,
        'Cloudy': 2
    })

    # 🔥 IMPORTANT: Normalize target (strong learning)
    # Instead of raw diners, learn ratio
    df['ratio'] = df['actual_diners'] / df['registered_students']

    # Features
    X = df[['registered_students','day','weather','holiday','event']]

    # Target = ratio (THIS IS KEY FIX)
    y = df['ratio']

    # Model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)

    # Debug info
    print("Feature Importance:", model.feature_importances_)

    return model