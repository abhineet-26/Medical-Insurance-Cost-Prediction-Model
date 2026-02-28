import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, Activity, BarChart3, Info, Hexagon, Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from './ThemeProvider';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Prediction', path: '/prediction', icon: Stethoscope },
  { name: 'Performance', path: '/performance', icon: Activity },
  { name: 'Insights', path: '/insights', icon: BarChart3 },
  { name: 'About', path: '/about', icon: Info },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="relative">
          <Hexagon className="w-8 h-8 text-cyan-600 dark:text-cyan-400 animate-pulse" strokeWidth={1.5} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-cyan-600 dark:bg-cyan-400 rounded-full glow-cyan"></div>
          </div>
        </div>
        <span className="font-display font-bold text-xl tracking-wider text-slate-800 dark:text-white">
          MED<span className="text-cyan-600 dark:text-cyan-400">AI</span>
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm flex items-center gap-2',
                isActive
                  ? 'bg-white/40 dark:bg-white/10 text-slate-900 dark:text-white backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/50 dark:border-white/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-white/10 hover:backdrop-blur-md hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-white/50 dark:hover:border-white/20'
              )
            }
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/10 backdrop-blur-md transition-all border border-transparent hover:border-white/50 dark:hover:border-white/20 text-slate-700 dark:text-slate-300"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
