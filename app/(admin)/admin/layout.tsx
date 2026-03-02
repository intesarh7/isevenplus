import { ReactNode } from "react";
 import SidebarWrapper from "@/app/components/financecalculator/SidebarWrapper";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarWrapper />
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
}