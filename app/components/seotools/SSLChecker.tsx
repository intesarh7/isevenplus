"use client";

import { useState } from "react";
import { ShieldCheck, Search, AlertTriangle, Calendar, Building2, Globe, Lock, TrendingUp } from "lucide-react";

type SSLData = {
    domain: string;
    issuer: string;
    valid_from: string;
    valid_to: string;
    days_left: number;
    valid: boolean;
};

export default function SSLChecker() {
    const [domain, setDomain] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SSLData | null>(null);
    const [error, setError] = useState("");

    const checkSSL = async () => {
        if (!domain) return;

        setLoading(true);
        setError("");
        setData(null);

        try {
            const res = await fetch("/api/seotools/ssl-checker", {
                method: "POST",
                body: JSON.stringify({ domain }),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.error || "Failed");

            setData(result);
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="w-full p-4 space-y-6">

            {/* Input Section */}
            <div className="space-y-3">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <ShieldCheck className="text-green-600" /> SSL Checker Tool
                </h1>

                <input
                    type="text"
                    placeholder="Enter domain (example.com)"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                    <button
                        onClick={checkSSL}
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                    >
                        <Search size={18} /> Check SSL
                    </button>

                    <button
                        onClick={() => setDomain("google.com")}
                        className="flex-1 bg-green-600 text-white py-2 rounded-xl"
                    >
                        Try Example
                    </button>

                    <button
                        onClick={() => {
                            setDomain("");
                            setData(null);
                            setError("");
                        }}
                        className="flex-1 bg-gray-400 text-white py-2 rounded-xl"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="text-center text-indigo-600 animate-pulse">
                    Checking SSL certificate...
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-xl flex gap-2">
                    <AlertTriangle /> {error}
                </div>
            )}

            {/* Result */}
            {data && (
                <div className="bg-white/90 backdrop-blur border border-gray-200 shadow-xl rounded-2xl p-6 space-y-6">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                            <Lock className="text-indigo-600" size={20} />
                            SSL Certificate Details
                        </h2>

                        <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${data.valid
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {data.valid ? "Secure" : "Expired"}
                        </span>
                    </div>

                    {/* Grid */}
                    <div className="grid sm:grid-cols-2 gap-5">

                        {/* Domain */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                            <Globe className="text-indigo-600 mt-1" size={20} />
                            <div>
                                <p className="text-xs text-gray-500">Domain</p>
                                <p className="font-semibold text-gray-800 break-all">
                                    {data.domain}
                                </p>
                            </div>
                        </div>

                        {/* Issuer */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                            <Building2 className="text-indigo-600 mt-1" size={20} />
                            <div>
                                <p className="text-xs text-gray-500">Issued By</p>
                                <p className="font-semibold text-gray-800">
                                    {data.issuer}
                                </p>
                            </div>
                        </div>

                        {/* Valid From */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                            <Calendar className="text-green-600 mt-1" size={20} />
                            <div>
                                <p className="text-xs text-gray-500">Valid From</p>
                                <p className="font-semibold text-gray-800">
                                    {data.valid_from}
                                </p>
                            </div>
                        </div>

                        {/* Expiry */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                            <Calendar className="text-red-500 mt-1" size={20} />
                            <div>
                                <p className="text-xs text-gray-500">Expiry Date</p>
                                <p className="font-semibold text-gray-800">
                                    {data.valid_to}
                                </p>
                            </div>
                        </div>

                        {/* Days Left */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition col-span-full">
                            <ShieldCheck
                                className={`mt-1 ${data.days_left > 30 ? "text-green-600" : "text-red-500"
                                    }`}
                                size={20}
                            />
                            <div>
                                <p className="text-xs text-gray-500">Days Remaining</p>
                                <p
                                    className={`font-bold text-lg ${data.days_left > 30 ? "text-green-600" : "text-red-500"
                                        }`}
                                >
                                    {data.days_left} Days
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* SEO Content */}


            <div className="space-y-6 text-gray-700 leading-relaxed">

                {/* ABOUT */}
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ShieldCheck className="text-indigo-600" /> About SSL Checker Tool
                </h2>

                <p>
                    The <strong>SSL Checker Tool</strong> is a powerful online utility designed to analyze the security status of any website by inspecting its SSL certificate. SSL (Secure Sockets Layer) certificates are essential for securing data transfer between a user's browser and a web server. With increasing cyber threats and Google’s strong preference for secure websites, having a valid SSL certificate is no longer optional — it’s mandatory.
                </p>

                <p>
                    This free <strong>SSL certificate checker</strong> allows you to instantly verify certificate validity, issuer details, expiry date, and overall HTTPS security status. Whether you are a website owner, SEO expert, or developer, this tool helps you ensure your site is secure, trusted, and optimized for search engines.
                </p>

                <p>
                    By using this <strong>online SSL checker</strong>, you can avoid critical issues like expired certificates, insecure connections, and SEO penalties. It works in real-time and provides accurate insights into your domain’s SSL configuration.
                </p>

                {/* HOW IT WORKS */}
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Search className="text-green-600" /> How SSL Checking Works
                </h2>

                <p>
                    The SSL Checker tool works by establishing a secure connection with the target domain and retrieving its SSL certificate directly from the server. It uses advanced TLS protocols to fetch certificate data such as issuer, validity period, encryption level, and expiration date.
                </p>

                <p>
                    When you enter a domain name, the tool automatically extracts the hostname and initiates a connection over port 443 (HTTPS). It then reads the SSL certificate chain and processes important details including:
                </p>

                <ul className="list-disc ml-6 space-y-1">
                    <li>Certificate issuer (e.g., Let’s Encrypt, DigiCert)</li>
                    <li>Valid from date and expiry date</li>
                    <li>Total days remaining before expiration</li>
                    <li>SSL certificate status (valid or expired)</li>
                </ul>

                <p>
                    This <strong>HTTPS checker tool</strong> ensures that your website is properly configured with a secure SSL certificate. It also helps detect misconfigurations that could impact your site’s trust and SEO performance.
                </p>

                {/* BENEFITS */}
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <TrendingUp className="text-blue-600" /> Benefits of Using SSL Checker Tool
                </h2>

                <p>
                    Using a reliable <strong>SSL certificate checker</strong> offers multiple advantages for website owners, developers, and SEO professionals. Here are some key benefits:
                </p>

                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        <strong>Enhance Website Security:</strong> Ensure your SSL certificate is valid and protect sensitive user data from hackers.
                    </li>
                    <li>
                        <strong>Improve SEO Rankings:</strong> Google prioritizes HTTPS-enabled websites, helping you rank higher in search results.
                    </li>
                    <li>
                        <strong>Avoid Expiry Issues:</strong> Get real-time insights into certificate expiration and prevent downtime.
                    </li>
                    <li>
                        <strong>Build User Trust:</strong> A valid SSL certificate increases user confidence and credibility.
                    </li>
                    <li>
                        <strong>Identify Security Risks:</strong> Detect expired or misconfigured certificates instantly.
                    </li>
                </ul>

                <p>
                    A secure website not only protects user data but also improves engagement and conversion rates. That’s why regular SSL checks are essential for every website.
                </p>

                {/* WHY IMPORTANT */}
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Lock className="text-purple-600" /> Why SSL Certificate is Important for SEO
                </h2>

                <p>
                    SSL certificates play a crucial role in modern SEO strategies. Google has officially confirmed that HTTPS is a ranking factor. Websites without SSL certificates are marked as “Not Secure” in browsers, which can negatively impact user trust and search rankings.
                </p>

                <p>
                    By using this <strong>SSL checker online tool</strong>, you can ensure your website meets Google’s security standards. A valid SSL certificate helps:
                </p>

                <ul className="list-disc ml-6 space-y-1">
                    <li>Increase search engine rankings</li>
                    <li>Reduce bounce rate</li>
                    <li>Improve user experience</li>
                    <li>Boost conversion rates</li>
                </ul>

                {/* WARNING */}
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <AlertTriangle className="text-red-500" /> Common SSL Issues You Can Detect
                </h2>

                <p>
                    This tool helps identify common SSL-related problems that can harm your website’s performance:
                </p>

                <ul className="list-disc ml-6 space-y-1">
                    <li>Expired SSL certificate</li>
                    <li>Invalid issuer or self-signed certificate</li>
                    <li>Incorrect domain configuration</li>
                    <li>Mixed content issues</li>
                </ul>

                <p>
                    Detecting these issues early ensures your website remains secure and fully optimized for search engines.
                </p>

                {/* USE CASE */}
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Globe className="text-teal-600" /> Who Should Use This SSL Checker?
                </h2>

                <p>
                    This tool is ideal for:
                </p>

                <ul className="list-disc ml-6 space-y-1">
                    <li>Website owners and bloggers</li>
                    <li>SEO professionals and marketers</li>
                    <li>Developers and system administrators</li>
                    <li>E-commerce businesses</li>
                </ul>

                <p>
                    Whether you manage a small blog or a large enterprise website, regular SSL checks are essential for maintaining security and SEO performance.
                </p>

                {/* KEYWORDS */}
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Calendar className="text-orange-500" /> Related Search Tags
                </h2>

                <div className="flex flex-wrap gap-2">
                    {[
                        "SSL checker",
                        "SSL certificate checker",
                        "check SSL expiry",
                        "HTTPS checker",
                        "SSL validity check",
                        "certificate expiry checker",
                        "domain SSL checker",
                        "free SSL checker tool",
                        "online SSL checker",
                        "check SSL status"
                    ].map(tag => (
                        <span key={tag} className="bg-gray-100 hover:bg-indigo-100 transition px-3 py-1 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </div>

            </div>
        </div>
    );
}