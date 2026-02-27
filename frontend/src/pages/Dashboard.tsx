import { Activity, Users, Target, TrendingUp, Shield, Brain, Droplet } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const trendData = [
  { name: 'Jan', predictions: 400, accuracy: 85 },
  { name: 'Feb', predictions: 300, accuracy: 86 },
  { name: 'Mar', predictions: 550, accuracy: 88 },
  { name: 'Apr', predictions: 450, accuracy: 87 },
  { name: 'May', predictions: 700, accuracy: 89 },
  { name: 'Jun', predictions: 650, accuracy: 89.2 },
];

const riskData = [
  { name: 'Low Risk', value: 65, fill: '#10b981' },
  { name: 'Medium Risk', value: 25, fill: '#f59e0b' },
  { name: 'High Risk', value: 10, fill: '#ef4444' },
];

export default function Dashboard() {
  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500">Real-time insights from your AI prediction system</p>
        </header>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 mb-8 shadow-xl shadow-blue-500/20">
          <div className="relative z-10 max-w-md">
            <p className="text-blue-100 font-medium mb-2 uppercase tracking-wider text-sm">Reminder</p>
            <h2 className="text-3xl font-bold mb-6 leading-tight">Have You Had a<br/>Routine Health Check<br/>this Month?</h2>
            <div className="flex gap-4">
              <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-sm">
                Check Now
              </button>
              <button className="bg-blue-400/30 backdrop-blur-sm text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-400/40 transition-colors border border-white/20">
                View Report
              </button>
            </div>
          </div>
          {/* Doctor Image Placeholder - using a generic professional image */}
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop" 
            alt="Doctor" 
            className="absolute right-0 bottom-0 h-[120%] object-cover object-left-top opacity-90 mix-blend-luminosity mask-image-gradient"
          />
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Predictions', value: '12,405', trend: '+12.5%', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Average Prediction', value: '$13,270', trend: '-2.4%', icon: TrendingUp, color: 'text-teal-500', bg: 'bg-teal-50' },
            { label: 'Model Accuracy', value: '89.2%', trend: '+0.5%', icon: Target, color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { label: 'Active Users', value: '842', trend: '+18.2%', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                </div>
              </div>
              <div className="text-xs font-medium text-emerald-500 bg-emerald-50 inline-flex px-2 py-1 rounded-md">
                {stat.trend} vs last month
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Prediction Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPredictions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  />
                  <Area type="monotone" dataKey="predictions" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPredictions)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Risk Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={80} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}/>
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
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

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l border-slate-100 p-6 overflow-y-auto hidden xl:block">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-slate-800">Upcoming Check Up</h3>
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <Droplet className="w-4 h-4" />
          </div>
        </div>

        {/* Mock Calendar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-slate-700">October 2023</span>
            <div className="flex gap-2 text-slate-400">
              <span className="cursor-pointer hover:text-slate-600">&lt;</span>
              <span className="cursor-pointer hover:text-slate-600">&gt;</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-slate-400">
            <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {Array.from({length: 31}).map((_, i) => (
              <div 
                key={i} 
                className={`w-8 h-8 flex items-center justify-center rounded-full mx-auto cursor-pointer
                  ${i === 17 ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/30' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mb-4">Your Last Health Check</h3>
        <div className="space-y-4 mb-8">
          {[
            { title: 'Dental Health', date: 'November 05, 2022', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-50' },
            { title: 'Brain IQ Test', date: 'October 20, 2022', icon: Brain, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { title: 'Regular Kidney Check', date: 'August 16, 2022', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.date}</p>
              </div>
            </div>
          ))}
          <button className="text-blue-500 text-sm font-medium w-full text-right hover:text-blue-600">View all &rarr;</button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium mb-1">Insurance Balance</p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <div className="w-4 h-4 rounded-full bg-blue-300"></div>
              </div>
              <span className="text-xs font-medium text-slate-600">Your Card</span>
            </div>
          </div>
          <span className="text-xl font-bold text-slate-800">$24,000</span>
        </div>
      </div>
    </div>
  );
}
