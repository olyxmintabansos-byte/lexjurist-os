"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  LegalCase,
  CourtHearing,
  BillableHourEntry,
  ClientRetainerAccount,
  EvidenceItem,
  LegalPleadingDoc,
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

const INITIAL_EVIDENCES: EvidenceItem[] = [
  {
    id: "ev-01",
    caseId: "case-01",
    codeNumber: "Bukti P-1",
    title: "Akta Perjanjian Pasokan Baja No. 44 Notaris Siti Rahayu, S.H.",
    evidenceType: "Akta Otentik (Notariil)",
    sourceOriginality: "Asli Diperlihatkan",
    isNazegelenPaid: true,
    admissibilityStatus: "DITERIMA_HAKIM",
    description: "Perjanjian konsorsium komersial pengadaan 5.000 ton baja coil bertanggal 15 Mei 2025.",
    custodianAdvocate: "Prof. Dr. Faisal Hartono, S.H.",
  },
  {
    id: "ev-02",
    caseId: "case-01",
    codeNumber: "Bukti P-2",
    title: "Surat Somasi & Peringatan Kelalaian Wanprestasi No. 102/LEX/VI/2026",
    evidenceType: "Akta Bawah Tangan",
    sourceOriginality: "Fotokopi Sesuai Asli (Legalisir)",
    isNazegelenPaid: true,
    admissibilityStatus: "DITERIMA_HAKIM",
    description: "Tanda terima kurir resmi pengiriman somasi pemenuhan kewajiban pengiriman tahap kedua.",
    custodianAdvocate: "Bagus Wicaksono, S.H.",
  },
  {
    id: "ev-03",
    caseId: "case-01",
    codeNumber: "Bukti P-3",
    title: "Rekam Jejak Transaksi Bank & SWIFT MT103 Pembayaran Uang Muka",
    evidenceType: "Bukti Elektronik (Email/Chat)",
    sourceOriginality: "Salinan Elektronik",
    isNazegelenPaid: true,
    admissibilityStatus: "DITERIMA_HAKIM",
    description: "Konfirmasi transfer dana setelmen senilai Rp 15.000.000.000 ke rekening escrow tergugat.",
    custodianAdvocate: "Prof. Dr. Faisal Hartono, S.H.",
  },
];

const INITIAL_PLEADINGS: LegalPleadingDoc[] = [
  {
    id: "plead-01",
    caseId: "case-01",
    documentType: "Gugatan Wanprestasi",
    caseNumber: "142/Pdt.G/2026/PN.Jkt.Pst",
    courtDestination: "Pengadilan Negeri Jakarta Pusat Klas 1A Khusus",
    plaintiffName: "PT Nusantara Mega Steel Tbk",
    plaintiffAdvocates: [
      "Prof. Dr. Faisal Hartono, S.H., LL.M.",
      "Bagus Wicaksono, S.H.",
      "Nathalia Siregar, S.H., M.H.",
    ],
    defendantName: "Global Industrial Logistics Pte Ltd",
    positaClauses: [
      "Bahwa antara Penggugat dan Tergugat telah terikat secara sah dalam Akta Perjanjian Pasokan Baja No. 44 bertanggal 15 Mei 2025 yang dibuat di hadapan Notaris Siti Rahayu, S.H., M.Kn.",
      "Bahwa Penggugat telah melaksanakan seluruh kewajiban hukumnya dengan membayar lunas uang muka sebesar 30% senilai Rp 13.500.000.000 (tiga belas miliar lima ratus juta rupiah).",
      "Bahwa hingga batas waktu akhir tanggal 31 Januari 2026, Tergugat sama sekali tidak menyerahkan komoditas baja yang diperjanjikan tanpa adanya alasan keadaan memaksa (force majeure).",
      "Bahwa Penggugat telah melayangkan 3 (tiga) kali surat peringatan/somasi namun tidak pernah diindahkan oleh Tergugat.",
    ],
    petitumClauses: [
      "Mengabulkan gugatan Penggugat untuk seluruhnya;",
      "Menyatakan Tergugat telah melakukan perbuatan ingkar janji (wanprestasi);",
      "Menghukum Tergugat untuk membayar ganti kerugian materiel dan imateriel sebesar Rp 45.000.000.000 (empat puluh lima miliar rupiah) secara tunai dan seketika;",
      "Menyatakan sah dan berharga Sita Jaminan (Conservatoir Beslag) terhadap aset tanah dan bangunan milik Tergugat di Kawasan Industri MM2100 Cikarang;",
      "Menghukum Tergugat untuk membayar uang paksa (dwangsom) sebesar Rp 25.000.000 per hari atas setiap hari kelalaian melaksanakan putusan;",
      "Menyatakan putusan ini dapat dijalankan terlebih dahulu (uitvoerbaar bij voorraad) meskipun ada bantahan, banding, atau kasasi.",
    ],
    dwangsomAmountIDR: 25000000,
    conservatoirBeslagAsset: "Sertifikat Hak Guna Bangunan (SHGB) No. 892/Cikarang Barat seluas 12.000 m²",
    submissionDate: "2026-02-10",
    status: "FILED_OFFICIAL",
  },
];

interface LegalContextType {
  cases: LegalCase[];
  billables: BillableHourEntry[];
  retainers: ClientRetainerAccount[];
  evidences: EvidenceItem[];
  pleadings: LegalPleadingDoc[];
  allHearings: CourtHearing[];
  createCase: (c: Omit<LegalCase, "id" | "hearings">) => void;
  addHearing: (caseId: string, h: Omit<CourtHearing, "id" | "caseId">) => void;
  recordBillableHours: (b: Omit<BillableHourEntry, "id" | "totalBilledIDR" | "isBilled">) => void;
  addEvidence: (e: Omit<EvidenceItem, "id">) => void;
}

const LegalContext = createContext<LegalContextType | undefined>(undefined);

export function LegalProvider({ children }: { children: React.ReactNode }) {
  const [cases, setCases] = useState<LegalCase[]>(INITIAL_CASES);
  const [billables, setBillables] = useState<BillableHourEntry[]>(INITIAL_BILLABLES);
  const [retainers] = useState<ClientRetainerAccount[]>(INITIAL_RETAINERS);
  const [evidences, setEvidences] = useState<EvidenceItem[]>(INITIAL_EVIDENCES);
  const [pleadings] = useState<LegalPleadingDoc[]>(INITIAL_PLEADINGS);

  useEffect(() => {
    const savedCases = localStorage.getItem("LEXJURIST_CASES");
    if (savedCases) {
      try {
        setCases(JSON.parse(savedCases));
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

  const addEvidence = (e: Omit<EvidenceItem, "id">) => {
    const newEv: EvidenceItem = {
      ...e,
      id: `ev-${Date.now()}`,
    };
    setEvidences((prev) => [...prev, newEv]);
  };

  return (
    <LegalContext.Provider
      value={{
        cases,
        billables,
        retainers,
        evidences,
        pleadings,
        allHearings,
        createCase,
        addHearing,
        recordBillableHours,
        addEvidence,
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
