"use client";

import React, { useState } from "react";
import { useLegal } from "@/context/LegalContext";
import { LegalPleadingDoc } from "@/types/legal";
import { formatIDR } from "@/lib/utils";
import {
  FileText,
  Printer,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building,
} from "lucide-react";

export default function PleadingGeneratorPage() {
  const { pleadings } = useLegal();
  const [selectedDoc, setSelectedDoc] = useState<LegalPleadingDoc>(pleadings[0]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 print:hidden">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>Official Court Legal Pleading Generator</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
              STANDAR MAHKAMAH AGUNG A4
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Format surat gugatan perdata resmi berstandar peradilan Indonesia: Posita (fundamentum petendi), Petitum, sita jaminan, dan dwangsom.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Surat Gugatan A4 Resmi</span>
        </button>
      </div>

      {/* Pixel-Perfect A4 Sheet Document */}
      <div className="flex justify-center">
        <div className="w-full max-w-[850px] bg-white text-slate-900 rounded-3xl p-8 sm:p-14 shadow-2xl border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 font-serif text-xs leading-relaxed">
          {/* Header Kop Kantor Hukum */}
          <div className="text-center border-b-2 border-slate-950 pb-6 mb-8 font-sans">
            <div className="text-base font-black tracking-wider text-slate-950 uppercase">
              HARTONO, RAHARDJO & PARTNERS
            </div>
            <div className="text-[11px] font-bold text-slate-600 tracking-wide uppercase">
              ADVOCATES & LEGAL CONSULTANTS • JAKARTA
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              SCBD Treasury Tower Fl. 38, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190
            </div>
            <div className="text-[10px] text-slate-500">
              Tel: +62 21 5790 8822 • Email: litigation@hartonolaw.co.id
            </div>
          </div>

          {/* Tanggal & Tujuan Pengadilan */}
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <div>Nomor : 042/HRP-LIT/GUG/II/2026</div>
              <div>Lampiran : Surat Kuasa Khusus & Salinan Gugatan</div>
              <div>Perihal : <strong>GUGATAN WANPRESTASI GANTI RUGI</strong></div>
            </div>
            <div className="text-right">
              <div>Jakarta, {selectedDoc.submissionDate}</div>
            </div>
          </div>

          <div className="mb-6">
            <div>Kepada Yang Terhormat:</div>
            <div className="font-bold">Ketua Pengadilan Negeri Jakarta Pusat</div>
            <div>Melalui Majelis Hakim Pemeriksa Perkara No. {selectedDoc.caseNumber}</div>
            <div>Jl. Bungur Besar Raya No. 24, Kemayoran, Jakarta Pusat</div>
          </div>

          {/* Kuasa Hukum & Pihak */}
          <div className="space-y-4 mb-6 text-justify">
            <p>
              Dengan hormat,<br />
              Yang bertanda tangan di bawah ini:
            </p>

            <div className="pl-6 space-y-1 border-l-2 border-slate-300">
              {selectedDoc.plaintiffAdvocates.map((adv, idx) => (
                <div key={idx} className="font-bold text-slate-900">
                  {idx + 1}. {adv}
                </div>
              ))}
              <p className="text-slate-700 text-[11px] pt-1">
                Kesemuanya adalah Advokat dan Penasihat Hukum pada Kantor Hukum <strong>HARTONO, RAHARDJO & PARTNERS</strong>, beralamat di SCBD Treasury Tower Fl. 38 Jakarta Selatan, bertindak berdasarkan Surat Kuasa Khusus bertanggal 2 Februari 2026, untuk dan atas nama kepentingan hukum:
              </p>
            </div>

            <p>
              <strong>{selectedDoc.plaintiffName}</strong>, suatu perseroan terbatas yang didirikan menurut hukum Republik Indonesia, berkedudukan di Jakarta, selanjutnya disebut sebagai <strong>PENGGUGAT</strong>;
            </p>

            <p className="text-center font-bold tracking-widest my-2">-- MELAWAN --</p>

            <p>
              <strong>{selectedDoc.defendantName}</strong>, berkedudukan hukum di Singapura dan memiliki perwakilan usaha di Indonesia, selanjutnya disebut sebagai <strong>TERGUGAT</strong>;
            </p>
          </div>

          {/* Posita (Fundamentum Petendi) */}
          <div className="mb-6">
            <div className="font-black text-slate-950 uppercase tracking-wider mb-2 font-sans text-sm border-b border-slate-300 pb-1">
              I. TENTANG DUDUKNYA PERKARA (POSITA)
            </div>
            <div className="space-y-3 pl-2 text-justify">
              {selectedDoc.positaClauses.map((clause, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="font-bold">{idx + 1}.</span>
                  <span>{clause}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sita Jaminan & Dwangsom */}
          <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl mb-6 space-y-2">
            <div className="font-bold text-slate-900">TENTANG SITA JAMINAN (CONSERVATOIR BESLAG) & UANG PAKSA:</div>
            <p className="text-slate-700 text-[11px]">
              Guna menjamin agar gugatan ini tidak sia-sia (illusoir), Penggugat mohon kepada Majelis Hakim agar meletakkan Sita Jaminan atas: <strong>{selectedDoc.conservatoirBeslagAsset}</strong>, serta menghukum Tergugat membayar uang paksa (dwangsom) sebesar <strong>{formatIDR(selectedDoc.dwangsomAmountIDR)}/hari</strong>.
            </p>
          </div>

          {/* Petitum */}
          <div className="mb-8">
            <div className="font-black text-slate-950 uppercase tracking-wider mb-2 font-sans text-sm border-b border-slate-300 pb-1">
              II. TUNTUTAN HUKUM (PETITUM)
            </div>
            <div className="space-y-2 pl-2 text-justify">
              <p>
                Berdasarkan segala alasan dan dalil yang diuraikan di atas, Penggugat memohon kepada Yang Mulia Majelis Hakim Pengadilan Negeri Jakarta Pusat agar berkenan memutuskan:
              </p>
              {selectedDoc.petitumClauses.map((pet, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="font-bold">{idx + 1}.</span>
                  <span>{pet}</span>
                </div>
              ))}
              <p className="pt-2 italic">
                Atau apabila Majelis Hakim berpendapat lain, mohon putusan yang seadil-adilnya (ex aequo et bono).
              </p>
            </div>
          </div>

          {/* Tanda Tangan */}
          <div className="pt-6 border-t-2 border-slate-950">
            <div className="text-right">
              <div className="mb-14">
                Hormat Kami,<br />
                <strong>KUASA HUKUM PENGGUGAT</strong>
              </div>
              <div className="font-bold underline text-slate-950">
                Prof. Dr. Faisal Hartono, S.H., LL.M.
              </div>
              <div className="text-[10px] text-slate-600">NIA PERADI: 04.99281.ADV</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
