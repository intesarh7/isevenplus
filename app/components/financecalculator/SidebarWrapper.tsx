"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "../AdminSidebar";

export default function SidebarWrapper() {
  const pathname = usePathname();

  const isLogin = pathname === "/admin/login";

  if (isLogin) return null;

  return <AdminSidebar />;
}