"use client";

import React from "react";
import { CourtHearing } from "@/types/legal";
import { formatHearingCountdown } from "@/lib/utils";
import { Scale, Clock, MapPin, UserCheck, AlertCircle, Calendar } from "lucide-react";

interface CourtHearingTimelineProps {
  hearings: CourtHearing[];
}

export function CourtHearingTimeline({ hearings }: CourtHearingTimelineProps) {
  const sortedHearings = [...hearings].sort(
    (a, b) => new Date(a.scheduledDateIso).getTime() - new Date(b.scheduledDateIso).getTime()
  );

  const getStageColor = (stage: CourtHearing["stage"]) => {
    switch (stage) {
      case "Pembacaan Putusan":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "Pembuktian Saksi/Ahli":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Mediasi":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0b122c] p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              COURT DOCKET CALENDAR
            </span>
            <span className="text-xs text-slate-400">Jadwal Sidang Peradilan Aktif</span>
          </div>
          <h2 className="text-lg font-black text-white">Litigation Court Hearing Schedule</h2>
        </div>

        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold text-slate-300">
            {hearings.length} Sidang Terdaftar
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {sortedHearings.map((h) => {
          const countdown = formatHearingCountdown(h.scheduledDateIso);
          const dateStr = new Date(h.scheduledDateIso).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const timeStr = new Date(h.scheduledDateIso).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={h.id}
              className={`p-5 rounded-2xl border transition-all ${
                h.isUrgent
                  ? "bg-[#101738] border-amber-500/40 shadow-lg shadow-amber-500/5"
                  : "bg-[#080d20] border-slate-800/80"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-black text-amber-400">
                      {h.caseNumber}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStageColor(h.stage)}`}>
                      Tahap: {h.stage}
                    </span>
                    {h.isUrgent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Agenda Cito
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-black text-white">{h.caseTitle}</h3>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-start">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{countdown}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {dateStr} • {timeStr} WIB
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-[#050814] p-3 rounded-xl border border-slate-800/60 mb-4">
                <strong>Agenda:</strong> {h.agendaSummary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-3 border-t border-slate-800/80 text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate">{h.courtName} ({h.roomName})</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate">Ketua Majelis: {h.judgePanelLead}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-3.5 h-3.5 text-amber-500" />
                  <span className="truncate">Advokat Utama: {h.leadAdvocate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
