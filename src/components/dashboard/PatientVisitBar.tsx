import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { setActiveVisit } from "@/hooks/useActiveVisit";
import { Button } from "@/components/ui/button";
import { User, Grid3x3, ClipboardList, Pill, FileSignature, NotebookPen, CheckCircle2, X, FlaskConical, Calculator, ArrowRight } from "lucide-react";
import { usePatients } from "@/hooks/usePatients";
import { useClinicLinks, usePatientContext } from "@/hooks/usePatientContext";
import { useClinicTerms } from "@/hooks/useClinicTerms";
import { VisitCompletionDialog } from "@/components/dashboard/VisitCompletionDialog";
import { cn } from "@/lib/utils";

/**
 * Active-visit strip: keeps the patient locked across clinical pages and offers
 * one-tap jumps plus "Finish visit".
 */
export function PatientVisitBar({ patientId, onClear }: { patientId: string; onClear?: () => void }) {
  const { data: patients = [] } = usePatients();
  const link = useClinicLinks();
  const terms = useClinicTerms();
  const { pathname } = useLocation();
  const [finishOpen, setFinishOpen] = useState(false);
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const clear = onClear
    ? () => { setActiveVisit(null); onClear(); }
    : () => {
        setActiveVisit(null);
        setSearchParams((prev) => { const n = new URLSearchParams(prev); n.delete("patientId"); return n; }, { replace: true });
      };
  const patient = patients.find((p: any) => p.id === patientId);
  const name = patient ? `${patient.first_name} ${patient.last_name}` : "Patient";

  const items = [
    { page: "consent-forms", label: "Consent", icon: FileSignature, extra: { new: "1" } },
    terms.showDentalChart ? { page: "dental-charts", label: "Chart", icon: Grid3x3 } : null,
    { page: "treatments", label: "Plan", icon: ClipboardList, extra: { tab: "plans" } },
    { page: "prescriptions", label: "Rx", icon: Pill, extra: { new: "1" } },
    { page: "lab-work", label: "Lab", icon: FlaskConical, extra: { new: "1" } },
    { page: "estimates", label: "Estimate", icon: Calculator, extra: { fromPlan: "1" } },
    { page: "patient", label: "Notes", icon: NotebookPen },
  ].filter(Boolean) as { page: string; label: string; icon: any; extra?: Record<string, string> }[];

  // Guided flow: Consent → Chart → Plan → Rx, then Finish.
  const flow = items.filter((i) => ["consent-forms", "dental-charts", "treatments", "prescriptions"].includes(i.page));
  const idx = flow.findIndex((i) => pathname.endsWith(`/${i.page}`));
  const next = idx >= 0 ? flow[idx + 1] : null;

  return (
    <>
      <div className="sticky top-0 z-20 -mx-1 rounded-xl border border-secondary/30 bg-card/95 backdrop-blur px-3 py-2 shadow-sm flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 min-w-0 mr-auto">
          <div className="h-7 w-7 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
            <User className="h-3.5 w-3.5 text-secondary" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground leading-none">Active visit</p>
            <p className="text-sm font-semibold truncate">{name}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          {items.map((it) => {
            const active = it.page !== "patient" && pathname.endsWith(`/${it.page}`);
            const Icon = it.icon;
            return (
              <Button key={it.page} asChild size="sm" variant={active ? "secondary" : "ghost"} className={cn("h-8 px-2 text-xs", active && "pointer-events-none")}>
                <Link to={it.page === "patient" ? `${link("patient", patientId)}?tab=notes` : link(it.page, patientId, it.extra)}>
                  <Icon className="h-3.5 w-3.5 sm:mr-1" />
                  <span className="hidden sm:inline">{it.label}</span>
                </Link>
              </Button>
            );
          })}
          {idx >= 0 && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-2 text-xs border-secondary/40"
              onClick={() => (next ? navigate(link(next.page, patientId, next.page === "treatments" ? { tab: "plans" } : undefined)) : setFinishOpen(true))}
            >
              {next ? `Next: ${next.label}` : "Next: Finish"} <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          )}
          <Button size="sm" className="h-8 px-2 text-xs bg-secondary hover:bg-secondary/90" onClick={() => setFinishOpen(true)}>
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Finish
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8" aria-label="End visit context" onClick={clear}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <VisitCompletionDialog open={finishOpen} onOpenChange={setFinishOpen} patientId={patientId} patientName={name} />
    </>
  );
}

/** Visit bar for pages that don't select a patient themselves (lists, settings). */
export function ActiveVisitBar() {
  const { patientId } = usePatientContext();
  return patientId ? <PatientVisitBar patientId={patientId} /> : null;
}
