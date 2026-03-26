export default function PurpleTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-300 via-pink-200 to-fuchsia-400 text-white flex items-center justify-center text-center p-6 w-full">
      
      {/* Card */}
      <div className="bg-white/20 p-6 rounded-2xl shadow-xl backdrop-blur-md w-full max-w-md border border-white/30">
        
        {/* Top Accent */}
        <div className="h-1 w-full bg-purple-600 rounded-t-xl mb-4" />

        {/* Title */}
        <h2 className="text-xl font-semibold text-white mb-2">
          💜 Happy Women’s Day 💐
        </h2>

        {/* Content */}
        {children}

        {/* Bottom Accent */}
        <div className="h-1 w-full bg-pink-500 rounded-b-xl mt-4" />
      </div>
    </div>
  );
}