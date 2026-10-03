import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Will this actually save me time, or is it just more software to manage?",
    a: "Most clinic owners report saving 2–4 hours a day within the first week. Everything that used to require switching between tools, billing, scheduling, records, lab tracking, happens in one place. You stop managing software and start managing your clinic.",
  },
  {
    q: "What if my staff isn't tech-savvy?",
    a: "Clinexus is built to be as intuitive as a smartphone. Your receptionist, your nurses, your lab tech, they'll figure it out fast. We also provide onboarding support and tutorials built right into the platform.",
  },
  {
    q: "How quickly will I see a difference?",
    a: "Most clinics see fewer no-shows within the first week (automated reminders kick in immediately) and cleaner billing from day one. The full impact, better cash flow, staff accountability, real profitability data, compounds quickly as your team settles in.",
  },
  {
    q: "Can my patients book appointments themselves?",
    a: "Yes. Your clinic gets a branded public page where patients can view your services and book directly, reducing phone calls and keeping your reception focused on in-clinic care.",
  },
  {
    q: "What if I grow and need more from the system?",
    a: "Clinexus scales with you. Start on Starter, upgrade to Growth or Pro as your team and revenue grow. You never have to switch platforms, just unlock more as you need it.",
  },
];

const FAQSection = () => {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--medical-blue-dark))] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 " />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[hsl(var(--medical-teal))]">
            FAQ
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            The Questions Every Clinic Owner Asks Us
          </h2>
          <p className="text-white/60">
            Honest answers, no marketing fluff.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline hover:text-white/80">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-white/50">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
