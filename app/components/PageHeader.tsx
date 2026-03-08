"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft, Home } from "lucide-react";

export default function PageHeader({ items }: any) {
  const router = useRouter();

  return (
    <div className="mb-6">

      {/* Back Button */}

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-indigo-600 hover:underline mb-3"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Breadcrumb */}

      <nav className="flex flex-wrap items-center text-sm text-gray-600 gap-1">

        <Link
          href="/"
          className="flex items-center gap-1 text-indigo-600 hover:underline"
        >
          <Home size={16} />
          Home
        </Link>

        {items.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-1">

            <ChevronRight size={16} />

            {item.href ? (
              <Link
                href={item.href}
                className="text-indigo-600 hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">
                {item.label}
              </span>
            )}

          </div>
        ))}

      </nav>

    </div>
  );
}