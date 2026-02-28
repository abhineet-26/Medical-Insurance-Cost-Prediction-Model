import { Activity, Target, TrendingDown, Hexagon } from 'lucide-react';
import { motion } from 'motion/react';

export default function Performance() {
  const r2Score = 0.892;
  const percentage = r2Score * 100;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-5xl mx-auto"
    >
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white tracking-wide">Model Performance</h1>
        <p className="text-muted mt-1">Evaluation metrics for the RandomForestRegressor model</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Mean Absolute Error', value: '2,308.87', icon: Target, color: 'text-cyan-600 dark:text-cyan-400', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.2)]' },
          { label: 'Root Mean Squared Error', value: '4,058.23', icon: TrendingDown, color: 'text-violet-600 dark:text-violet-400', glow: 'shadow-[0_0_15px_rgba(139,92,246,0.2)]' },
          { label: 'R² Score', value: '0.892', icon: Activity, color: 'text-emerald-600 dark:text-emerald-400', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass-panel rounded-2xl p-6 border border-slate-200/20 dark:border-white/5 flex items-center gap-5 group hover:bg-slate-500/5 dark:hover:bg-white/5 transition-colors"
          >
            <div className={`w-14 h-14 rounded-xl glass-panel-light flex items-center justify-center ${stat.color} ${stat.glow} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel rounded-3xl p-10 border border-slate-200/20 dark:border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Futuristic Circular Progress */}
        <div className="relative flex items-center justify-center group">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-400/30 transition-all duration-700"></div>
          <svg className="transform -rotate-90 w-56 h-56 relative z-10 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            <circle
              cx="112" cy="112" r={radius}
              stroke="rgba(156,163,175,0.2)" strokeWidth="8" fill="transparent"
            />
            <motion.circle
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: "easeOut" }}
              cx="112" cy="112" r={radius}
              stroke="currentColor" strokeWidth="8" fill="transparent"
              strokeDasharray={circumference}
              className="text-cyan-500 dark:text-cyan-400"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center z-20">
            <Hexagon className="w-8 h-8 text-cyan-500/50 absolute -top-10 animate-spin-slow" strokeWidth={1} />
            <span className="text-5xl font-display font-bold text-slate-800 dark:text-white glow-text-cyan">{percentage.toFixed(1)}<span className="text-2xl text-cyan-600 dark:text-cyan-400">%</span></span>
            <span className="text-xs font-bold text-cyan-600/80 dark:text-cyan-400/80 uppercase tracking-widest mt-2">Accuracy</span>
          </div>
        </div>

        <div className="flex-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/5 dark:bg-white/5 border border-slate-200/20 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-bold tracking-widest uppercase mb-4">
            <Activity className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> Metric Analysis
          </div>
          <h3 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-6">Model R² Score Explained</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-lg">
            The R² (Coefficient of Determination) score of <strong className="text-cyan-600 dark:text-cyan-400">0.892</strong> indicates that approximately <strong className="text-slate-800 dark:text-white">89.2% of the variance</strong> in medical insurance charges can be explained by the model's features.
          </p>
          <div className="glass-panel-light p-5 rounded-2xl border border-slate-200/20 dark:border-white/5 border-l-4 border-l-cyan-500 dark:border-l-cyan-400">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              This is a strong performance metric for a regression task in healthcare economics, suggesting the Random Forest model captures the underlying non-linear relationships—particularly the compounding effect of smoking and BMI—highly effectively.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
