"use client";

import Link from "next/link";
import { ChevronRight, Flame } from "lucide-react";
import { ReactNode } from "react";
export const dynamic = "force-dynamic";
interface SidebarCardProps {
  title: string;
  icon: ReactNode;
  items: {
    name: string;
    slug: string;
    type?: string;
    createdAt?: string;
  }[];
  basePath?: string;
}

export default function SidebarCard({
  title,
  icon,
  items,
  basePath = "/tools",
}: SidebarCardProps) {

  // ✅ Check NEW (last 3 days)
  const isNew = (date?: string) => {
    if (!date) return false;
    const created = new Date(date);
    const now = new Date();
    const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 3;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center gap-2 px-5 py-4 bg-gray-50 border-b border-gray-100">
        {icon}
        <h3 className="font-semibold text-gray-800">
          {title}
        </h3>
      </div>

      {/* BODY */}
      <div className="p-4">
        <ul className="space-y-2">

          {/* EMPTY STATE */}
          {(!items || items.length === 0) && (
            <li className="text-sm text-gray-400 text-center py-4">
              No tools available
            </li>
          )}

          {items.map((item, index) => (
            <li key={item.slug}>
              
              <Link
                href={`${basePath}/${item.slug}`}
                className="group flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 transition"
              >
                {/* LEFT */}
                <div className="flex items-center gap-2 truncate">

                  <span className="truncate">
                    {item.name}
                  </span>

                  {/* TYPE BADGE */}
                  {item.type && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded 
                      ${item.type === "seo"
                        ? "bg-green-100 text-green-600"
                        : "bg-indigo-100 text-indigo-600"
                      }`}
                    >
                      {item.type === "seo" ? "SEO" : "Tool"}
                    </span>
                  )}

                  {/* 🆕 NEW BADGE */}
                  {isNew(item.createdAt) && (
                    <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded">
                      NEW
                    </span>
                  )}

                  {/* 🔥 TRENDING (Top 3 popular only) */}
                  {title === "Popular Tools" && index < 3 && (
                    <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
                      <Flame size={12} /> Trending
                    </span>
                  )}

                </div>

                {/* RIGHT ICON */}
                <ChevronRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition"
                />
              </Link>

            </li>
          ))}

        </ul>
      </div>

    </div>
  );
}
