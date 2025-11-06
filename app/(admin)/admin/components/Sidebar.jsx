"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Settings,
  HelpCircle,
  BarChart4,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: BookOpen,
    label: "Courses",
    href: "/admin/courses",
    subMenu: [
      { label: "All Courses", href: "/admin/courses" },
      { label: "Add New Course", href: "/admin/courses/new" },
    ],
  },
  {
    icon: Users,
    label: "Students",
    href: "/admin/users",
  },
  {
    icon: GraduationCap,
    label: "Faculty",
    href: "/admin/faculty",
  },
  {
    icon: BarChart4,
    label: "Reports",
    href: "/admin/reports",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
  },
  {
    icon: HelpCircle,
    label: "Support",
    href: "/admin/support",
  },
];

export default function AdminSidebar({ isOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleLogout = async () => {
    try {
      // Add any logout logic here (e.g., clearing cookies, local storage, etc.)
      setOpenSubmenu(null); // Close any open submenu
      router.push("/login"); // Or your authentication page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigation = (href, hasSubMenu, label) => {
    if (hasSubMenu) {
      toggleSubmenu(label);
    } else {
      setOpenSubmenu(null); // Close any open submenu
      router.push(href);
    }
  };

  const toggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-[#141824] text-gray-200 transition-all duration-300 flex flex-col h-full shadow-xl`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-2 justify-center">
        <span className="text-indigo-500 text-2xl">🎓</span>
        {isOpen && (
          <span className="font-bold text-lg tracking-wide">Academia</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="text-xs text-gray-500 uppercase mb-3 px-3">
          Main Menu
        </div>

        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const hasActiveSubmenu = item.subMenu?.some(
            (sub) => pathname === sub.href
          );

          return (
            <div key={item.label}>
              <div
                className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer
                  ${
                    isActive || hasActiveSubmenu
                      ? "bg-indigo-600/90 text-white"
                      : "hover:bg-indigo-500/10 text-gray-300 hover:text-white"
                  }
                `}
                onClick={() =>
                  handleNavigation(item.href, !!item.subMenu, item.label)
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={20}
                    className={
                      isActive || hasActiveSubmenu
                        ? "text-white"
                        : "text-gray-400"
                    }
                  />
                  {isOpen && <span>{item.label}</span>}
                </div>

                {isOpen && item.subMenu && (
                  <span
                    className="transition-transform duration-200"
                    style={{
                      transform:
                        openSubmenu === item.label
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown size={16} />
                  </span>
                )}
              </div>

              {/* Submenu with improved styling */}
              {item.subMenu && openSubmenu === item.label && isOpen && (
                <div className="ml-6 mt-2 mb-1 flex flex-col gap-1 border-l-2 border-indigo-500/30 pl-2">
                  {item.subMenu.map((sub) => (
                    <div
                      key={sub.label}
                      onClick={() => {
                        router.push(sub.href);
                        setOpenSubmenu(null);
                      }}
                      className={`px-3 py-2 rounded-md text-sm transition-all duration-200 cursor-pointer
                        ${
                          pathname === sub.href
                            ? "bg-indigo-500/20 text-white font-medium"
                            : "text-gray-400 hover:bg-indigo-500/10 hover:text-white"
                        }
                      `}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-800 p-4 flex flex-col gap-2">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500/10 transition-colors text-gray-300 hover:text-white"
        >
          <Settings size={18} />
          {isOpen && <span>Settings</span>}
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors text-gray-300 hover:text-red-400 w-full text-left"
        >
          <LogOut size={18} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
