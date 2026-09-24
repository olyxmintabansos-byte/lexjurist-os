"use client";

import React, { useState } from "react";
import { useLegal } from "@/context/LegalContext";
import { formatIDR, formatNumber } from "@/lib/utils";
import {
  CreditCard,
  Clock,
  UserCheck,
  AlertTriangle,
  Plus,
  CheckCircle2,
  DollarSign,
  Briefcase,
} from "lucide-react";

export default function LegalBillingPage() {
  const { billables, retainers, cases, recordBillableHours } = useLegal();

  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id || "");
  const [advocateName, setAdvocateName] = useState("Prof. Dr. Faisal Hartono, S.H.");
  const [advocateTier, setAdvocateTier] = useState<any>("Senior Managing Partner");
  const [hours, setHours] = useState<number>(4.0);
  const [taskDesc, setTaskDesc] = useState("");
  const [recordSuccess, setRecordSuccess] = useState(false);

  const getTierRate = (tier: string) => {
    switch (tier) {
      case "Senior Managing Partner":
        return 4500000;
      case "Partner":
        return 3200000;
      case "Senior Associate":
        return 2200000;
      default:
        return 1400000;
    }
  };

  const handleRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskDesc) return;

    recordBillableHours({
      caseId: selectedCaseId,
      advocateName,
      tier: advocateTier,
      hourlyRateIDR: getTierRate(advocateTier),
      hoursWorked: Number(hours),
      taskDescription: taskDesc,
      dateWorked: new Date().toISOString().split("T")[0],
    });

    setRecordSuccess(true);
    setTaskDesc("");
    setTimeout(() => setRecordSuccess(false), 4000);
  };

  const totalBilledAllIDR = billables.reduce((acc, b) => acc + b.totalBilledIDR, 0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>Advocate Billable Hours &amp; Retainer Trust Ledger</span>
          <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
            FEE MATRIX &amp; ESCROW
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Pencatatan jam kerja advokat (billable time tracking), tarif per jam berjenjang, dan pemantauan saldo uang muka perkara (retainer trust fund).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Retainer Trust Account Cards */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Status Rekening Retainer Klien
          </h2>
          {retainers.map((r) => {
            const utilizationPct = (r.utilizedRetainerIDR / r.totalRetainerDepositedIDR) * 100;
            return (
              <div key={r.id} className="p-5 rounded-2xl bg-[#0b122c] border border-slate-800 text-xs">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-black text-white text-sm">{r.clientName}</h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      r.status === "ADEQUATE"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                    }`}
                  >
                    {r.status.replace("_", " ")}
                  </span>
                </div>

                <div className="space-y-1.5 py-3 border-y border-slate-800/80 text-slate-400">
                  <div className="flex justify-between">
                    <span>Total Deposit Retainer:</span>
                    <span className="text-white font-mono">{formatIDR(r.totalRetainerDepositedIDR)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Terpakai:</span>
                    <span className="text-amber-400 font-mono">{formatIDR(r.utilizedRetainerIDR)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-1">
                    <span>Sisa Saldo Kas Escrow:</span>
                    <span className="text-emerald-400 font-mono">
                      {formatIDR(r.remainingRetainerBalanceIDR)}
                    </span>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        utilizationPct > 80 ? "bg-rose-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${utilizationPct}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 text-right mt-1">
                    {utilizationPct.toFixed(1)}% Terutilisasi
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Record Time Tracker Form */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-2xl bg-[#0b122c] border border-slate-800 shadow-xl">
            <h2 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Input Lembar Kerja Waktu Advokat (Time-Sheet Entry)</span>
            </h2>

            {recordSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Jam kerja advokat berhasil dicatat ke buku besar tagihan perkara!</span>
              </div>
            )}

            <form onSubmit={handleRecordSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Pilih Perkara</label>
                  <select
                    value={selectedCaseId}
                    onChange={(e) => setSelectedCaseId(e.target.value)}
                    className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
                  >
                    {cases.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.caseNumber} - {c.title.slice(0, 35)}...
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Nama Advokat</label>
                  <input
                    type="text"
                    required
                    value={advocateName}
                    onChange={(e) => setAdvocateName(e.target.value)}
                    className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Jenjang Advokat (Tier)</label>
                  <select
                    value={advocateTier}
                    onChange={(e) => setAdvocateTier(e.target.value as any)}
                    className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
                  >
                    <option value="Senior Managing Partner">Senior Managing Partner (Rp 4.500.000/jam)</option>
                    <option value="Partner">Partner (Rp 3.200.000/jam)</option>
                    <option value="Senior Associate">Senior Associate (Rp 2.200.000/jam)</option>
                    <option value="Junior Associate">Junior Associate (Rp 1.400.000/jam)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Durasi Jam Kerja (Hours)</label>
                  <input
                    type="number"
                    step={0.5}
                    min={0.5}
                    required
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Uraian Pekerjaan Hukum</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Telaah yuridis fakta persidangan, drafting eksepsi kompetensi absolut..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-slate-400 font-mono">
                  Estimasi Honorarium:{" "}
                  <strong className="text-amber-400">{formatIDR(getTierRate(advocateTier) * hours)}</strong>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                >
                  Catat Jam Kerja Advokat
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Billable Time Entries History */}
      <div className="rounded-2xl border border-slate-800 bg-[#0b122c] overflow-hidden shadow-xl text-xs">
        <div className="px-6 py-4 border-b border-slate-800 bg-[#070e24] flex items-center justify-between">
          <h3 className="font-bold text-white uppercase tracking-wider">
            Buku Besar Tagihan Jam Kerja Advokat ({billables.length} Entri)
          </h3>
          <div className="font-mono text-emerald-400 font-bold">
            Total Tagihan: {formatIDR(totalBilledAllIDR)}
          </div>
        </div>

        <div className="divide-y divide-slate-800/80">
          {billables.map((b) => (
            <div
              key={b.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/30 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white text-sm">{b.advocateName}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700 text-slate-300">
                    {b.tier}
                  </span>
                  <span className="text-[10px] text-slate-500">{b.dateWorked}</span>
                </div>
                <p className="text-slate-300 text-xs mt-1">{b.taskDescription}</p>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-amber-400 text-sm">
                  {formatIDR(b.totalBilledIDR)}
                </div>
                <div className="text-[10px] text-slate-400">
                  {b.hoursWorked} Jam @ {formatIDR(b.hourlyRateIDR)}/jam
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
