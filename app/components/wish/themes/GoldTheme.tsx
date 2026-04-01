export default function GoldTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-600 text-white flex items-center justify-center text-center p-6 w-full">
      <div className="bg-black/50 p-6 rounded-2xl shadow-2xl backdrop-blur-lg w-full max-w-md border border-white/10">
        {children}
      </div>
    </div>
  );
}