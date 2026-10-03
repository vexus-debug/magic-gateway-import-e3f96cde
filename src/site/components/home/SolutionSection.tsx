import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock, TrendingUp, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import appointmentsAsset from "@/assets/current-dashboard/eye-appointments.png.asset.json";
import dashboardAsset from "@/assets/current-dashboard/dental-dashboard.png.asset.json";
import overviewAsset from "@/assets/current-dashboard/eye-overview.png.asset.json";

const appointmentsScreenshot = appointmentsAsset.url;
const dashboardScreenshot = dashboardAsset.url;
const overviewScreenshot = overviewAsset.url;

const results = [
  {
    icon: Clock,
    label: "Fewer Empty Chairs",
    value: "40%",
    sub: "Fewer no-shows, patients get reminded automatically so they actually show up",
    color: "from-[hsl(var(--primary))] to-[hsl(var(--medical-teal))]",
    image: appointmentsScreenshot,
    imageAlt: "Eye clinic appointments and patient schedule in Clinexus",
  },
  {
    icon: TrendingUp,
    label: "Revenue You Can See",
    value: "100%",
    sub: "Know exactly what you earned, what's owed, and who's making you the most money",
    color: "from-[hsl(var(--primary))] to-[hsl(var(--primary))]/60",
    image: dashboardScreenshot,
    imageAlt: "Eye clinic dashboard showing revenue and performance in Clinexus",
  },
  {
    icon: ShieldCheck,
    label: "A Team That Stays in Their Lane",
    value: "9 Roles",
    sub: "Every staff member sees only what they need, no more, no less",
    color: "from-[hsl(var(--medical-teal))] to-[hsl(var(--primary))]",
    image: overviewScreenshot,
    imageAlt: "Clinexus eye clinic overview with role-specific operational information",
  },
];

const SolutionSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative site-section-light overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-background" />

      <div className="container relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              The Problem We Solve
            </span>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              You Didn't Go to Medical School{" "}
              <span className="bg-muted/20 ">
                to Manage Spreadsheets
              </span>
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Most clinic owners lose 3–4 hours a day to admin, chasing payments, fixing records, counting stock, managing staff. That's time stolen from patients, from growth, from your family. Clinexus hands it back.
            </p>
            <Link to="/industries/eye-clinics/features">
              <Button className="gap-2 rounded-md bg-primary px-8 text-white shadow-md hover:opacity-90">
                See How We Do It <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {results.map((result, i) => (
              <motion.div
                key={result.label}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 50, rotate: 1.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: reduceMotion ? 0 : i * 0.14 }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                className={`group w-full overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm lg:max-w-md ${i === 1 ? "lg:-translate-x-10" : ""}`}
              >
                <div className="relative aspect-[16/7] overflow-hidden border-b border-border/50 bg-muted/50">
                  <motion.img
                    src={result.image}
                    alt={result.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                    initial={reduceMotion ? undefined : { scale: 1.06 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.12 + i * 0.14 }}
                  />
                </div>
                <div className="p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-muted/20">
                    <result.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mb-1 text-sm text-muted-foreground">{result.label}</div>
                  <div className={`bg-gradient-to-r ${result.color} bg-clip-text text-4xl font-extrabold text-transparent`}>
                    {result.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{result.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
