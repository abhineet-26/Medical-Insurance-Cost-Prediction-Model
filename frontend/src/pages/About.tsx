import { Shield, Database, Cpu, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">About MedInsure AI</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          MedInsure AI is an advanced predictive analytics platform designed to estimate medical insurance costs with high precision. By leveraging machine learning, it helps healthcare providers and insurers understand cost drivers and risk factors.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-6">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Input Features</h3>
          <ul className="space-y-3">
            {[
              'Age (18-64 years)',
              'Biological Sex',
              'Body Mass Index (BMI)',
              'Number of Dependents (Children)',
              'Smoking Status',
              'Geographic Region'
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center mb-6">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Engineered Features</h3>
          <p className="text-slate-600 mb-4">
            Our exploratory data analysis revealed that the interaction between smoking and other health metrics exponentially increases costs. We engineered specific features to capture this:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
              <span><strong>age_smoker:</strong> Captures the compounding risk of age and smoking.</span>
            </li>
            <li className="flex items-start gap-3 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
              <span><strong>bmi_smoker:</strong> The most critical feature, capturing the severe health risks of smoking combined with high BMI.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Model Version Card - Glassmorphism */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-48 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-slate-300 text-sm font-medium mb-4 border border-white/10">
              <Shield className="w-4 h-4" />
              Production Ready
            </div>
            <h3 className="text-2xl font-bold mb-2">Model Version 2.4.1</h3>
            <p className="text-slate-400 max-w-md">
              Trained on a comprehensive medical insurance dataset using a tuned RandomForestRegressor.
            </p>
          </div>
          
          <div className="flex gap-6 text-center">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 min-w-[120px]">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Algorithm</p>
              <p className="font-bold text-lg text-blue-300">Random Forest</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 min-w-[120px]">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">R² Score</p>
              <p className="font-bold text-lg text-teal-300">0.892</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
