"use client";

import { Star, Users, Zap, ShieldCheck, BadgeCheck } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import LiveUsers from "./LiveUsers";

export default function TrustBar() {
    return (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">

            {/* USERS */}
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border">
                <Users size={14} className="text-indigo-600" />
                <span>
                    <span className="font-semibold text-indigo-600">
                        <AnimatedCounter target={10000} />
                    </span>{" "}
                    Users
                </span>
            </div>

            <LiveUsers />

            {/* TRUST */}
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border">
                <Star size={14} className="text-yellow-500 fill-yellow-400" />
                Trusted Platform
            </div>

            {/* FAST */}
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border">
                <Zap size={14} className="text-indigo-500" />
                Instant Results
            </div>

            {/* FREE */}
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border">
                <BadgeCheck size={14} className="text-green-600" />
                100% Free
            </div>

            {/* SECURE */}
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border">
                <ShieldCheck size={14} className="text-emerald-600" />
                No Signup Needed
            </div>

        </div>
    );
}