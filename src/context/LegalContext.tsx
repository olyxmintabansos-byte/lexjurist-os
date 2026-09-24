"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  LegalCase,
  CourtHearing,
  BillableHourEntry,
  ClientRetainerAccount,
} from "@/types/legal";

const INITIAL_CASES: LegalCase[] = [
  {
    id: "case-01",
    caseNumber: "142/Pdt.G/2026/PN.Jkt.Pst",
    title: "Sengketa Wanprestasi Perjanjian Pasokan Konsorsium B2B",
    category: "Commercial Litigation",
    clientName: "PT Nusantara Mega Steel Tbk",
    opponentName: "Global Industrial Logistics Pte Ltd",
    claimAmountIDR: 45000000000,
    status: "ACTIVE_TRIAL",
    filingDate: "2026-02-10",
    primaryCourt: "Pengadilan Negeri Jakarta Pusat",
    leadPartner: "Prof. Dr. Faisal Hartono, S.H., LL.M.",
    hearings: [
      {
        id: "hear-1",
        caseId: "case-01",
        caseTitle: "Sengketa Wanprestasi Perjanjian Pasokan Konsorsium B2B",
        caseNumber: "142/Pdt.G/2026/PN.Jkt.Pst",
        courtName: "PN Jakarta Pusat",
        roomName: "Ruang Wirjono Prodjodikoro",
        stage: "Pembuktian Saksi/Ahli",
        scheduledDateIso: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
        judgePanelLead: "Wahyu Santoso, S.H., M.Hum.",
        leadAdvocate: "Prof. Dr. Faisal Hartono, S.H.",
        agendaSummary: "Pemeriksaan saksi ahli hukum kontrak internasional dan pembuktian dokumen Bill of Lading.",
        isUrgent: true,
      },
    ],
  },
  {
    id: "case-02",
    caseNumber: "ARB/BANI/2026/048",
    title: "Arbitrase Sengketa Konstruksi Pembangkit PLTS Terapung Cirata",
    category: "Arbitration (BANI)",
    clientName: "PT Rekayasa Energi Hijau",
    opponentName: "Vanguard Solar Engineering Corp",
    claimAmountIDR: 120000000000,
    status: "IN_MEDIATION",
    filingDate: "2026-03-01",
    primaryCourt: "Badan Arbitrase Nasional Indonesia (BANI Mampang)",
    leadPartner: "Kartika Rahardjo, S.H., M.H.",
    hearings: [
      {
        id: "hear-2",
        caseId: "case-02",
        caseTitle: "Arbitrase Sengketa Konstruksi Pembangkit PLTS Cirata",
        caseNumber: "ARB/BANI/2026/048",
        courtName: "BANI Arbitration Center Jakarta",
        roomName: "Tribunal Chamber Alpha",
        stage: "Mediasi",
        scheduledDateIso: new Date(Date.now() + 120 * 3600 * 1000).toISOString(),
        judgePanelLead: "Arbitrator Majelis BANI Tiga Pihak",
        leadAdvocate: "Kartika Rahardjo, S.H.",
        agendaSummary: "Sidang mediasi tertutup mengenai klausa penalti keterlambatan Commercial Operation Date (COD).",
        isUrgent: false,
      },
    ],
  },
  {
    id: "case-03",
    caseNumber: "29/Pdt.Sus-HKI/2026/PN.Niaga.Jkt.Pst",
    title: "Gugatan Pembatalan Merek Dagang AI Chip Microcontroller",
    category: "Intellectual Property (HAKI)",
    clientName: "Silicon Asia Technologies Ltd",
    opponentName: "CV Micro Nusantara Jaya",
    claimAmountIDR: 15000000000,
    status: "ACTIVE_TRIAL",
    filingDate: "2026-04-12",
    primaryCourt: "Pengadilan Niaga Jakarta Pusat",
    leadPartner: "Darmawan Kusuma, S.H., LL.M.",
    hearings: [
      {
        id: "hear-3",
        caseId: "case-03",
        caseTitle: "Gugatan Pembatalan Merek Dagang AI Chip Microcontroller",
        caseNumber: "29/Pdt.Sus-HKI/2026/PN.Niaga.Jkt.Pst",
        courtName: "Pengadilan Niaga Jakarta Pusat",
        roomName: "Ruang Prof. R. Subekti",
        stage: "Eksepsi & Jawaban",
        scheduledDateIso: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
        judgePanelLead: "Bambang Trianto, S.H., M.H.",
        leadAdvocate: "Darmawan Kusuma, S.H.",
        agendaSummary: "Penyerahan jawaban tergugat atas gugatan iktikad tidak baik dalam pendaftaran kelas barang 09.",
        isUrgent: false,
      },
    ],
  },
];

