import React, { useState } from 'react';
import { Stethoscope, AlertCircle, CheckCircle2, Activity } from 'lucide-react';

// TODO: set your prediction API endpoint here
const BACKEND_URL = "https://medical-insurance-api.onrender.com/predict";

export default function Prediction() {
  const [formData, setFormData] = useState({
    age: 35,
    sex: 'Male',
    bmi: 28.5,
    children: 2,
    smoker: 'No',
    region: 'Northeast'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Map form fields to backend JSON format
    const sexMapped = formData.sex === 'Male' ? 1 : 0;
    const smokerMapped = formData.smoker === 'Yes' ? 1 : 0;
    const region_southeast = formData.region === 'Southeast' ? 1 : 0;
    const region_northwest = formData.region === 'Northwest' ? 1 : 0;
    const region_southwest = formData.region === 'Southwest' ? 1 : 0;
    
    const ageNum = Number(formData.age);
    const bmiNum = Number(formData.bmi);
    
    const age_smoker = ageNum * smokerMapped;
    const bmi_smoker = bmiNum * smokerMapped;

    const payload = {
      age: ageNum,
      sex: sexMapped,
      bmi: bmiNum,
      children: Number(formData.children),
      smoker: smokerMapped,
      region_southeast,
      region_northwest,
      region_southwest,
      age_smoker,
      bmi_smoker
    };

    try {
      // Simulate API call for demonstration if BACKEND_URL is placeholder
      if (BACKEND_URL.includes('your-api-endpoint')) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Mock response based on notebook
        setResult({
          predicted_charges: 14250.75,
          risk_level: 'Medium',
          r2: 0.892,
          mae: 2308.87,
          rmse: 4058.23
        });
      } else {
        const response = await fetch(BACKEND_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        
        if (!response.ok) throw new Error('Prediction request failed');
        const data = await response.json();
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 mb-8 shadow-xl shadow-blue-500/20 flex items-center justify-between">
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-md px-3 py-1 rounded-full text-blue-100 text-sm font-medium mb-4 border border-blue-400/30">
            <Stethoscope className="w-4 h-4" />
            AI-Powered Analysis
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">Patient Cost Prediction<br/>Engine</h2>
          <p className="text-blue-100 mb-6">Enter patient vitals and demographics to instantly estimate annual medical insurance charges using our Random Forest model.</p>
        </div>
        <div className="hidden md:block w-48 h-48 bg-blue-500/20 rounded-full blur-3xl absolute right-10"></div>
        <Activity className="w-32 h-32 text-blue-400/20 absolute right-16" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Patient Details</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Age: {formData.age}</label>
                <input 
                  type="range" name="age" min="18" max="65" 
                  value={formData.age} onChange={handleChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>18</span><span>65</span>
                </div>
              </div>

              {/* BMI */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">BMI: {formData.bmi}</label>
                <input 
                  type="range" name="bmi" min="15.0" max="45.0" step="0.1"
                  value={formData.bmi} onChange={handleChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>15.0</span><span>45.0</span>
                </div>
              </div>

              {/* Sex */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Biological Sex</label>
                <div className="flex gap-4">
                  {['Male', 'Female'].map(option => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" name="sex" value={option} 
                        checked={formData.sex === option} onChange={handleChange}
                        className="w-4 h-4 text-blue-500 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Smoker */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Smoker</label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map(option => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" name="smoker" value={option} 
                        checked={formData.smoker === option} onChange={handleChange}
                        className="w-4 h-4 text-blue-500 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Children */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Dependents (Children)</label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setFormData(p => ({...p, children: Math.max(0, p.children - 1)}))} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200">-</button>
                  <span className="w-8 text-center font-medium text-slate-800">{formData.children}</span>
                  <button type="button" onClick={() => setFormData(p => ({...p, children: Math.min(5, p.children + 1)}))} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200">+</button>
                </div>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Region</label>
                <select 
                  name="region" value={formData.region} onChange={handleChange}
                  className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="Northeast">Northeast</option>
                  <option value="Northwest">Northwest</option>
                  <option value="Southeast">Southeast</option>
                  <option value="Southwest">Southwest</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 text-white rounded-xl py-3.5 font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</>
                ) : (
                  'Generate Prediction'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Result Area */}
        <div className="lg:col-span-1 space-y-6">
          {error && (
            <div className="bg-red-50/80 backdrop-blur-md border border-red-100 text-red-600 p-4 rounded-2xl flex items-start gap-3 shadow-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/40 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 text-emerald-500 mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold text-sm">Prediction Complete</span>
              </div>
              
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white mb-6 shadow-lg shadow-teal-500/20">
                <p className="text-teal-100 text-sm font-medium mb-1">Estimated Annual Cost</p>
                <h3 className="text-4xl font-bold tracking-tight">
                  ₹{result.predicted_charges.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </h3>
              </div>

              {result.risk_level && (
                <div className="mb-6">
                  <p className="text-sm text-slate-500 mb-2 font-medium">Risk Assessment</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold
                    ${result.risk_level === 'Low' ? 'bg-emerald-100 text-emerald-700' : 
                      result.risk_level === 'Medium' ? 'bg-amber-100 text-amber-700' : 
                      'bg-red-100 text-red-700'}`}
                  >
                    {result.risk_level} Risk
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <p className="text-sm text-slate-500 font-medium mb-2">Model Confidence Metrics</p>
                {result.r2 && (
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm text-slate-600">R² Score</span>
                    <span className="font-semibold text-slate-800">{(result.r2 * 100).toFixed(1)}%</span>
                  </div>
                )}
                {result.mae && (
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm text-slate-600">MAE</span>
                    <span className="font-semibold text-slate-800">${result.mae.toFixed(2)}</span>
                  </div>
                )}
                {result.rmse && (
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm text-slate-600">RMSE</span>
                    <span className="font-semibold text-slate-800">${result.rmse.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {!result && !error && !loading && (
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-slate-300">
                <Activity className="w-8 h-8" />
              </div>
              <p className="text-slate-500 font-medium">Submit the form to generate a prediction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
