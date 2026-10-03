import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, CheckCircle2, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PageTour, TourStepDef } from "./types";

interface GuidedTourProps {
  tour: PageTour;
  open: boolean;
  onClose: () => void;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PADDING = 8;
const CARD_WIDTH = 320;

function findTarget(step: TourStepDef): HTMLElement | null {
  if (!step.target) return null;
  for (const selector of step.target.split(",")) {
    const trimmed = selector.trim();
    if (!trimmed) continue;
    const el = document.querySelector<HTMLElement>(trimmed);
    if (el && el.offsetParent !== null) return el;
  }
  return null;
}

function measure(el: HTMLElement): Rect {
  const r = el.getBoundingClientRect();
  return {
    top: r.top - PADDING,
    left: r.left - PADDING,
    width: r.width + PADDING * 2,
    height: r.height + PADDING * 2,
  };
}

export function GuidedTour({ tour, open, onClose }: GuidedTourProps) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const rafRef = useRef<number | null>(null);

  // Only keep steps whose target exists right now (plus target-less steps).
  const steps = useMemo(() => {
    if (!open) return tour.steps;
    return tour.steps.filter((s) => !s.target || findTarget(s) !== null);
  }, [open, tour.steps]);

  const total = steps.length;
  const step = steps[Math.min(index, total - 1)];

  const sync = useCallback(() => {
    if (!step) return;
    const el = findTarget(step);
    setRect(el ? measure(el) : null);
  }, [step]);

  // Scroll the current target into view, then track it while it settles.
  useEffect(() => {
    if (!open || !step) return;
    const el = findTarget(step);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
    const start = performance.now();
    const tick = () => {
      sync();
      if (performance.now() - start < 900) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [open, step, sync]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("resize", sync);
    window.addEventListener("scroll", sync, true);
    return () => {
      window.removeEventListener("resize", sync);
      window.removeEventListener("scroll", sync, true);
    };
  }, [open, sync]);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  const goNext = useCallback(() => {
    setIndex((i) => {
      if (i >= total - 1) {
        onClose();
        return i;
      }
      return i + 1;
    });
  }, [total, onClose]);

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, goNext, goPrev]);

  if (!open || !step || typeof document === "undefined") return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cardWidth = Math.min(CARD_WIDTH, vw - 24);

  // Work out where the tooltip should sit.
  let cardStyle: React.CSSProperties;
  if (!rect || step.placement === "center") {
    cardStyle = {
      width: cardWidth,
      left: (vw - cardWidth) / 2,
      top: Math.max(24, vh / 2 - 140),
    };
  } else {
    const spaceBelow = vh - (rect.top + rect.height);
    const spaceAbove = rect.top;
    const preferTop = step.placement === "top" || (spaceBelow < 220 && spaceAbove > spaceBelow);
    const top = preferTop
      ? Math.max(12, rect.top - 12 - 200)
      : Math.min(vh - 220, rect.top + rect.height + 12);
    const left = Math.min(
      Math.max(12, rect.left + rect.width / 2 - cardWidth / 2),
      vw - cardWidth - 12
    );
    cardStyle = { width: cardWidth, left, top: Math.max(12, top) };
  }

  return createPortal(
    <div className="fixed inset-0 z-[120]">
      {/* Dimmed backdrop with a cut-out spotlight around the target */}
      <div className="absolute inset-0" onClick={onClose}>
        {rect ? (
          <motion.div
            animate={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute rounded-xl ring-2 ring-primary/70 pointer-events-none"
            style={{ boxShadow: "0 0 0 9999px rgba(2,6,23,0.62)" }}
          />
        ) : (
          <div className="absolute inset-0 bg-slate-950/60" />
        )}
      </div>

      {/* Tooltip card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className="absolute rounded-2xl border border-border/70 bg-card shadow-2xl p-4"
          style={cardStyle}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/25">
                <Compass className="h-3.5 w-3.5 text-primary" />
              </span>
              <div className="leading-tight">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {tour.title} tour
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Step {index + 1} of {total}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close tour"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <h3 className="mt-3 text-sm font-bold text-foreground">{step.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.body}</p>

          <div className="mt-3 flex gap-1">
            {steps.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i <= index ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-xs text-muted-foreground"
            >
              Skip
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goPrev}
                disabled={index === 0}
                className="gap-1 text-xs"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Back
              </Button>
              <Button size="sm" onClick={goNext} className="gap-1 text-xs">
                {index === total - 1 ? (
                  <>
                    Finish
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-3.5 w-3.5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>,
    document.body
  );
}
