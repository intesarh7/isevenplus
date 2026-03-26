export default function ColorfulTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 text-white flex items-center justify-center text-center p-6 w-full">
      <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
}