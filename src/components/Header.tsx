import React from 'react';
import { Menu, Globe, Smartphone, Shield, Moon, Sun, ChevronDown } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ toggleSidebar, isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-10 px-8 flex items-center justify-between shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="font-bold text-lg text-slate-800 tracking-tight">QR POS</h1>
          <p className="text-[10px] text-slate-400 font-bold">V2.4.1</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2 text-brand-blue bg-brand-blue/5 px-3 py-1.5 rounded-full">
          <Globe className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2 text-brand-green bg-brand-green/5 px-3 py-1.5 rounded-full">
          <Smartphone className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
          <Shield className="w-4 h-4" />
        </div>

        <div className="h-8 w-[1px] bg-slate-200 mx-2" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg shadow-sm">
            A
          </div>
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-slate-700">Hello, Admin</p>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
