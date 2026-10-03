import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const schedule = [
  { time: "08:30", patient: "Adaeze Okonkwo", detail: "Scaling & polishing", status: "Checked in" },
  { time: "09:15", patient: "Tunde Bakare", detail: "Root canal, session 2", status: "In chair" },
  { time: "10:00", patient: "Grace Nwosu", detail: "Eye test & refraction", status: "Confirmed" },
  { time: "11:30", patient: "Samuel Eze", detail: "Crown fitting", status: "Reminder sent" },
];

const invoices = [
  { ref: "INV-2841", patient: "Adaeze Okonkwo", amount: "₦85,000", state: "Paid" },
  { ref: "INV-2838", patient: "Michael Adeyemi", amount: "₦142,500", state: "Part payment" },
  { ref: "INV-2830", patient: "Grace Nwosu", amount: "₦36,000", state: "12 days overdue" },
  { ref: "INV-2827", patient: "HMO — Avon", amount: "₦410,000", state: "Awaiting claim" },
];

const labCases = [
  { caseId: "LAB-118", work: "Zirconia crown, tooth 26", lab: "Bridgeway Dental Lab", due: "Due tomorrow" },
  { caseId: "LAB-121", work: "Upper partial denture", lab: "Bridgeway Dental Lab", due: "In transit" },
  { caseId: "LAB-124", work: "Single-vision lenses", lab: "Optica Works", due: "Ready for fitting" },
];

const panelClass =
  "site-hairline-invert rounded-md bg-white/[0.03] p-6";

const FeaturesOverviewSection = () => {
  return (
    <section className="relative bg-[hsl(var(--medical-blue-dark))] py-24 md:py-32">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="site-eyebrow block text-white/45">A day inside the clinic</span>
          <h2 className="mt-4 text-3xl text-white md:text-4xl">
            Today's schedule, the money owed, and every lab case, in one place.
          </h2>
          <p className="mt-4 text-white/55">
            No dashboards full of icons. Just the three things that decide whether your day runs
            well: who is coming in, who still owes you, and what is sitting at the lab.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className={panelClass}
          >
            <header className="flex items-baseline justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg text-white">Today's schedule</h3>
              <span className="text-xs text-white/40">Tue, 12 Mar</span>
            </header>
            <ul className="divide-y divide-white/[0.07]">
              {schedule.map((item) => (
                <li key={item.time} className="flex gap-4 py-3.5">
                  <span className="w-12 shrink-0 text-sm tabular-nums text-white/70">{item.time}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-white/90">{item.patient}</span>
                    <span className="block truncate text-xs text-white/40">{item.detail}</span>
                  </span>
                  <span className="shrink-0 self-center border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/55">
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className={panelClass}
          >
            <header className="flex items-baseline justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg text-white">Invoices</h3>
              <span className="text-xs text-white/40">₦673,500 outstanding</span>
            </header>
            <ul className="divide-y divide-white/[0.07]">
              {invoices.map((invoice) => (
                <li key={invoice.ref} className="flex items-baseline gap-4 py-3.5">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-white/90">{invoice.patient}</span>
                    <span className="block text-xs text-white/40">
                      {invoice.ref} · {invoice.state}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm tabular-nums text-white/80">{invoice.amount}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className={panelClass}
          >
            <header className="flex items-baseline justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg text-white">Lab cases</h3>
              <span className="text-xs text-white/40">3 open</span>
            </header>
            <ul className="divide-y divide-white/[0.07]">
              {labCases.map((labCase) => (
                <li key={labCase.caseId} className="py-3.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-white/90">{labCase.work}</span>
                    <span className="shrink-0 text-xs tabular-nums text-white/45">{labCase.caseId}</span>
                  </div>
                  <div className="mt-1 flex items-baseline justify-between gap-3">
                    <span className="text-xs text-white/40">{labCase.lab}</span>
                    <span className="shrink-0 text-xs text-white/60">{labCase.due}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/40">
              Every case shows who is working on it and when it is due, so nothing goes quiet
              between your clinic and the lab.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10"
        >
          <Link to="/industries">
            <Button variant="ghost" className="gap-2 rounded-sm px-0 text-white/75 hover:bg-transparent hover:text-white">
              See everything you get <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesOverviewSection;
