"use client";
import img from './../../../public/login.jpeg'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag, User } from "lucide-react";
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Designs", href: "/designs" },
  { label: "Order", href: "/order" },
  { label: "About", href: "/about" },
];
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src={img}
            alt="RECO"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="text-lg font-semibold tracking-wide text-secondary-900">
            RECO
          </span>
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-secondary-700 transition-colors hover:text-primary-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            href="/orders"
            aria-label="Orders"
            className="hidden rounded-full p-2 text-secondary-700 transition-colors hover:bg-secondary-50 hover:text-primary-600 sm:inline-flex"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="inline-flex items-center justify-center rounded-full bg-primary-500 p-2 text-secondary-900 transition-colors hover:bg-primary-600"
          >
            <User className="h-5 w-5" strokeWidth={2} />
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-1 inline-flex rounded-full p-2 text-secondary-700 hover:bg-secondary-50 hover:text-primary-600 md:hidden"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" strokeWidth={1.75} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="border-t border-secondary-100 md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-secondary-700 transition-colors hover:bg-secondary-50 hover:text-primary-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div
        className="h-3 w-full"
        style={{
          backgroundColor: "var(--color-primary-500)",
          backgroundImage:
            "repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 1px, transparent 1px, transparent 20px)",
          backgroundSize: "100% 45%, 100% 100%",
          backgroundPosition: "bottom, bottom",
          backgroundRepeat: "repeat-x, repeat-x",
        }}
      />
    </header>
  );
}