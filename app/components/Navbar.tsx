"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: "Pincode", href: "/pincode" },
  ];

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            <Image
              src="/isevenPlus-logo.png"
              alt="iSevenPlus Logo"
              width={130}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition ${pathname === link.href
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-700 hover:text-indigo-600"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <BookmarkButton />
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-semibold">
            Menu
          </span>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col p-6 gap-5">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg transition ${pathname === link.href
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-700 hover:text-indigo-600"
                }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Bookmark inside drawer */}
          <div className="pt-4 border-t">
            <BookmarkButton />
          </div>

        </div>
      </div>
    </>
  );
}