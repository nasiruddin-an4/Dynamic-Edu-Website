"use client";
import { Users, BookOpen, TrendingUp, DollarSign } from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "12,504",
    change: "+5.2% this month",
    trend: "up",
    icon: Users,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Total Courses",
    value: "862",
    change: "+12 new courses",
    trend: "up",
    icon: BookOpen,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    title: "Passing Rate",
    value: "89.7%",
    change: "-1.2% from last term",
    trend: "down",
    icon: TrendingUp,
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
  },
  {
    title: "Tuition Revenue",
    value: "$4.8M",
    change: "+8.0% YTD",
    trend: "up",
    icon: DollarSign,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
];

const recentActivity = [
  { user: "Dr. Smith", action: 'updated course "CS101"', time: "2m ago" },
  {
    user: "Admin",
    action: "approved 15 new student applications",
    time: "1h ago",
  },
  {
    user: "Finance Dept.",
    action: "processed tuition payments",
    time: "3h ago",
  },
  {
    user: "Jane Doe",
    action: 'submitted final grades for "HIST203"',
    time: "6h ago",
  },
  {
    user: "IT Support",
    action: "scheduled system maintenance for Sunday",
    time: "1d ago",
  },
];

function StatsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          <p
            className={`text-sm mt-1 ${
              trend === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}
          </p>
        </div>
        <div className={`${iconBg} ${iconColor} p-3 rounded-lg`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Enrollment Trends</h3>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            Chart Component Will Go Here
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">
          AI-Powered Report Summary
        </h3>
        <p className="text-gray-600 mb-4">
          Generate a concise summary of the current academic status using
          Gemini.
        </p>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
          <span>Generate Summary</span>
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 19L20 12L13 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 12H4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
