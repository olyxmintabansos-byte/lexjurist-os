"use client";

import React, { useState } from "react";
import { useLegal } from "@/context/LegalContext";
import { EvidenceItem } from "@/types/legal";
import {
  FolderArchive,
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
  Plus,
  Sparkles,
  Lock,
  Search,
} from "lucide-react";

export default function EvidenceVaultPage() {
  const { evidences, cases, addEvidence } = useLegal();
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Evidence Form State
  const [newCode, setNewCode] = useState(`Bukti P-${evidences.length + 1}`);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<EvidenceItem["evidenceType"]>("Akta Otentik (Notariil)");
  const [newSource, setNewSource] = useState<EvidenceItem["sourceOriginality"]>("Asli Diperlihatkan");
  const [newDesc, setNewDesc] = useState("");
  const [newCustodian, setNewCustodian] = useState("Prof. Dr. Faisal Hartono, S.H.");

  const filteredEvidences = evidences.filter((ev) => {
    if (!selectedCaseId) return true;
    return ev.caseId === selectedCaseId;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    addEvidence({
      caseId: selectedCaseId,
      codeNumber: newCode,
      title: newTitle,
      evidenceType: newType,
      sourceOriginality: newSource,
      isNazegelenPaid: true,
      admissibilityStatus: "DITERIMA_HAKIM",
      description: newDesc || "Alat bukti sah berdasarkan Pasal 1866 KUHPerdata.",
      custodianAdvocate: newCustodian,
    });

    setIsModalOpen(false);
    setNewTitle("");
    setNewDesc("");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-[#0b122c] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total Registered Evidence</div>
          <div className="text-2xl font-black text-amber-400 flex items-center justify-between">
            <span>{evidences.length} Alat Bukti</span>
            <FolderArchive className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Chain-of-Custody Verified</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0b122c] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Akta Otentik Notaris</div>
          <div className="text-2xl font-black text-emerald-400 flex items-center justify-between">
            <span>
              {evidences.filter((e) => e.evidenceType === "Akta Otentik (Notariil)").length} Dokumen
            </span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-bold">Kekuatan Pembuktian Sempurna</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0b122c] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Status Nazegelen (Materai)</div>
          <div className="text-2xl font-black text-cyan-400 flex items-center justify-between">
            <span>100% Lunas</span>
            <FileCheck2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Legalisasi Kantor Pos Sesuai UU</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0b122c] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Vault Storage Security</div>
          <div className="text-2xl font-black text-purple-400 flex items-center justify-between">
            <span>Fireproof Safe</span>
            <Lock className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Law Firm Escrow Custody</div>
        </div>
      </div>

      {/* Action Header & Case Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>Legal Evidence Vault &amp; Chain of Custody</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
              PASAL 1866 KUHPERDATA
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Buku register alat bukti perkara: Akta Otentik, Akta Bawah Tangan, Bukti Elektronik, dan legalisasi segel pos (nazegelen).
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="bg-[#080d22] border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl outline-none"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.caseNumber}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Tambah Alat Bukti</span>
          </button>
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="space-y-4">
        {filteredEvidences.map((ev) => (
          <div
            key={ev.id}
            className="p-6 rounded-2xl bg-[#0b122c] border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded font-mono font-black text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {ev.codeNumber}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {ev.evidenceType}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {ev.sourceOriginality}
                </span>
                {ev.isNazegelenPaid && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    Nazegelen Lunas
                  </span>
                )}
              </div>

              <h3 className="text-base font-black text-white">{ev.title}</h3>
              <p className="text-xs text-slate-400">{ev.description}</p>
            </div>

            <div className="text-left md:text-right pt-3 md:pt-0 border-t md:border-t-0 border-slate-800/80 text-xs">
              <div className="text-[10px] text-slate-400 uppercase">Advokat Penyimpan:</div>
              <div className="text-white font-bold">{ev.custodianAdvocate}</div>
              <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" />
                <span>Status: {ev.admissibilityStatus.replace("_", " ")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Evidence Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0e1635] border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white">Registrasi Alat Bukti Perkara</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Kode Alat Bukti</label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Klasifikasi Bukti</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
                  >
                    <option value="Akta Otentik (Notariil)">Akta Otentik (Notariil)</option>
                    <option value="Akta Bawah Tangan">Akta Bawah Tangan</option>
                    <option value="Bukti Elektronik (Email/Chat)">Bukti Elektronik (Email/Chat)</option>
                    <option value="Keterangan Ahli">Keterangan Ahli</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Judul / Nama Dokumen Bukti</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Akta Perjanjian Kredit Sindikasi No. 12"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Keaslian / Bentuk Fisik</label>
                <select
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value as any)}
                  className="w-full bg-[#080d22] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
                >
                  <option value="Asli Diperlihatkan">Asli Diperlihatkan di Depan Majelis</option>
                  <option value="Fotokopi Sesuai Asli (Legalisir)">Fotokopi Sesuai Asli (Legalisir)</option>
                  <option value="Salinan Elektronik">Salinan Elektronik</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Uraian / Relevansi Pembuktian</label>
                <textarea
                  rows={3}
                  placeholder="Membuktikan adanya penyerahan uang muka tahap 1..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
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
                  Simpan Bukti ke Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
