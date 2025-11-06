// app/(admin)/admin/users/page.jsx
"use client";

import { useEffect } from "react";
import { useSidebar } from "../layout";

export default function UsersPage() {
  const { setItems } = useSidebar();

  useEffect(() => {
    setItems([
      { id: "dashboard", label: "Dashboard", href: "/admin" },
      { id: "users", label: "Users", href: "/admin/users" },
      { id: "users-add", label: "Create User", href: "/admin/users/create" },
      { id: "settings", label: "Settings", href: "/admin/settings" },
    ]);
  }, [setItems]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <p>Users list and management UI.</p>
    </div>
  );
}
