import { Activity, Users, Target, TrendingUp, Shield, Brain, Droplet, Zap, Database } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { motion } from 'motion/react';

const trendData = [
  { name: 'Jan', predictions: 400, accuracy: 85 },
  { name: 'Feb', predictions: 300, accuracy: 86 },
  { name: 'Mar', predictions: 550, accuracy: 88 },
  { name: 'Apr', predictions: 450, accuracy: 87 },
  { name: 'May', predictions: 700, accuracy: 89 },
  { name: 'Jun', predictions: 650, accuracy: 89.2 },
];

const riskData = [
  { name: 'Low', value: 65, fill: '#06b6d4' }, // cyan-500
  { name: 'Medium', value: 25, fill: '#8b5cf6' }, // violet-500
  { name: 'High', value: 10, fill: '#f43f5e' }, // rose-500
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel-light p-3 rounded-xl border border-slate-200/20 dark:border-white/10 text-sm">
        <p className="text-slate-700 dark:text-slate-300 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color || entry.payload.fill }} className="font-bold">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full"
    >
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto scroll-smooth">
        <header className="mb-10">
          <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white tracking-wide">Command Center</h1>
          <p className="text-muted mt-1">Real-time neural network insights & predictions</p>
        </header>

        {/* Hero Card - 3D/Glassmorphism feel */}
        <div className="relative overflow-hidden rounded-3xl glass-panel border border-cyan-500/20 p-8 mb-10 group">
          {/* Animated background elements inside hero */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-cyan-500/10 dark:from-cyan-900/40 to-transparent opacity-50"></div>
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[80px] group-hover:bg-cyan-400/30 transition-all duration-700"></div>
          
          <div className="relative z-10 flex justify-between items-center">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-bold tracking-widest uppercase mb-6">
                <Zap className="w-3 h-3" /> System Alert
              </div>
              <h2 className="text-4xl font-display font-bold text-slate-800 dark:text-white mb-4 leading-tight">
                Routine Analysis <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Required</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
                Your monthly predictive health model recalibration is due. Run a new batch prediction to maintain accuracy.
              </p>
              <div className="flex gap-4">
                <button className="bg-cyan-500 hover:bg-cyan-400 text-white dark:text-slate-950 px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                  Initialize Scan
                </button>
                <button className="glass-panel-light hover:bg-slate-500/10 dark:hover:bg-white/10 text-slate-700 dark:text-white px-8 py-3 rounded-xl font-semibold transition-all border border-slate-200/20 dark:border-white/10">
                  View Logs
                </button>
              </div>
            </div>
            
            {/* Simulated 3D Element */}
            <div className="hidden lg:flex relative w-64 h-64 items-center justify-center animate-float">
              <div className="absolute w-48 h-48 border-2 border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute w-56 h-56 border border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute w-32 h-32 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full blur-md opacity-60 dark:opacity-80 glow-cyan"></div>
              <Activity className="w-16 h-16 text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Scans', value: '12,405', trend: '+12.5%', icon: Activity, color: 'text-cyan-500 dark:text-cyan-400', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.2)]' },
            { label: 'Avg Cost Est.', value: '$13,270', trend: '-2.4%', icon: TrendingUp, color: 'text-blue-500 dark:text-blue-400', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]' },
            { label: 'Model Accuracy', value: '89.2%', trend: '+0.5%', icon: Target, color: 'text-violet-500 dark:text-violet-400', glow: 'shadow-[0_0_15px_rgba(139,92,246,0.2)]' },
            { label: 'Active Nodes', value: '842', trend: '+18.2%', icon: Users, color: 'text-emerald-500 dark:text-emerald-400', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]' },
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={i} 
              className="glass-panel rounded-2xl p-6 hover:bg-slate-500/5 dark:hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl glass-panel-light flex items-center justify-center ${stat.color} ${stat.glow} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md">
                  {stat.trend}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-muted uppercase tracking-wider">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-display font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 glow-cyan"></div>
              Prediction Volume
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPredictions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--grid-color)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="predictions" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorPredictions)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-display font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
              Risk Stratification
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--grid-color)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }} width={70} />
                  <Tooltip cursor={{fill: 'var(--grid-color)'}} content={<CustomTooltip />}/>
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Data Stream */}
      <div className="w-80 glass-panel border-l border-slate-200/20 dark:border-white/5 p-6 overflow-y-auto hidden 2xl:block relative z-20">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-display font-bold text-slate-800 dark:text-white tracking-wide">Future Modules</h3>
          <div className="w-8 h-8 rounded-full glass-panel-light flex items-center justify-center text-cyan-500 dark:text-cyan-400 border border-cyan-500/30">
            <Zap className="w-4 h-4" />
          </div>
        </div>

        {/* Anomaly Detection Engine */}
        <div className="glass-panel-light rounded-2xl border border-slate-200/20 dark:border-white/5 p-5 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500"></div>
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-colors"></div>
          
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
              <Activity className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-white text-sm">Anomaly Detection</h4>
          </div>
          
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed relative z-10">
            Real-time monitoring of incoming patient data to flag statistically improbable cost combinations before prediction.
          </p>
          
          <div className="flex items-center justify-between text-xs font-mono relative z-10">
            <span className="text-rose-600 dark:text-rose-500">Status: In Development</span>
            <span className="text-muted">v3.0</span>
          </div>
        </div>

        {/* Cohort Analysis */}
        <div className="glass-panel-light rounded-2xl border border-slate-200/20 dark:border-white/5 p-5 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-colors"></div>
          
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-500 flex items-center justify-center border border-violet-500/20">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-white text-sm">Cohort Analysis</h4>
          </div>
          
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed relative z-10">
            Group patients by similar risk profiles to identify macro trends in regional healthcare costs.
          </p>
          
          <div className="flex items-center justify-between text-xs font-mono relative z-10">
            <span className="text-violet-600 dark:text-violet-500">Status: Planned</span>
            <span className="text-muted">v3.1</span>
          </div>
        </div>

        <h3 className="font-display font-bold text-slate-800 dark:text-white mb-4 text-sm tracking-widest uppercase text-muted">Recent Logs</h3>
        <div className="space-y-3 mb-8">
          {[
            { title: 'Neural Net Update', date: 'Nov 05, 08:42', icon: Brain, color: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-500/30' },
            { title: 'Security Scan', date: 'Oct 20, 14:15', icon: Shield, color: 'text-violet-600 dark:text-violet-400', border: 'border-violet-500/30' },
            { title: 'Data Ingestion', date: 'Aug 16, 09:00', icon: Database, color: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/30' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl glass-panel-light hover:bg-slate-500/5 dark:hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-slate-200/20 dark:hover:border-white/10 group">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-slate-900 border ${item.border} ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.title}</h4>
                <p className="text-xs text-muted font-mono mt-0.5">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
