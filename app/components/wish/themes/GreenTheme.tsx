export default function GreenTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-300 via-emerald-200 to-teal-400 text-green-900 flex items-center justify-center text-center p-6 w-full">
      
      {/* Card */}
      <div className="bg-white/70 p-6 rounded-2xl shadow-xl backdrop-blur-md w-full max-w-md border border-green-200">
        
        {/* Top Accent */}
        <div className="h-1 w-full bg-green-600 rounded-t-xl mb-4" />

        {/* Title */}
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          🌍 Happy Earth Day 🌱
        </h2>

        {/* Content */}
        {children}

        {/* Bottom Accent */}
        <div className="h-1 w-full bg-teal-500 rounded-b-xl mt-4" />
      </div>
    </div>
  );
}