import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';

// Mock data based on notebook
const featureImportance = [
  { name: 'bmi_smoker', value: 0.354 },
  { name: 'age_smoker', value: 0.238 },
  { name: 'smoker', value: 0.183 },
  { name: 'age', value: 0.116 },
  { name: 'bmi', value: 0.078 },
  { name: 'children', value: 0.014 },
].sort((a, b) => a.value - b.value); // Sort for horizontal bar chart

const actualVsPredicted = Array.from({ length: 50 }, () => {
  const actual = Math.random() * 50000 + 2000;
  // Add some noise, more noise for higher values
  const predicted = actual + (Math.random() - 0.5) * (actual * 0.2); 
  return { actual, predicted };
});

const residualDist = [
  { bin: '-6k', count: 2 }, { bin: '-4k', count: 8 }, { bin: '-2k', count: 25 },
  { bin: '0', count: 75 }, { bin: '2k', count: 20 }, { bin: '4k', count: 5 },
  { bin: '6k', count: 1 }
];

const chargeDist = [
  { bin: '0-10k', count: 600 }, { bin: '10k-20k', count: 350 },
  { bin: '20k-30k', count: 150 }, { bin: '30k-40k', count: 120 },
  { bin: '40k-50k', count: 80 }, { bin: '50k+', count: 38 }
];

export default function Insights() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Data Insights</h1>
        <p className="text-slate-500">Exploratory Data Analysis and Model Evaluation Plots</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Actual vs Predicted */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Actual vs Predicted Charges</h3>
          <p className="text-sm text-slate-500 mb-6">Strong linear alignment indicates high model accuracy across price ranges.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" dataKey="actual" name="Actual" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis type="number" dataKey="predicted" name="Predicted" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                <Scatter name="Predictions" data={actualVsPredicted} fill="#3b82f6" opacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Importance */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Feature Importance</h3>
          <p className="text-sm text-slate-500 mb-6">Engineered features (bmi_smoker, age_smoker) dominate the model's decision making.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureImportance} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                <Bar dataKey="value" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution of Charges */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Distribution of Charges</h3>
          <p className="text-sm text-slate-500 mb-6">Right-skewed distribution, typical for healthcare costs.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chargeDist} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="bin" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Residual Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Residual Distribution</h3>
          <p className="text-sm text-slate-500 mb-6">Normally distributed residuals centered around zero indicate an unbiased model.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={residualDist} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="bin" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                <Bar dataKey="count" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
