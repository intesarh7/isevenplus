export default function TricolorTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-white to-green-600 text-gray-900 flex items-center justify-center text-center p-6 w-full">
  
  {/* Card */}
  <div className="bg-white/70 p-6 rounded-2xl shadow-xl backdrop-blur-md w-full max-w-md border border-gray-200">
    
    {/* Top saffron strip */}
    <div className="h-1 w-full bg-orange-500 rounded-t-xl mb-4" />

    {/* Content */}
    {children}

    {/* Bottom green strip */}
    <div className="h-1 w-full bg-green-600 rounded-b-xl mt-4" />
  </div>
</div>
  );
}