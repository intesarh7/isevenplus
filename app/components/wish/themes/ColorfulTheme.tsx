export default function ColorfulTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white flex items-center justify-center text-center p-6 w-full">
  <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-xl shadow-2xl border border-white/20 w-full max-w-md">
    {children}
  </div>
</div>
  );
}