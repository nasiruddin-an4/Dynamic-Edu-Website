// app/(admin)/admin/layout.js
"use client";

import { createContext, useContext, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "../../globals.css";

const SidebarContext = createContext();

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarItems, setSidebarItems] = useState([]);

  return (
    <SidebarContext.Provider
      value={{ items: sidebarItems, setItems: setSidebarItems }}
    >
      <html lang="en">
        <body className="antialiased min-h-screen bg-[#f3f4f8]">
          <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden">
              <Header
                onMenuClick={() => setSidebarOpen((prev) => !prev)}
                user={{
                  name: "Admin User",
                  email: "admin@academia.edu",
                  avatar: "AV",
                }}
              />

              <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
          </div>
        </body>
      </html>
    </SidebarContext.Provider>
  );
}
