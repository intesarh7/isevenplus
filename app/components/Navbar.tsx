"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import Image from "next/image";

export default function Navbar() {

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Pincode India", href: "/pincode" },
    { name: "Postal Codes Worldwide", href: "/postalcode" },
    { name: "Blogs", href: "/blogs" },
    { name: "Events", href: "/events" },
    
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

          {/* ================= Desktop Menu ================= */}
          <nav className="hidden md:flex items-center gap-6">

            {/* Home / Pincode / Blogs */}
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

            {/* ================= Tools Dropdown ================= */}
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >

              <button className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 cursor-pointer">
                Tools
                <ChevronDown size={16} />
              </button>

              {toolsOpen && (
                <div className="absolute top-full left-0 w-48 bg-white border rounded-xl shadow-lg py-2 z-10">

                  <Link
                    href="/tools"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Calculator Tools
                  </Link>

                  <Link
                    href="/seotools"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    SEO Tools
                  </Link>

                </div>
              )}

            </div>

            <BookmarkButton />

          </nav>

          {/* ================= Mobile Hamburger ================= */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} />
          </button>

        </div>
      </header>

      {/* ================= Overlay ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ================= Drawer Menu ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-gray-950 shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >

        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-semibold text-white">
            Menu
          </span>
          <button onClick={() => setIsOpen(false)} className="text-white">
            <X size={24} />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col p-6 gap-5">

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-lg text-white hover:text-indigo-600"
          >
            Home
          </Link>

          {/* Mobile Tools Section */}
          <div className="flex flex-col gap-2">

            <span className="text-lg font-semibold text-white">
              Tools
            </span>

            <Link
              href="/tools"
              onClick={() => setIsOpen(false)}
              className="ml-4 text-white hover:text-indigo-600"
            >
             - Calculator Tools
            </Link>

            <Link
              href="/seotools"
              onClick={() => setIsOpen(false)}
              className="ml-4 text-white hover:text-indigo-600"
            >
              - SEO Tools
            </Link>

          </div>

          <Link
            href="/pincode"
            onClick={() => setIsOpen(false)}
            className="text-lg text-white hover:text-indigo-600"
          >
            Pincode India
          </Link>

          <Link
            href="/postalcode"
            onClick={() => setIsOpen(false)}
            className="text-lg text-white hover:text-indigo-600"
          >
            Postal Codes Worldwide
          </Link>

          <Link
            href="/blogs"
            onClick={() => setIsOpen(false)}
            className="text-lg text-white hover:text-indigo-600"
          >
            Blogs
          </Link>
          <Link
            href="/events"
            onClick={() => setIsOpen(false)}
            className="text-lg text-white hover:text-indigo-600"
          >
            Events
          </Link>

          {/* Bookmark */}
          <div className="pt-4 border-t">
            <BookmarkButton />
          </div>

        </div>
      </div>
    </>
  );
}