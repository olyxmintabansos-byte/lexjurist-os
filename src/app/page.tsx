"use client";

import React, { useState } from "react";
import { useLegal } from "@/context/LegalContext";
import { CourtHearingTimeline } from "@/components/CourtHearingTimeline";
import { CaseCategory } from "@/types/legal";
import { formatIDR } from "@/lib/utils";
import {
  Scale,
  Briefcase,
  AlertTriangle,
  Plus,
  Sparkles,
  Gavel,
  ShieldCheck,
  Building,
} from "lucide-react";

export default function LegalDashboardPage() {
  const { cases, allHearings, createCase } = useLegal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newCaseNumber, setNewCaseNumber] = useState("");
  const [newCategory, setNewCategory] = useState<CaseCategory>("Commercial Litigation");
  const [newClient, setNewClient] = useState("");
  const [newOpponent, setNewOpponent] = useState("");
  const [newClaim, setNewClaim] = useState<number>(10000000000);
  const [newCourt, setNewCourt] = useState("Pengadilan Negeri Jakarta Pusat");
  const [newPartner, setNewPartner] = useState("Prof. Dr. Faisal Hartono, S.H., LL.M.");

  const totalLitigationValueIDR = cases.reduce((acc, c) => acc + c.claimAmountIDR, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCaseNumber) return;

    createCase({
      title: newTitle,
      caseNumber: newCaseNumber,
      category: newCategory,
      clientName: newClient || "Klien Korporasi Rahasia",
      opponentName: newOpponent || "Pihak Tergugat",
      claimAmountIDR: Number(newClaim),
      status: "ACTIVE_TRIAL",
      filingDate: new Date().toISOString().split("T")[0],
      primaryCourt: newCourt,
      leadPartner: newPartner,
    });

    setIsModalOpen(false);
    setNewTitle("");
    setNewCaseNumber("");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Legal KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-[#0b122c] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Litigation Portfolio</div>
          <div className="text-2xl font-black text-amber-400 flex items-center justify-between">
            <span>{cases.length} Perkara</span>
            <Briefcase className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Aktif di Pengadilan &amp; BANI</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0b122c] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total Nilai Gugatan</div>
          <div className="text-2xl font-black text-white flex items-center justify-between">
            <span>Rp {(totalLitigationValueIDR / 1000000000).toFixed(0)} Miliar</span>
            <Scale className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-bold">Total Claim Exposure</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0b122c] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Jadwal Sidang Minggu Ini</div>
          <div className="text-2xl font-black text-cyan-400 flex items-center justify-between">
            <span>{allHearings.length} Sidang</span>
            <Gavel className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">PN, Pengadilan Niaga &amp; BANI</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0b122c] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Historical Win Rate</div>
          <div className="text-2xl font-black text-emerald-400 flex items-center justify-between">
            <span>89.4%</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Court Judgments &amp; Settlements</div>
        </div>
      </div>

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>Court Hearing Docket &amp; Litigation Command</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
              PANITERA DIGITAL
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitoring kalender persidangan, tahapan perkara (Mediasi, Replik, Bukti, Putusan), dan alokasi majelis hakim peradilan.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Daftarkan Perkara Baru</span>
        </button>
      </div>

      {/* Main Court Hearing Timeline */}
      <CourtHearingTimeline hearings={allHearings} />

      {/* Create Case Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0e1635] border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white">Registrasi Perkara Litigasi Baru</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Judul / Pokok Perkara</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Gugatan Wanprestasi Kontrak EPC Energi"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Nomor Perkara Pengadilan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 188/Pdt.G/2026/PN.Jkt.Sel"
                    value={newCaseNumber}
                    onChange={(e) => setNewCaseNumber(e.target.value)}
                    className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Kategori Perkara</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
                  >
                    <option value="Commercial Litigation">Commercial Litigation</option>
                    <option value="Arbitration (BANI)">Arbitration (BANI)</option>
                    <option value="Corporate M&A Dispute">Corporate M&amp;A Dispute</option>
                    <option value="Intellectual Property (HAKI)">Intellectual Property (HAKI)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Nama Klien (Penggugat/Tergugat)</label>
                  <input
                    type="text"
                    required
                    placeholder="PT Industri Solusi Utama"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Pihak Lawan</label>
                  <input
                    type="text"
                    required
                    placeholder="PT Mitra Konstruksi Asia"
                    value={newOpponent}
                    onChange={(e) => setNewOpponent(e.target.value)}
                    className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Nilai Petitum Ganti Rugi (IDR)</label>
                <input
                  type="number"
                  step={1000000000}
                  required
                  value={newClaim}
                  onChange={(e) => setNewClaim(Number(e.target.value))}
                  className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Forum Pengadilan / Arbitrase</label>
                <input
                  type="text"
                  value={newCourt}
                  onChange={(e) => setNewCourt(e.target.value)}
                  className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20"
                >
                  Registrasi Perkara
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
