import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';
import { motion } from 'motion/react';
import { Database } from 'lucide-react';

// Mock data based on notebook
const featureImportance = [
  { name: 'bmi_smoker', value: 0.354 },
  { name: 'age_smoker', value: 0.238 },
  { name: 'smoker', value: 0.183 },
  { name: 'age', value: 0.116 },
  { name: 'bmi', value: 0.078 },
  { name: 'children', value: 0.014 },
].sort((a, b) => a.value - b.value);

const actualVsPredicted = Array.from({ length: 50 }, () => {
  const actual = Math.random() * 50000 + 2000;
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel-light p-3 rounded-xl border border-slate-200/20 dark:border-white/10 text-sm shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <p className="text-slate-700 dark:text-slate-300 mb-1 font-mono">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color || entry.payload.fill }} className="font-bold">
            {entry.name}: {entry.value.toFixed ? entry.value.toFixed(2) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Insights() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-7xl mx-auto"
    >
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white tracking-wide">Data Insights</h1>
          <p className="text-muted mt-1">Exploratory Data Analysis and Model Evaluation Plots</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-sm font-bold tracking-widest uppercase">
          <Database className="w-4 h-4" /> Dataset: insurance.csv
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Actual vs Predicted */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel rounded-3xl p-8 border border-slate-200/20 dark:border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors"></div>
          <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-2">Actual vs Predicted Charges</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-mono">Strong linear alignment indicates high model accuracy across price ranges.</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
                <XAxis type="number" dataKey="actual" name="Actual" tick={{fontSize: 12, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <YAxis type="number" dataKey="predicted" name="Predicted" tick={{fontSize: 12, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{strokeDasharray: '3 3', stroke: 'var(--grid-color)'}} />
                <Scatter name="Predictions" data={actualVsPredicted} fill="#06b6d4" opacity={0.8} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Feature Importance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel rounded-3xl p-8 border border-slate-200/20 dark:border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl group-hover:bg-violet-500/10 transition-colors"></div>
          <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-2">Feature Importance</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-mono">Engineered features dominate the model's decision making.</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureImportance} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--grid-color)" />
                <XAxis type="number" tick={{fontSize: 12, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{fontSize: 12, fill: 'var(--text-muted)', fontWeight: 500}} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'var(--grid-color)'}} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20}>
                  {featureImportance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === featureImportance.length - 1 ? '#06b6d4' : '#8b5cf6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Distribution of Charges */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel rounded-3xl p-8 border border-slate-200/20 dark:border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
          <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-2">Distribution of Charges</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-mono">Right-skewed distribution, typical for healthcare costs.</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chargeDist} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--grid-color)" />
                <XAxis dataKey="bin" tick={{fontSize: 12, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'var(--grid-color)'}} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Residual Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel rounded-3xl p-8 border border-slate-200/20 dark:border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
          <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-2">Residual Distribution</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-mono">Normally distributed residuals centered around zero.</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={residualDist} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--grid-color)" />
                <XAxis dataKey="bin" tick={{fontSize: 12, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'var(--grid-color)'}} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
