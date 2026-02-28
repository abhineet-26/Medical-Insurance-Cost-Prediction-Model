from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

app = FastAPI(title="Medical Insurance Cost Predictor")

# ----------------------------
# Enable CORS (VERY IMPORTANT for frontend)
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Load model & metadata
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "insurance_rf_model.pkl")
columns_path = os.path.join(BASE_DIR, "model_columns.pkl")

model = joblib.load(model_path)
model_columns = joblib.load(columns_path)

# (Optional) Store model performance values
MODEL_R2 = 0.872
MODEL_MAE = 2345.34
MODEL_RMSE = 4472.28


# ----------------------------
# Input Schema
# ----------------------------
class InsuranceInput(BaseModel):
    age: int
    sex: int
    bmi: float
    children: int
    smoker: int
    region_southeast: int = 0
    region_northwest: int = 0
    region_southwest: int = 0
    age_smoker: float
    bmi_smoker: float


# ----------------------------
# Risk Level Logic
# ----------------------------
def get_risk_level(prediction):
    if prediction < 8000:
        return "Low"
    elif prediction < 20000:
        return "Medium"
    else:
        return "High"


# ----------------------------
# Prediction Endpoint
# ----------------------------
@app.post("/predict")
def predict(data: InsuranceInput):
    input_df = pd.DataFrame([data.dict()])
    input_df = input_df.reindex(columns=model_columns, fill_value=0)

    prediction = model.predict(input_df)[0]
    prediction = float(np.round(prediction, 2))

    return {
        "predicted_charges": prediction,
        "risk_level": get_risk_level(prediction),
        "r2": MODEL_R2,
        "mae": MODEL_MAE,
        "rmse": MODEL_RMSE
    }


# Optional root route
@app.get("/")
def root():
    return {"message": "Medical Insurance Prediction API is running"}