"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Dashboard", href: "/admin" },
    { name: "Tools", href: "/admin/tools" },
    { name: "Add Categories", href: "/admin/categories" },
    { name: "Pincodes", href: "/admin/pincode" },
    { name: "Ads", href: "/admin/ads" },
    { name: "Blogs", href: "/admin/blogs" },
    { name: "SEO Tools", href: "/admin/seotools" },
    { name: "SEO Categories", href: "/admin/seo-tools-categories" },
    { name: "SEO Setting", href: "/admin/seo-settings" },
    { name: "Profile", href: "/admin/profile" },
  ];

 const handleLogout = async () => {
  await fetch("/api/admin/logout", {
    method: "POST",
    credentials: "include",
  });

  router.push("/admin/login");
};
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

      <nav className="flex flex-col gap-4">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`p-2 rounded ${
              pathname === item.href
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-10 bg-red-600 px-4 py-2 rounded w-full"
      >
        Logout
      </button>
    </aside>
  );
}