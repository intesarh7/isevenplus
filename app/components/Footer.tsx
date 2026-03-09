import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            iSevenPlus
          </h2>
          <p className="text-sm leading-6">
            Smart online financial calculators and tools platform.
            Helping you make better financial decisions worldwide.
          </p>
        </div>

        {/* Financial Calculators */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Financial Tools
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/tools/mortgage-calculator" className="hover:text-white">Mortgage Calculator</Link></li>
            <li><Link href="/tools/credit-card-payoff-calculator" className="hover:text-white">Credit Card Payoff</Link></li>
            <li><Link href="/tools/rent-vs-buy-calculator" className="hover:text-white">Rent vs Buy</Link></li>
            <li><Link href="/tools/net-worth-calculator" className="hover:text-white">Net Worth Calculator</Link></li>
          </ul>
        </div>

        {/* Investment & Planning */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Investment & Planning
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/tools/sip-calculator" className="hover:text-white">SIP Calculator</Link></li>
            <li><Link href="/tools/ppf-calculator" className="hover:text-white">PPF Calculator</Link></li>
            <li><Link href="/tools/college-cost-calculator" className="hover:text-white">College Cost</Link></li>
            <li><Link href="/tools/inflation-calculator" className="hover:text-white">Inflation Calculator</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link href="/blogs" className="hover:text-white">Blogs</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 iSevenPlus. All rights reserved.</p>
          <p className="mt-3 md:mt-0">
            Built for global financial planning.
          </p>
        </div>
      </div>
    </footer>
  );
}