export default function BlueTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 via-sky-300 to-indigo-500 text-white flex items-center justify-center text-center p-6 w-full">
      
      {/* Card */}
      <div className="bg-white/20 p-6 rounded-2xl shadow-xl backdrop-blur-md w-full max-w-md border border-white/30">
        
        {/* Top Accent */}
        <div className="h-1 w-full bg-blue-700 rounded-t-xl mb-4" />

        {/* Title */}
        <h2 className="text-xl font-semibold text-white mb-2">
          🔵 Happy Men’s Day 💪
        </h2>

        {/* Content */}
        {children}

        {/* Bottom Accent */}
        <div className="h-1 w-full bg-indigo-500 rounded-b-xl mt-4" />
      </div>
    </div>
  );
}