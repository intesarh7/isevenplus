export default function GoldTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center text-center p-6 w-full">
      <div className="bg-black/40 p-6 rounded-2xl shadow-xl backdrop-blur-md w-full max-w-md">
        {children}
      </div>
    </div>
  );
}