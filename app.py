from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI(title="Medical Insurance Cost Predictor")

model = joblib.load("insurance_rf_model.pkl")
model_columns = joblib.load("model_columns.pkl")

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

@app.post("/predict")
def predict(data: InsuranceInput):
    df = pd.DataFrame([data.dict()])
    df = df.reindex(columns=model_columns, fill_value=0)

    prediction = model.predict(df)[0]
    return {"Predicted Insurance Cost": round(prediction, 2)}