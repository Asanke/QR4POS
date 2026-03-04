import React, { useState } from 'react';
import { 
  Search, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  XCircle,
  MessageSquare,
  Calendar,
  Hash,
  X,
  Send
} from 'lucide-react';

interface Transaction {
  id: string;
  mid: string;
  amount: string;
  currency: string;
  date: string;
  status: string;
  dispute?: {
    reason: string;
    status: string;
    date: string;
  };
}

const initialTransactions: Transaction[] = [
  { id: 'TXN-5161', mid: 'MID-001', amount: '2,500.00', currency: 'LKR', date: '2024-03-04', status: 'Success', dispute: { reason: 'Double Charge', status: 'Open', date: '2024-03-04' } },
  { id: 'TXN-6675', mid: 'MID-042', amount: '1,200.00', currency: 'LKR', date: '2024-03-03', status: 'Success' },
  { id: 'TXN-5840', mid: 'MID-005', amount: '500.00', currency: 'LKR', date: '2024-03-02', status: 'Success' },
  { id: 'TXN-9912', mid: 'MID-012', amount: '4,500.00', currency: 'LKR', date: '2024-03-01', status: 'Success' },
];

export default function Disputes() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchMID, setSearchMID] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [disputeReason, setDisputeReason] = useState('');

  const handleDispute = (txn: Transaction) => {
    setSelectedTxn(txn);
    setDisputeReason(txn.dispute?.reason || '');
  };

  const saveDispute = () => {
    if (!selectedTxn) return;
    
    const updated = transactions.map(t => {
      if (t.id === selectedTxn.id) {
        return {
          ...t,
          dispute: {
            reason: disputeReason,
            status: t.dispute?.status || 'Open',
            date: t.dispute?.date || new Date().toISOString().split('T')[0]
          }
        };
      }
      return t;
    });
    
    setTransactions(updated);
    setSelectedTxn(null);
    setDisputeReason('');
  };

  const openWhatsApp = (mid: string) => {
    // Mock phone number for MID
    const phone = "94771234567"; 
    const message = encodeURIComponent(`Hi, this is regarding a dispute for MID: ${mid}. Transaction ID: ${selectedTxn?.id}`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const filtered = transactions.filter(t => {
    const matchMID = t.mid.toLowerCase().includes(searchMID.toLowerCase());
    const matchDate = searchDate ? t.date === searchDate : true;
    return matchMID && matchDate;
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Disputes Management</h2>
        <p className="text-slate-500">Find transactions and manage disputes.</p>
      </div>

      {/* Search Filters */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Search by MID</label>
          <div className="relative">
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-blue" />
            <input 
              type="text" 
              placeholder="Enter Merchant ID..." 
              className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 pl-12 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
              value={searchMID}
              onChange={(e) => setSearchMID(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Search by Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-blue" />
            <input 
              type="date" 
              className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 pl-12 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Transaction History</h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filtered.length} Records Found</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">TXN ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Merchant ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-brand-blue">{txn.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{txn.mid}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{txn.currency} {txn.amount}</td>
                  <td className="px-6 py-4 text-sm text-slate-400 font-mono">{txn.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600">
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {txn.dispute ? (
                      <button 
                        onClick={() => handleDispute(txn)}
                        className="bg-red-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all uppercase tracking-wider cursor-pointer"
                      >
                        Disputed
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleDispute(txn)}
                        className="bg-brand-blue text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-all uppercase tracking-wider cursor-pointer"
                      >
                        Dispute
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispute Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between gradient-bg">
              <h3 className="font-bold text-white uppercase tracking-wider">
                {selectedTxn.dispute ? 'Edit Dispute' : 'Create Dispute'}
              </h3>
              <button 
                onClick={() => setSelectedTxn(null)}
                className="p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Transaction ID</p>
                  <p className="text-sm font-bold text-slate-900">{selectedTxn.id}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Merchant ID</p>
                  <p className="text-sm font-bold text-slate-900">{selectedTxn.mid}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Amount</p>
                  <p className="text-sm font-bold text-brand-blue">{selectedTxn.currency} {selectedTxn.amount}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
                  <p className="text-sm font-bold text-slate-900">{selectedTxn.date}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Dispute Reason</label>
                <textarea 
                  rows={4}
                  placeholder="Enter the reason for this dispute..."
                  className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none"
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={saveDispute}
                  className="btn-primary w-full py-4 rounded-2xl shadow-lg shadow-brand-blue/20"
                >
                  <Send className="w-4 h-4" />
                  {selectedTxn.dispute ? 'Update Dispute' : 'Submit Dispute'}
                </button>
                <button 
                  onClick={() => openWhatsApp(selectedTxn.mid)}
                  className="bg-emerald-500 text-white font-bold w-full py-4 rounded-2xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 text-sm tracking-wider cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Merchant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

