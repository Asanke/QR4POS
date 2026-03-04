import React from 'react';
import { 
  Search, 
  FileDown, 
  Calendar, 
  Hash, 
  Layers,
  MessageSquare,
  ChevronDown,
  MapPin
} from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
        <span>REPORT MANAGEMENT</span>
        <span className="text-slate-300">/</span>
        <span className="text-brand-blue">QUERY MANAGEMENT</span>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FilterField label="From Date" icon={<Calendar className="w-4 h-4 text-brand-blue" />} type="date" />
          <FilterField label="To Date" icon={<Calendar className="w-4 h-4 text-brand-blue" />} type="date" />
          <FilterField label="Merchant ID (MID)" icon={<Hash className="w-4 h-4 text-brand-blue" />} placeholder="Enter MID" />
          <FilterField label="Reference" icon={<Layers className="w-4 h-4 text-brand-blue" />} placeholder="Enter Reference" />
          <FilterField label="Location" icon={<MapPin className="w-4 h-4 text-brand-blue" />} placeholder="Enter City/Branch" />
          <FilterSelect label="QR Type" options={['Static', 'Dynamic']} />
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="btn-primary px-10 py-3.5">
            <Search className="w-4 h-4" />
            SEARCH
          </button>
          <button className="bg-red-500 text-white font-bold px-10 py-3.5 rounded-full shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all flex items-center justify-center gap-2 text-sm tracking-wider cursor-pointer">
            <FileDown className="w-4 h-4" />
            DOWNLOAD PDF
          </button>
          <button className="bg-emerald-500 text-white font-bold px-10 py-3.5 rounded-full shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 text-sm tracking-wider cursor-pointer">
            <MessageSquare className="w-4 h-4" />
            WHATSAPP
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Transaction Results</h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">3 Records Found</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-blue text-white text-sm font-bold">
                <th className="px-6 py-4 border-r border-white/10">Actions</th>
                <th className="px-6 py-4 border-r border-white/10">MID</th>
                <th className="px-6 py-4 border-r border-white/10">QR Type</th>
                <th className="px-6 py-4 border-r border-white/10">Amount</th>
                <th className="px-6 py-4 border-r border-white/10">Currency</th>
                <th className="px-6 py-4 border-r border-white/10">Trace</th>
                <th className="px-6 py-4">Reference</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {[
                { mid: 'MID-001', type: 'Dynamic', amount: '2,500.00', currency: 'LKR', trace: '5161', ref: '2026022700147882' },
                { mid: 'MID-002', type: 'Static', amount: '1,200.00', currency: 'LKR', trace: '667501', ref: '000013529899' },
                { mid: 'MID-001', type: 'Dynamic', amount: '500.00', currency: 'LKR', trace: '584045', ref: 'BC0012574708' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                  <td className="px-6 py-4 border-r border-slate-50">
                    <button className="p-2 text-brand-blue hover:bg-brand-blue/5 rounded-full transition-colors cursor-pointer">
                      <FileDown className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="px-6 py-4 border-r border-slate-50 font-bold">{row.mid}</td>
                  <td className="px-6 py-4 border-r border-slate-50">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      row.type === 'Dynamic' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r border-slate-50 font-bold">{row.amount}</td>
                  <td className="px-6 py-4 border-r border-slate-50">{row.currency}</td>
                  <td className="px-6 py-4 border-r border-slate-50 font-mono text-xs">{row.trace}</td>
                  <td className="px-6 py-4 font-mono text-xs">{row.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FilterField({ label, icon, type = "text", placeholder }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-blue transition-colors">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {icon}
        </div>
        <input 
          type={type} 
          placeholder={placeholder}
          className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3.5 pl-12 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
        />
      </div>
    </div>
  );
}

function FilterSelect({ label, options }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-blue transition-colors">
        {label}
      </label>
      <div className="relative">
        <select 
          defaultValue=""
          className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all appearance-none"
        >
          <option value="" disabled>Select {label}</option>
          {options.map((opt: string) => <option key={opt} value={opt.toLowerCase()}>{opt}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
