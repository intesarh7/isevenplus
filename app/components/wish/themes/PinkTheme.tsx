export default function PinkTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-400 via-rose-300 to-fuchsia-500 text-white flex items-center justify-center text-center p-6 w-full">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="animate-ping text-pink-300 text-xl absolute top-10 left-10">💖</span>
        <span className="animate-pulse text-rose-300 text-xl absolute bottom-10 right-10">💕</span>
      </div>
      {/* Card */}
      <div className="bg-white/20 p-6 rounded-2xl shadow-[0_0_30px_rgba(255,105,180,0.4)] backdrop-blur-md">

        {/* Top glow line */}
        <div className="h-1 w-full bg-pink-500 rounded-t-xl mb-4" />

        {/* Content */}
        {children}

        {/* Bottom glow line */}
        <div className="h-1 w-full bg-fuchsia-500 rounded-b-xl mt-4" />
      </div>
    </div>
  );
}