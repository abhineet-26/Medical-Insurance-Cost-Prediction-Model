**MedInsure AI – Medical Insurance Cost Prediction**

MedInsure AI is a machine learning–powered web application that predicts individual medical insurance charges based on demographic and lifestyle information. The project combines a trained Random Forest regression model with a modern web interface to provide accurate, real-time predictions.
In The backend FastAPI is already deployed and accessible, while the frontend allows users to input details and view predicted insurance costs.

**Features**

Predicts medical insurance charges using ML
Uses demographic & lifestyle features:
Age
Sex
BMI
Number of children
Smoking status
Region

Includes feature interactions (age × smoker, BMI × smoker)

Displays:

Predicted insurance cost
Risk level (Low / Medium / High)
Model performance metrics (R², MAE, RMSE)
Clean and responsive frontend UI
Backend served via REST API



**Machine Learning Model**

Algorithm: Random Forest Regressor

Reason for choice:

Handles non-linear relationships well
Robust to outliers
Performs better than linear models for this dataset
Final Model Metrics

R² Score: ~0.89
MAE: ~₹2300
RMSE: ~₹4400



**Project Structure**

medinsure-ai/
│
├── backend/
│   ├── app.py
│   ├── insurance_rf_model.pkl
│   ├── model_columns.pkl
│   ├── requirements.txt
│   └── start.sh
│
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
│
└── README.md
🔌 Backend (Already Deployed)

Built using FastAPI
Provides a /predict endpoint

Accepts JSON input and returns predictions

Example Request Payload
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
Example Response
{
  "predicted_charges": 14250.75,
  "risk_level": "Medium",
  "r2": 0.872,
  "mae": 2345.34,
  "rmse": 4472.28
}



 **Frontend Setup (Local)**

Only the frontend needs to be run locally.

1️⃣ Navigate to Frontend Folder
cd frontend
2️⃣ Install Dependencies
npm install
3️⃣ Run Development Server
npm run dev
4️⃣ Open in Browser
http://localhost:3000



 **Currency Display (₹)**

The application displays predicted costs in Indian Rupees (₹).
Formatting is handled on the frontend using the currency symbol.



**Visual Insights**

Correlation analysis for feature selection
Feature importance–based pruning
Residual and error distribution analysis
Model performance visualizations



🔮 **Future Scope**

Add user authentication & prediction history
Deploy frontend to cloud hosting (Render / Netlify / Vercel)
Add more advanced models (XGBoost, Gradient Boosting)
Improve explainability using SHAP values
Expand dataset for better generalization
Convert to full production-ready healthcare analytics tool

📌 **Conclusion**

MedInsure AI demonstrates how machine learning can be effectively integrated with web technologies to solve real-world problems in healthcare insurance. The project showcases end-to-end ML deployment — from data preprocessing and model training to API creation and frontend integration.



