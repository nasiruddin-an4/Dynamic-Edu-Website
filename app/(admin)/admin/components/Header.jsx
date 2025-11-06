import { Bell, Search } from "lucide-react";

export default function Header({ onMenuClick, user }) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
            <span className="text-sm font-medium text-white">AV</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">admin@academia.edu</p>
          </div>
        </div>
      </div>
    </header>
  );
}
