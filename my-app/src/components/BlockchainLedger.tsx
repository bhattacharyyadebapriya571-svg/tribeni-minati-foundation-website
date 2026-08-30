import React, { useState } from 'react';
import { BLOCKCHAIN_LEDGER_DATA } from '../data/foundationData';
import { Database, ShieldCheck, CheckCircle2, Search, Building } from 'lucide-react';

export const BlockchainLedger: React.FC = () => {
  const [filterProject, setFilterProject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTransactions = BLOCKCHAIN_LEDGER_DATA.filter((tx) => {
    const matchesProject =
      filterProject === 'All' ||
      tx.project.toLowerCase().includes(filterProject.toLowerCase()) ||
      (filterProject === 'Education' && tx.project.toLowerCase().includes('education')) ||
      (filterProject === 'Healthcare' && (tx.project.toLowerCase().includes('help') || tx.project.toLowerCase().includes('clinic') || tx.project.toLowerCase().includes('blood'))) ||
      (filterProject === 'Infant Care' && tx.project.toLowerCase().includes('infant')) ||
      (filterProject === 'Women SHG' && tx.project.toLowerCase().includes('women'));

    const matchesSearch =
      tx.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesProject && matchesSearch;
  });

  return (
    <section id="transparency" className="py-24 sm:py-32 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#1E3A8A] bg-blue-50 border border-blue-200 mb-4">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              Statutory Banking &amp; Public Accounts Ledger
            </div>
            <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight tracking-tight mb-3">
              Every Rupee Accounted For &amp; Verifiable.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Donors, trustees, and CSR committees can review institutional line-item allocations verified against our Central Bank of India statutory account statements.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search voucher ID, district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['All', 'Education', 'Healthcare', 'Infant Care', 'Women SHG'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterProject(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    filterProject === filter
                      ? 'bg-blue-700 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ledger Table Container */}
        <div className="rounded-3xl p-2 bg-slate-100 border border-slate-200 overflow-hidden shadow-md">
          <div className="rounded-[calc(1.5rem-0.25rem)] bg-white overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-5">Voucher Ref &amp; Banking TX</th>
                  <th className="py-4 px-5">Target Welfare Program</th>
                  <th className="py-4 px-5">Location</th>
                  <th className="py-4 px-5">Disbursed Amount</th>
                  <th className="py-4 px-5">Audit Verification</th>
                  <th className="py-4 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Ref */}
                    <td className="py-4 px-5">
                      <div className="font-bold text-blue-900">{tx.id}</div>
                      <div className="font-mono text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        {tx.hash}
                      </div>
                    </td>

                    {/* Project */}
                    <td className="py-4 px-5 font-semibold text-slate-800">
                      {tx.project}
                    </td>

                    {/* Geography */}
                    <td className="py-4 px-5 text-slate-600">
                      {tx.state}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-5 font-bold text-blue-900 font-mono text-sm">
                      {tx.amount}
                    </td>

                    {/* Beneficiaries & Verifier */}
                    <td className="py-4 px-5">
                      <div className="font-medium text-slate-700">{tx.beneficiariesCount}</div>
                      <div className="text-[10px] text-emerald-700 font-medium">{tx.verifier}</div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ledger Bottom Proof */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Audited under the West Bengal Societies Registration Act, 1961 (Reg: SO212276) · Income Tax 12A &amp; 80G Certified</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-600">
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span>Central Bank of India A/C: 5894594000</span>
          </div>
        </div>
      </div>
    </section>
  );
};
