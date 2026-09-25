"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  Calendar,
  CreditCard,
  FileText,
  ShieldCheck,
  ArrowUpRight,
  FolderArchive,
} from "lucide-react";
import { useLegal } from "@/context/LegalContext";

export function Navbar() {
  const pathname = usePathname();
  const { allHearings, cases, evidences } = useLegal();

  const urgentHearingCount = allHearings.filter((h) => h.isUrgent).length;

  const navLinks = [
    { name: "Perkara & Sidang", href: "/", icon: Calendar, badge: urgentHearingCount > 0 ? urgentHearingCount : undefined },
    { name: "Billing & Retainer", href: "/billing/", icon: CreditCard },
    { name: "Surat Gugatan A4", href: "/pleading/", icon: FileText },
    { name: "Evidence Vault", href: "/evidence/", icon: FolderArchive, badge: evidences.length },
  ];

  return (
    <header className="border-b border-slate-800 bg-[#050918]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-indigo-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Scale className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-base tracking-wider">LEXJURIST</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold">
                  TITAN 14
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Enterprise Law Practice ERP &amp; Court Hearing Docket</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#080e24] border border-slate-800 text-xs mr-2">
            <span className="text-[10px] text-slate-400 uppercase">Aktif:</span>
            <span className="font-black text-amber-400 font-mono">{cases.length} Perkara</span>
          </div>

          <nav className="flex items-center gap-1 sm:gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{link.name}</span>
                  {link.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                        isActive ? "bg-slate-950 text-amber-400" : "bg-rose-500 text-white"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <a
              href="https://olyxmintabansos-byte.github.io/olyx-portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <span>Apex Hub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
