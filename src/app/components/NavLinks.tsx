"use client";
import { usePathname } from "next/navigation";
import React from "react";

export function NavLinks() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/inbox", label: "Inbox" },
  ];
  return (
    <nav className="flex gap-3 text-base font-medium text-indigo-700">
      {links.map((link) => {
        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
        return (
          <a
            key={link.href}
            href={link.href}
            className={`nav-link ${isActive ? 'active' : ''}`}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'all 0.15s ease-in-out',
              ...(isActive ? {
                backgroundColor: '#4f46e5',
                color: 'white',
                fontWeight: 'bold',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              } : {
                color: '#4f46e5'
              })
            }}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}