"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface SidebarCardProps {
  title: string;
  icon: ReactNode;
  items: {
    name: string;
    slug: string;
  }[];
  basePath?: string; // default: /tools
}

export default function SidebarCard({
  title,
  icon,
  items,
  basePath = "/tools",
}: SidebarCardProps) {

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

          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`${basePath}/${item.slug}`}
                className="group flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 transition"
              >
                <span className="truncate">
                  {item.name}
                </span>

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