import ThemeToggle from './ThemeToggle';
import { Layers } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/60 border-b border-white/40 dark:bg-slate-950/60 dark:border-slate-800/50 shadow-sm shadow-slate-200/20 dark:shadow-none transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Layers className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="font-serif text-xl font-bold text-gray-900 dark:text-white">LeadFlow AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Features</a>
            <a href="#process" className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Process</a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a href="#get-started" className="btn-primary hidden sm:flex">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
