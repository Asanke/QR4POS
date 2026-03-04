import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  FileBarChart, 
  Activity, 
  ChevronDown,
  Users,
  AlertCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Store, label: 'Merchant Control', path: '/merchants', hasSub: true },
  { icon: FileBarChart, label: 'Reports', path: '/reports', hasSub: true },
  { icon: AlertCircle, label: 'Disputes', path: '/disputes' },
  { icon: Activity, label: 'Audit', path: '/audit' },
  { icon: Users, label: 'User Management', path: '/users' },
];

export default function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <aside className={cn(
      "bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 overflow-y-auto transition-all duration-300 z-20",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className={cn(
        "h-20 flex items-center px-6 gap-3 border-b border-slate-100",
        isCollapsed && "justify-center px-0"
      )}>
        <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20 flex-shrink-0">
          <QrCode className="text-white w-6 h-6" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="font-bold text-xl tracking-tight gradient-text leading-none">QR POS</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Admin Panel</p>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <div key={item.path}>
            <NavLink
              to={item.path}
              title={isCollapsed ? item.label : ""}
              className={({ isActive }) => cn(
                "flex items-center justify-between px-4 py-3 transition-all duration-200 group mx-2 rounded-xl",
                isActive 
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20" 
                  : "text-slate-600 hover:bg-slate-50",
                isCollapsed && "justify-center px-0 mx-1"
              )}
            >
              <div className={cn("flex items-center gap-3", isCollapsed && "gap-0")}>
                <item.icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  "group-hover:text-brand-blue",
                  "group-[.bg-brand-blue]:text-white"
                )} />
                {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
              </div>
              {!isCollapsed && item.hasSub && (
                <ChevronDown className={cn(
                  "w-4 h-4 opacity-60",
                  "group-[.bg-brand-blue]:text-white"
                )} />
              )}
            </NavLink>
            
            {/* Submenu for Merchant Control */}
            {!isCollapsed && item.label === 'Merchant Control' && (
              <div className="bg-slate-50/50 py-1 mt-1 mx-2 rounded-xl">
                <div className="pl-12 pr-4 py-2 text-xs text-slate-500 hover:text-brand-blue cursor-pointer transition-colors">Resets</div>
                <div className="pl-12 pr-4 py-2 text-xs text-slate-500 hover:text-brand-blue cursor-pointer transition-colors">Block</div>
                <div className="pl-12 pr-4 py-2 text-xs text-slate-500 hover:text-brand-blue cursor-pointer transition-colors">Activate</div>
              </div>
            )}

            {/* Submenu for Reports */}
            {!isCollapsed && item.label === 'Reports' && (
              <div className="bg-slate-50/50 py-1 mt-1 mx-2 rounded-xl">
                <div className="pl-12 pr-4 py-2 text-xs text-slate-500 hover:text-brand-blue cursor-pointer transition-colors">Merchant Report</div>
                <div className="pl-12 pr-4 py-2 text-xs text-slate-500 hover:text-brand-blue cursor-pointer transition-colors">Transaction Summary</div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

function QrCode(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16h.01" />
      <path d="M16 12h1" />
      <path d="M21 12h.01" />
      <path d="M12 21v-1" />
    </svg>
  );
}
