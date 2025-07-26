"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export function NavLinks() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/inbox", label: "Inbox" },
  ];
  return (
    <nav className="flex gap-2 text-base font-medium">
      {links.map((link) => {
        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-5 py-2 rounded-full transition font-semibold ${
              isActive
                ? 'bg-indigo-600 text-white shadow'
                : 'text-gray-900 dark:text-indigo-300 hover:bg-gray-100 dark:hover:bg-indigo-900/50'
            }`}
            style={{ minWidth: '80px', textAlign: 'center' }}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}