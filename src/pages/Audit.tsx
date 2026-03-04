import React from 'react';
import { ShieldAlert, Search, Filter } from 'lucide-react';

export default function Audit() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">System Audit Logs</h2>
        <p className="text-slate-500">Track all administrative actions and system changes.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search logs..." 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-600"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">
          <Filter className="w-4 h-4" />
          Filter Logs
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Module</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { time: '2024-03-04 10:24:12', user: 'admin_john', action: 'Merchant Blocked', module: 'Merchant Control', ip: '192.168.1.45' },
                { time: '2024-03-04 09:15:04', user: 'system', action: 'Daily Report Generated', module: 'Reports', ip: 'Internal' },
                { time: '2024-03-04 08:45:22', user: 'admin_sarah', action: 'User Permissions Updated', module: 'User Management', ip: '192.168.1.12' },
                { time: '2024-03-03 23:12:55', user: 'admin_john', action: 'Merchant Reset', module: 'Merchant Control', ip: '192.168.1.45' },
              ].map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-500 font-mono">{log.time}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{log.user}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-3 h-3 text-brand-blue" />
                      <span className="text-sm font-medium text-slate-700">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{log.module}</td>
                  <td className="px-6 py-4 text-sm text-slate-400 font-mono">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
