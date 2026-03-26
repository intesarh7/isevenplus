export default function WarmTheme({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-linear-to-br from-amber-200 via-orange-300 to-red-400 text-brown-900 flex items-center justify-center text-center p-6 w-full">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <span className="absolute top-10 left-10 text-orange-500 animate-bounce">🍁</span>
                <span className="absolute bottom-10 right-10 text-red-500 animate-pulse">🍂</span>
            </div>
            {/* Card */}
            <div className="bg-white/30 p-6 rounded-2xl shadow-xl backdrop-blur-md w-full max-w-md border border-white/40 relative">

                {/* Top Accent (Autumn Orange) */}
                <div className="h-1 w-full bg-orange-600 rounded-t-xl mb-4" />
                <p className="text-sm text-orange-800 mb-3">
                    Grateful • Thankful • Blessed
                </p>
                {/* Title */}
                <h2 className="text-xl font-semibold text-orange-900 mb-2">
                    🦃 Happy Thanksgiving 🍁
                </h2>

                {/* Content */}
                {children}

                {/* Bottom Accent (Warm Red) */}
                <div className="h-1 w-full bg-red-500 rounded-b-xl mt-4" />
            </div>
        </div>
    );
}