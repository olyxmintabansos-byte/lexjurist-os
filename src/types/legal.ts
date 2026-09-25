export type CaseCategory =
  | "Commercial Litigation"
  | "Arbitration (BANI)"
  | "Corporate M&A Dispute"
  | "Intellectual Property (HAKI)"
  | "White-Collar Defense";

export type HearingStage =
  | "Mediasi"
  | "Pembacaan Gugatan"
  | "Eksepsi & Jawaban"
  | "Replik & Duplik"
  | "Pembuktian Saksi/Ahli"
  | "Kesimpulan"
  | "Pembacaan Putusan";

export interface CourtHearing {
  id: string;
  caseId: string;
  caseTitle: string;
  caseNumber: string;
  courtName: string;
  roomName: string;
  stage: HearingStage;
  scheduledDateIso: string;
  judgePanelLead: string;
  leadAdvocate: string;
  agendaSummary: string;
  isUrgent: boolean;
}

export interface LegalCase {
  id: string;
  caseNumber: string;
  title: string;
  category: CaseCategory;
  clientName: string;
  opponentName: string;
  claimAmountIDR: number;
  status: "ACTIVE_TRIAL" | "IN_MEDIATION" | "SETTLED" | "WON" | "APPEALED";
  filingDate: string;
  primaryCourt: string;
  leadPartner: string;
  hearings: CourtHearing[];
}

export interface BillableHourEntry {
  id: string;
  caseId: string;
  advocateName: string;
  tier: "Senior Managing Partner" | "Partner" | "Senior Associate" | "Junior Associate";
  hourlyRateIDR: number;
  hoursWorked: number;
  taskDescription: string;
  dateWorked: string;
  totalBilledIDR: number;
  isBilled: boolean;
}

export interface ClientRetainerAccount {
  id: string;
  clientId: string;
  clientName: string;
  totalRetainerDepositedIDR: number;
  utilizedRetainerIDR: number;
  remainingRetainerBalanceIDR: number;
  replenishmentAlertThresholdIDR: number;
  status: "ADEQUATE" | "NEEDS_REPLENISHMENT" | "EXHAUSTED";
}

export interface EvidenceItem {
  id: string;
  caseId: string;
  codeNumber: string;
  title: string;
  evidenceType: "Akta Otentik (Notariil)" | "Akta Bawah Tangan" | "Bukti Elektronik (Email/Chat)" | "Keterangan Ahli";
  sourceOriginality: "Asli Diperlihatkan" | "Fotokopi Sesuai Asli (Legalisir)" | "Salinan Elektronik";
  isNazegelenPaid: boolean;
  admissibilityStatus: "DITERIMA_HAKIM" | "DALAM_PENELITIAN" | "DITOLAK_EKSEPSI";
  description: string;
  custodianAdvocate: string;
}

export interface LegalPleadingDoc {
  id: string;
  caseId: string;
  documentType: "Gugatan Wanprestasi" | "Memori Replik" | "Jawaban & Eksepsi" | "Kesimpulan Akhir";
  caseNumber: string;
  courtDestination: string;
  plaintiffName: string;
  plaintiffAdvocates: string[];
  defendantName: string;
  positaClauses: string[];
  petitumClauses: string[];
  dwangsomAmountIDR: number;
  conservatoirBeslagAsset: string;
  submissionDate: string;
  status: "FILED_OFFICIAL" | "DRAFT_REVIEW";
}