const INITIAL_BILLABLES: BillableHourEntry[] = [
  {
    id: "bil-1",
    caseId: "case-01",
    advocateName: "Prof. Dr. Faisal Hartono, S.H.",
    tier: "Senior Managing Partner",
    hourlyRateIDR: 4500000,
    hoursWorked: 8.5,
    taskDescription: "Penyusunan Memori Replik dan telaah dokumen perbandingan hukum UNCITRAL.",
    dateWorked: "2026-09-22",
    totalBilledIDR: 38250000,
    isBilled: true,
  },
  {
    id: "bil-2",
    caseId: "case-01",
    advocateName: "Bagus Wicaksono, S.H.",
    tier: "Senior Associate",
    hourlyRateIDR: 2200000,
    hoursWorked: 14.0,
    taskDescription: "Pemeriksaan silang berkas bukti surat P-1 s/d P-45 dan wawancara saksi fakta.",
    dateWorked: "2026-09-23",
    totalBilledIDR: 30800000,
    isBilled: true,
  },
];

const INITIAL_RETAINERS: ClientRetainerAccount[] = [
  {
    id: "ret-1",
    clientId: "cl-01",
    clientName: "PT Nusantara Mega Steel Tbk",
    totalRetainerDepositedIDR: 250000000,
    utilizedRetainerIDR: 168000000,
    remainingRetainerBalanceIDR: 82000000,
    replenishmentAlertThresholdIDR: 50000000,
    status: "ADEQUATE",
  },
  {
    id: "ret-2",
    clientId: "cl-02",
    clientName: "PT Rekayasa Energi Hijau",
    totalRetainerDepositedIDR: 500000000,
    utilizedRetainerIDR: 420000000,
    remainingRetainerBalanceIDR: 80000000,
    replenishmentAlertThresholdIDR: 100000000,
    status: "NEEDS_REPLENISHMENT",
  },
];

interface LegalContextType {
  cases: LegalCase[];
  billables: BillableHourEntry[];
  retainers: ClientRetainerAccount[];
  allHearings: CourtHearing[];
  createCase: (c: Omit<LegalCase, "id" | "hearings">) => void;
  addHearing: (caseId: string, h: Omit<CourtHearing, "id" | "caseId">) => void;
  recordBillableHours: (b: Omit<BillableHourEntry, "id" | "totalBilledIDR" | "isBilled">) => void;
}

const LegalContext = createContext<LegalContextType | undefined>(undefined);

export function LegalProvider({ children }: { children: React.ReactNode }) {
  const [cases, setCases] = useState<LegalCase[]>(INITIAL_CASES);
  const [billables, setBillables] = useState<BillableHourEntry[]>(INITIAL_BILLABLES);
  const [retainers] = useState<ClientRetainerAccount[]>(INITIAL_RETAINERS);

  // LocalStorage Sync
  useEffect(() => {
    const saved = localStorage.getItem("LEXJURIST_CASES");
    if (saved) {
      try {
        setCases(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("LEXJURIST_CASES", JSON.stringify(cases));
  }, [cases]);

  const allHearings = cases.flatMap((c) => c.hearings);

  const createCase = (caseData: Omit<LegalCase, "id" | "hearings">) => {
    const newCase: LegalCase = {
      ...caseData,
      id: `case-${Date.now()}`,
      hearings: [],
    };
    setCases((prev) => [newCase, ...prev]);
  };

  const addHearing = (caseId: string, hearingData: Omit<CourtHearing, "id" | "caseId">) => {
    const newHearing: CourtHearing = {
      ...hearingData,
      id: `hear-${Date.now()}`,
      caseId,
    };

    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, hearings: [...c.hearings, newHearing] } : c))
    );
  };

  const recordBillableHours = (b: Omit<BillableHourEntry, "id" | "totalBilledIDR" | "isBilled">) => {
    const total = b.hourlyRateIDR * b.hoursWorked;
    const newEntry: BillableHourEntry = {
      ...b,
      id: `bil-${Date.now()}`,
      totalBilledIDR: total,
      isBilled: false,
    };
    setBillables((prev) => [newEntry, ...prev]);
  };

  return (
    <LegalContext.Provider
      value={{
        cases,
        billables,
        retainers,
        allHearings,
        createCase,
        addHearing,
        recordBillableHours,
      }}
    >
      {children}
    </LegalContext.Provider>
  );
}

export function useLegal() {
  const ctx = useContext(LegalContext);
  if (!ctx) throw new Error("useLegal must be used within a LegalProvider");
  return ctx;
}
