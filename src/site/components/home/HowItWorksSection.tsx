import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Bring in the essentials",
    description: "Add your services, staff, opening hours and existing patient records. We keep the setup focused on what your clinic uses every day.",
    outcome: "Services · Staff · Patient records",
  },
  {
    number: "02",
    title: "Set the working routine",
    description: "Define appointment lengths, staff access and payment steps around the way your team already works.",
    outcome: "Schedules · Access · Billing",
  },
  {
    number: "03",
    title: "Run the day from one place",
    description: "Appointments, invoices and clinical activity stay connected, giving every authorised team member the same current view.",
    outcome: "Appointments · Invoices · Activity",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="site-section-tint py-20 md:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-4"
          >
            <span className="site-eyebrow block text-primary">Getting started</span>
            <h2 className="mt-4 max-w-sm text-3xl text-foreground md:text-4xl">
              A considered move, not a disruption.
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
              Clinexus is organised around your existing clinic routine, so the move is clear for staff and patients.
            </p>
          </motion.header>

          <ol className="border-t border-border/30 lg:col-span-8">
            {steps.map((step, index) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="grid gap-4 border-b border-border/30 py-8 sm:grid-cols-[3rem_1fr] md:grid-cols-[3rem_1fr_12rem] md:gap-6 md:py-10"
              >
                <span className="font-mono text-xs tabular-nums text-primary">{step.number}</span>
                <div>
                  <h3 className="text-xl text-foreground md:text-2xl">{step.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {step.description}
                  </p>
                </div>
                <p className="self-start text-xs leading-relaxed text-muted-foreground md:text-right">
                  {step.outcome}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
