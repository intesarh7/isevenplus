export default function DarkTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-center p-6 w-full">
      <div className="border border-gray-700 p-6 rounded-2xl w-full max-w-md">
        {children}
      </div>
    </div>
  );
}