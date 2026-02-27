import { Activity, Target, TrendingDown } from 'lucide-react';

export default function Performance() {
  const r2Score = 0.892;
  const percentage = r2Score * 100;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Model Performance</h1>
        <p className="text-slate-500">Evaluation metrics for the RandomForestRegressor model</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Mean Absolute Error (MAE)</p>
            <h3 className="text-2xl font-bold text-slate-800">2,308.87</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Root Mean Squared Error</p>
            <h3 className="text-2xl font-bold text-slate-800">4,058.23</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">R² Score</p>
            <h3 className="text-2xl font-bold text-slate-800">0.892</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-12">
        {/* Circular Progress */}
        <div className="relative flex items-center justify-center">
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96" cy="96" r={radius}
              stroke="currentColor" strokeWidth="12" fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="96" cy="96" r={radius}
              stroke="currentColor" strokeWidth="12" fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-teal-500 transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-slate-800">{percentage.toFixed(1)}%</span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Accuracy</span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Model R² Score Explained</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            The R² (Coefficient of Determination) score of <strong>0.892</strong> indicates that approximately <strong>89.2% of the variance</strong> in medical insurance charges can be explained by the model's features (age, BMI, smoking status, etc.).
          </p>
          <p className="text-slate-600 leading-relaxed">
            This is a strong performance metric for a regression task in healthcare economics, suggesting the Random Forest model captures the underlying non-linear relationships—particularly the compounding effect of smoking and BMI—highly effectively.
          </p>
        </div>
      </div>
    </div>
  );
}
