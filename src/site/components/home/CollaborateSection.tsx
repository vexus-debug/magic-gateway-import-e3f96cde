import { motion } from "framer-motion";
import { Lock, CheckCircle2, Users, Activity } from "lucide-react";

const CollaborateSection = () => {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--medical-blue-dark))] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-muted/20" />
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-5 flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted/20 ring-4 ring-white/10" />
                <div>
                  <div className="h-3 w-28 rounded-full bg-white/20" />
                  <div className="mt-2 h-2.5 w-20 rounded-full bg-white/10" />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Dr. Adeyemi completed dental chart", time: "2 min ago" },
                  { label: "Lab case #412 marked as ready", time: "5 min ago" },
                  { label: "Receptionist booked walk-in patient", time: "8 min ago" },
                  { label: "Invoice #1084, payment received", time: "15 min ago" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-[hsl(var(--medical-teal))]" />
                      <span className="text-sm text-white/90">{item.label}</span>
                    </div>
                    <span className="text-[11px] text-white/40">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -right-3 -top-3 rounded-xl border border-white/10 bg-[hsl(var(--medical-blue-dark))] px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[hsl(var(--medical-teal))]" />
                <div>
                  <div className="text-xs font-bold text-white">9 Roles</div>
                  <div className="text-[10px] text-white/50">Access Control</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-3 -left-3 rounded-xl border border-white/10 bg-[hsl(var(--medical-blue-dark))] px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[hsl(var(--medical-teal))]" />
                <div>
                  <div className="text-xs font-bold text-white">Full Audit Log</div>
                  <div className="text-[10px] text-white/50">Every Action Tracked</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Lock className="h-6 w-6 text-[hsl(var(--medical-teal))]" />
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              A Team You Can Trust, Without Watching Their Every Move
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-white/60">
              Dentists chart teeth. Receptionists manage bookings. Lab techs handle cases. Accountants track the money. Everyone sees only what they need, nothing more, nothing they shouldn't.
            </p>
            <ul className="space-y-3">
              {[
"9 ready-made roles: Owner, Admin, Dentist, Hygienist, and more",
"Your data locked down, record by record",
"Every action logged, so nothing goes unaccounted for",
"Talk to your team without a single WhatsApp group",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[hsl(var(--medical-teal))]" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CollaborateSection;
