import { ReactNode } from "react";

export default function CalculatorLayout({
  title,
  children,
  result,
}: {
  title: string;
  children: ReactNode;
  result?: ReactNode;
}) {
  return (
     <div className="w-full mt-10">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* ================= HEADER ================= */}
        <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
            {title}
          </h1>
        </div>

        {/* ================= BODY ================= */}
        <div className="p-6 md:p-8 space-y-6">
          {children}
        </div>

        {/* ================= RESULT ================= */}
        {result && (
          <div className="px-6 pb-8">
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center text-lg font-semibold">
              {result}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}