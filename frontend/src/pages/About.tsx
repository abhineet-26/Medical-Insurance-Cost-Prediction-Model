import { Shield, Database, Cpu, CheckCircle2, Hexagon } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-5xl mx-auto"
    >
      <header className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-panel border border-cyan-500/30 mb-6 relative">
          <Hexagon className="w-10 h-10 text-cyan-500 dark:text-cyan-400 absolute animate-spin-slow" strokeWidth={1} />
          <div className="w-3 h-3 bg-cyan-500 dark:bg-cyan-400 rounded-full glow-cyan"></div>
        </div>
        <h1 className="text-4xl font-display font-bold text-slate-800 dark:text-white mb-4 tracking-wide">About MedInsure AI</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          An advanced predictive analytics platform designed to estimate medical insurance costs with high precision. Leveraging machine learning to decode complex health data.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-panel rounded-3xl p-8 border border-slate-200/20 dark:border-white/5 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
          <div className="w-12 h-12 rounded-xl glass-panel-light text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-white mb-6">Input Parameters</h3>
          <ul className="space-y-4">
            {[
              'Age (18-64 years)',
              'Biological Sex',
              'Body Mass Index (BMI)',
              'Number of Dependents',
              'Smoking Status',
              'Geographic Region'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-mono text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 glow-cyan"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-panel rounded-3xl p-8 border border-slate-200/20 dark:border-white/5 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors"></div>
          <div className="w-12 h-12 rounded-xl glass-panel-light text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-white mb-6">Engineered Features</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Exploratory data analysis revealed that the interaction between smoking and other health metrics exponentially increases costs. We engineered specific features to capture this:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-4 glass-panel-light p-4 rounded-xl border border-slate-200/20 dark:border-white/5">
              <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-slate-800 dark:text-white font-bold mb-1 font-mono">age_smoker</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">Captures the compounding risk of age and smoking.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 glass-panel-light p-4 rounded-xl border border-slate-200/20 dark:border-white/5">
              <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-slate-800 dark:text-white font-bold mb-1 font-mono">bmi_smoker</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">The most critical feature, capturing the severe health risks of smoking combined with high BMI.</span>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Model Version Card - Advanced Glassmorphism */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative overflow-hidden rounded-3xl bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-cyan-500/30 p-10 shadow-[0_0_50px_rgba(6,182,212,0.15)] group">
        {/* Animated 3D-like background blobs inside the card */}
        <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[200%] bg-gradient-to-l from-cyan-500/20 dark:from-cyan-900/40 to-transparent transform -skew-x-12 group-hover:skew-x-0 transition-transform duration-1000"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-48 w-64 h-64 bg-violet-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-slate-500/5 dark:bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full text-cyan-600 dark:text-cyan-300 text-xs font-bold tracking-widest uppercase mb-6 border border-slate-200/20 dark:border-white/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Shield className="w-4 h-4" />
              Production Ready
            </div>
            <h3 className="text-4xl font-display font-bold text-slate-800 dark:text-white mb-4">Core Engine v2.4.1</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg leading-relaxed">
              Trained on a comprehensive medical insurance dataset using a hyper-tuned RandomForestRegressor algorithm.
            </p>
          </div>
          
          <div className="flex gap-6 text-center">
            <div className="glass-panel-light border border-slate-200/20 dark:border-white/10 rounded-2xl p-6 min-w-[140px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
              <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest mb-2 relative z-10">Algorithm</p>
              <p className="font-display font-bold text-xl text-blue-600 dark:text-blue-400 relative z-10">Random<br/>Forest</p>
            </div>
            <div className="glass-panel-light border border-slate-200/20 dark:border-white/10 rounded-2xl p-6 min-w-[140px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
              <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest mb-2 relative z-10">R² Score</p>
              <p className="font-display font-bold text-3xl text-cyan-600 dark:text-cyan-400 glow-text-cyan relative z-10 mt-2">0.892</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
