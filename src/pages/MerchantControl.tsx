import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Ban, 
  CheckCircle2, 
  MoreVertical,
  Filter,
  Download
} from 'lucide-react';

const merchants = [
  { id: 'MID-001', name: 'Global Foods', city: 'Colombo', status: 'Active', volume: 'LKR 1.2M', lastActive: '10 mins ago' },
  { id: 'MID-002', name: 'Tech Hub', city: 'Kandy', status: 'Blocked', volume: 'LKR 450K', lastActive: '2 days ago' },
  { id: 'MID-003', name: 'Green Grocers', city: 'Galle', status: 'Active', volume: 'LKR 890K', lastActive: '1 hour ago' },
  { id: 'MID-004', name: 'City Pharmacy', city: 'Colombo', status: 'Pending', volume: 'LKR 0', lastActive: 'Never' },
  { id: 'MID-005', name: 'Ocean View Hotel', city: 'Negombo', status: 'Active', volume: 'LKR 2.4M', lastActive: '5 mins ago' },
];

export default function MerchantControl() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Merchant Control</h2>
          <p className="text-slate-500">Manage merchant access, security, and account status.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-2xl font-bold shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-opacity">
          <Download className="w-4 h-4" />
          Export List
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by MID or Name..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Merchant ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Merchant Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">City</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Volume</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {merchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-brand-blue">{merchant.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{merchant.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{merchant.city}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      merchant.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                      merchant.status === 'Blocked' ? 'bg-red-50 text-red-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {merchant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{merchant.volume}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{merchant.lastActive}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="Reset Password" className="p-2 text-slate-400 hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-colors">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button title="Block Merchant" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Ban className="w-4 h-4" />
                      </button>
                      <button title="Activate Merchant" className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing 5 of 1,284 merchants</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-bold text-slate-400 bg-slate-50 rounded-xl cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 text-sm font-bold text-white bg-brand-blue rounded-xl shadow-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
