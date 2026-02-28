import React, { useState } from 'react';
import { Stethoscope, AlertCircle, CheckCircle2, Activity, Cpu, Hexagon } from 'lucide-react';
import { motion } from 'motion/react';

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
      if (BACKEND_URL.includes('your-api-endpoint')) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Slightly longer for effect
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
          headers: { 'Content-Type': 'application/json' },
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-6xl mx-auto"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-cyan-500/20 p-10 mb-10 flex items-center justify-between group">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoNiwgMTgyLCAyMTIsIDAuMSkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/10 dark:from-cyan-900/40 to-transparent"></div>
        
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-1.5 rounded-full text-cyan-600 dark:text-cyan-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Cpu className="w-4 h-4" />
            Inference Engine Active
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-800 dark:text-white mb-4 leading-tight">
            Cost Prediction <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Matrix</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Input patient parameters to initiate the Random Forest regression sequence and calculate estimated annual liabilities.
          </p>
        </div>

        {/* 3D Abstract Representation */}
        <div className="hidden lg:block relative w-64 h-64 perspective-1000">
          <div className="absolute inset-0 flex items-center justify-center animate-float">
            <div className="w-48 h-48 border border-cyan-500/40 rounded-lg transform rotate-45 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute w-48 h-48 border border-blue-500/40 rounded-lg transform rotate-45 animate-[spin_20s_linear_infinite_reverse]"></div>
            <Hexagon className="w-24 h-24 text-cyan-500 dark:text-cyan-400 absolute glow-cyan" strokeWidth={1} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Card */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-slate-200/20 dark:border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50"></div>
          <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-500/5 dark:bg-white/5 border border-slate-200/20 dark:border-white/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">01</span>
            Input Parameters
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Age */}
              <div className="glass-panel-light p-5 rounded-2xl border border-slate-200/20 dark:border-white/5">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-medium text-muted uppercase tracking-wider">Age</label>
                  <span className="text-2xl font-display font-bold text-cyan-600 dark:text-cyan-400">{formData.age}</span>
                </div>
                <input 
                  type="range" name="age" min="18" max="65" 
                  value={formData.age} onChange={handleChange}
                  className="w-full"
                />
              </div>

              {/* BMI */}
              <div className="glass-panel-light p-5 rounded-2xl border border-slate-200/20 dark:border-white/5">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-medium text-muted uppercase tracking-wider">BMI</label>
                  <span className="text-2xl font-display font-bold text-cyan-600 dark:text-cyan-400">{formData.bmi}</span>
                </div>
                <input 
                  type="range" name="bmi" min="15.0" max="45.0" step="0.1"
                  value={formData.bmi} onChange={handleChange}
                  className="w-full"
                />
              </div>

              {/* Sex */}
              <div className="glass-panel-light p-5 rounded-2xl border border-slate-200/20 dark:border-white/5">
                <label className="block text-sm font-medium text-muted uppercase tracking-wider mb-4">Biological Sex</label>
                <div className="flex gap-4">
                  {['Male', 'Female'].map(option => (
                    <label key={option} className={`flex-1 flex items-center justify-center py-2 rounded-xl border cursor-pointer transition-all ${formData.sex === option ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-700 dark:text-cyan-300 glow-cyan' : 'border-slate-200/20 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/5 dark:hover:bg-white/5'}`}>
                      <input 
                        type="radio" name="sex" value={option} 
                        checked={formData.sex === option} onChange={handleChange}
                        className="hidden"
                      />
                      <span className="font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Smoker */}
              <div className="glass-panel-light p-5 rounded-2xl border border-slate-200/20 dark:border-white/5">
                <label className="block text-sm font-medium text-muted uppercase tracking-wider mb-4">Smoker Status</label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map(option => (
                    <label key={option} className={`flex-1 flex items-center justify-center py-2 rounded-xl border cursor-pointer transition-all ${formData.smoker === option ? (option === 'Yes' ? 'bg-rose-500/20 border-rose-500/50 text-rose-600 dark:text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-600 dark:text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]') : 'border-slate-200/20 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/5 dark:hover:bg-white/5'}`}>
                      <input 
                        type="radio" name="smoker" value={option} 
                        checked={formData.smoker === option} onChange={handleChange}
                        className="hidden"
                      />
                      <span className="font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Children */}
              <div className="glass-panel-light p-5 rounded-2xl border border-slate-200/20 dark:border-white/5">
                <label className="block text-sm font-medium text-muted uppercase tracking-wider mb-4">Dependents</label>
                <div className="flex items-center justify-between bg-white/50 dark:bg-slate-900/50 rounded-xl p-1 border border-slate-200/20 dark:border-white/5">
                  <button type="button" onClick={() => setFormData(p => ({...p, children: Math.max(0, p.children - 1)}))} className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-500/10 dark:hover:bg-white/10 transition-colors">-</button>
                  <span className="text-xl font-display font-bold text-slate-800 dark:text-white">{formData.children}</span>
                  <button type="button" onClick={() => setFormData(p => ({...p, children: Math.min(5, p.children + 1)}))} className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-500/10 dark:hover:bg-white/10 transition-colors">+</button>
                </div>
              </div>

              {/* Region */}
              <div className="glass-panel-light p-5 rounded-2xl border border-slate-200/20 dark:border-white/5">
                <label className="block text-sm font-medium text-muted uppercase tracking-wider mb-4">Region</label>
                <select 
                  name="region" value={formData.region} onChange={handleChange}
                  className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200/20 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all appearance-none"
                >
                  <option value="Northeast" className="bg-white dark:bg-slate-900">Northeast</option>
                  <option value="Northwest" className="bg-white dark:bg-slate-900">Northwest</option>
                  <option value="Southeast" className="bg-white dark:bg-slate-900">Southeast</option>
                  <option value="Southwest" className="bg-white dark:bg-slate-900">Southwest</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-white dark:text-slate-950 rounded-xl py-4 font-bold text-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-8 relative overflow-hidden group"
            >
              {loading ? (
                <>
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shimmer_1s_linear_infinite]"></div>
                  <Activity className="w-5 h-5 animate-pulse relative z-10" /> 
                  <span className="relative z-10">Processing Data...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                  Execute Prediction
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result Area */}
        <div className="lg:col-span-5 space-y-6">
          {error && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel border border-rose-500/30 text-rose-600 dark:text-rose-400 p-5 rounded-2xl flex items-start gap-3 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="glass-panel rounded-3xl p-8 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden"
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
              
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-8 border-b border-slate-200/20 dark:border-white/10 pb-4">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold tracking-widest uppercase text-sm">Output Generated</span>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Estimated Liability</p>
                <h3 className="text-5xl font-display font-bold text-slate-800 dark:text-white glow-text-cyan">
                  ₹{result.predicted_charges.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </h3>
              </div>

              {result.risk_level && (
                <div className="mb-8 glass-panel-light p-4 rounded-2xl border border-slate-200/20 dark:border-white/5">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Risk Classification</p>
                  <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border
                    ${result.risk_level === 'Low' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 
                      result.risk_level === 'Medium' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 
                      'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]'}`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${result.risk_level === 'Low' ? 'bg-emerald-500 dark:bg-emerald-400' : result.risk_level === 'Medium' ? 'bg-amber-500 dark:bg-amber-400' : 'bg-rose-500 dark:bg-rose-400'} animate-pulse`}></div>
                    {result.risk_level} Level
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Telemetry</p>
                <div className="space-y-3">
                  {result.r2 && (
                    <div className="flex justify-between items-center p-3 glass-panel-light rounded-xl border border-slate-200/20 dark:border-white/5">
                      <span className="text-sm text-slate-600 dark:text-slate-400 font-mono">R²_SCORE</span>
                      <span className="font-bold text-cyan-600 dark:text-cyan-300">{(result.r2 * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {result.mae && (
                    <div className="flex justify-between items-center p-3 glass-panel-light rounded-xl border border-slate-200/20 dark:border-white/5">
                      <span className="text-sm text-slate-600 dark:text-slate-400 font-mono">MAE_VAL</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">${result.mae.toFixed(2)}</span>
                    </div>
                  )}
                  {result.rmse && (
                    <div className="flex justify-between items-center p-3 glass-panel-light rounded-xl border border-slate-200/20 dark:border-white/5">
                      <span className="text-sm text-slate-600 dark:text-slate-400 font-mono">RMSE_VAL</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">${result.rmse.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass-panel rounded-3xl p-8 border border-slate-200/20 dark:border-white/5 flex flex-col items-center justify-center text-center h-full min-h-[400px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTI4LCAxMjgsIDEyOCwgMC4wNSkiLz48L3N2Zz4=')]"></div>
              <div className="w-24 h-24 rounded-full glass-panel-light border border-slate-200/20 dark:border-white/10 flex items-center justify-center mb-6 relative z-10">
                <Hexagon className="w-10 h-10 text-slate-400 dark:text-slate-600" strokeWidth={1} />
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium tracking-wide relative z-10 uppercase text-sm">Awaiting Input Parameters</p>
              <p className="text-slate-500 dark:text-slate-600 text-xs mt-2 font-mono relative z-10">System standing by...</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
