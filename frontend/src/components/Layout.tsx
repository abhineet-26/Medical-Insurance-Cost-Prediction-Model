import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import InteractiveBackground from './InteractiveBackground';
import { AnimatePresence, motion } from 'motion/react';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen overflow-hidden relative selection:bg-cyan-500/30">
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 pt-24 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
