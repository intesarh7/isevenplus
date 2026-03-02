import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ToolCard({ tool }: any) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="group bg-white/70 backdrop-blur border border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition duration-200">

        <div>
          <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition">
            {tool.name}
          </h3>

          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            {tool.description}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs text-blue-600 font-medium group-hover:translate-x-1 transition-all duration-200">
          Open Tool
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}