'use client';

export default function CommandCenterPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <h1 className="text-lg font-bold">🚀 Command Center</h1>
      </header>

      {/* Bismillah Banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-center">
        <p className="text-amber-800 text-sm">بِسْمِ اللَّهِ</p>
        <p className="text-amber-700 text-[10px]">Dream OS v2.1</p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {['Total: 12', 'Pending: 5', 'Done: 7', 'Urgent: 2'].map((stat) => (
            <div key={stat} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">{stat.split(':')[1]}</p>
              <p className="text-xs text-gray-500">{stat.split(':')[0]}</p>
            </div>
          ))}
        </div>

        {/* Modules */}
        <div className="grid grid-cols-3 gap-3">
          {['🎯 Cmd', '📅 Book', '⚠️ K3', '🛡️ Sec', '🧹 Jan', '📦 Stok'].map((mod) => (
            <button key={mod} className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm active:scale-95 transition-transform">
              <p className="text-lg mb-1">{mod.split(' ')[0]}</p>
              <p className="text-[10px] font-semibold text-gray-700">{mod.split(' ')[1]}</p>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <p className="text-sm font-bold text-gray-700 mb-3">Quick Actions</p>
          <div className="flex flex-wrap gap-2">
            {['Backup', 'Export', 'Refresh', 'Settings'].map((action) => (
              <button key={action} className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold active:opacity-80">
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 px-4 py-2 z-50">
        <div className="flex justify-around">
          {['🏠', '👤', '🔳', '🔔', '⚙️'].map((icon, i) => (
            <button key={i} className="p-2 text-gray-400 hover:text-blue-500">
              <span className="text-xl block">{icon}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  );
}
