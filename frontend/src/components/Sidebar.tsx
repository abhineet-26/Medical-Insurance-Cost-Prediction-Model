import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, Activity, BarChart3, Info } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Prediction', path: '/prediction', icon: Stethoscope },
  { name: 'Model Performance', path: '/performance', icon: Activity },
  { name: 'Data Insights', path: '/insights', icon: BarChart3 },
  { name: 'About', path: '/about', icon: Info },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
      <div>
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
              M
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">MedInsure<span className="text-blue-500">AI</span></span>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium',
                  isActive
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">System Online</span>
          </div>
          <p className="text-xs text-slate-500">Model v2.4.1 - Active</p>
        </div>
      </div>
    </aside>
  );
}
