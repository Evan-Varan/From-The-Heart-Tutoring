import React from 'react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#131a2f] p-6 rounded-lg shadow text-white">
          <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
          <p className="text-sm text-gray-400">You have 3 sessions today</p>
        </div>
        <div className="bg-[#131a2f] p-6 rounded-lg shadow text-white">
          <h2 className="text-lg font-semibold">Unpaid Invoices</h2>
          <p className="text-sm text-gray-400">2 outstanding invoices</p>
        </div>
        <div className="bg-[#131a2f] p-6 rounded-lg shadow text-white">
          <h2 className="text-lg font-semibold">Revenue This Month</h2>
          <p className="text-sm text-gray-400">$2,340.00</p>
        </div>
      </div>
    </div>
  );
}
