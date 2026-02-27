# MedInsure AI Frontend

This is the frontend application for the Medical Insurance Cost Prediction model.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Backend URL:
   Open `src/pages/Prediction.tsx` and locate the `BACKEND_URL` constant at the top of the file:
   ```typescript
   // TODO: set your prediction API endpoint here
   const BACKEND_URL = "https://your-api-endpoint.com/predict";
   ```
   Replace this with your actual backend endpoint URL.

3. Run the development server:
   ```bash
   npm run dev
   ```

## Backend Integration Details

The frontend expects a POST endpoint that accepts `application/json`.
The payload sent will match exactly:
```json
{
  "age": 35,
  "sex": 1,
  "bmi": 28.5,
  "children": 2,
  "smoker": 1,
  "region_southeast": 1,
  "region_northwest": 0,
  "region_southwest": 0,
  "age_smoker": 35,
  "bmi_smoker": 28.5
}
```

The backend should return a JSON object containing at least `predicted_charges`. Optional fields like `risk_level`, `r2`, `mae`, and `rmse` will be dynamically displayed if present. Example response:
```json
{
  "predicted_charges": 14250.75,
  "risk_level": "Medium",
  "r2": 0.892,
  "mae": 2308.87,
  "rmse": 4058.23
}
```
