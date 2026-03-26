export default function LightTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-green-50 text-gray-800 flex items-center justify-center text-center p-6 w-full">
      
      {/* Card */}
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 relative">
        
        {/* Top Accent (Chalkboard Green) */}
        <div className="h-1 w-full bg-green-600 rounded-t-xl mb-4" />

        {/* Title */}
        <h2 className="text-xl font-semibold text-green-700 mb-2">
          🍎 Happy Teacher’s Day
        </h2>

        {/* Content */}
        {children}

        {/* Bottom Accent (Soft Yellow) */}
        <div className="h-1 w-full bg-yellow-400 rounded-b-xl mt-4" />
      </div>
    </div>
  );
}