import React from 'react';
import { UserPlus, Mail, Shield, MoreHorizontal } from 'lucide-react';

export default function UserManagement() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
          <p className="text-slate-500">Manage administrative users and their access levels.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-2xl font-bold shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-opacity">
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'John Doe', role: 'Super Admin', email: 'john@qr4pos.com', status: 'Active' },
          { name: 'Sarah Smith', role: 'Report Viewer', email: 'sarah@qr4pos.com', status: 'Active' },
          { name: 'Mike Johnson', role: 'Merchant Manager', email: 'mike@qr4pos.com', status: 'Inactive' },
        ].map((user, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-brand-blue font-bold text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="font-bold text-slate-900 text-lg">{user.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Shield className="w-3 h-3 text-brand-blue" />
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">{user.role}</span>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-slate-500">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  {user.status}
                </span>
                <button className="text-xs font-bold text-brand-blue hover:underline">Edit Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
