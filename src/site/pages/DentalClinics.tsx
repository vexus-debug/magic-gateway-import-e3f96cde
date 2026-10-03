import Layout from "@/site/components/Layout";
import PageHero from "@/site/components/PageHero";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Boxes,
  CalendarClock,
  Check,
  ClipboardList,
  FileBarChart,
  MessageCircle,
  ShieldCheck,
  Smile,
  Users,
  Wallet,
} from "lucide-react";
import shotPatientsAsset from "@/assets/current-dashboard/dental-patients.png.asset.json";
import shotAppointmentsAsset from "@/assets/current-dashboard/dental-appointments.png.asset.json";
import shotChartsAsset from "@/assets/current-dashboard/dental-charts.png.asset.json";
import shotBillingAsset from "@/assets/current-dashboard/dental-billing.png.asset.json";
import shotInventoryAsset from "@/assets/current-dashboard/dental-inventory.png.asset.json";
import shotDashboardAsset from "@/assets/current-dashboard/dental-dashboard.png.asset.json";
import { LocalSeo } from "@/site/components/LocalSeo";

const WHATSAPP = "https://wa.me/2349017758165?text=Hello%20I%20would%20like%20to%20know%20more%20about%20Clinexus";
const shotPatients = shotPatientsAsset.url;
const shotAppointments = shotAppointmentsAsset.url;
const shotCharts = shotChartsAsset.url;
const shotBilling = shotBillingAsset.url;
const shotInventory = shotInventoryAsset.url;
const shotDashboard = shotDashboardAsset.url;
const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "-70px" };
const reveal = { hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const slide = (dir: "left" | "right" | "up") => ({ hidden: { opacity: 0, x: dir === "left" ? -70 : dir === "right" ? 70 : 0, y: dir === "up" ? 60 : 0 }, show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: EASE } } });

const Screenshot = ({ src, alt }: { src: string; alt: string }) => (
  <div className="mb-6 overflow-hidden rounded-2xl border border-primary/15 bg-background">
    <div className="flex items-center gap-1.5 border-b border-primary/10 bg-muted/40 px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-primary/25" />
      <span className="h-2 w-2 rounded-full bg-primary/25" />
      <span className="h-2 w-2 rounded-full bg-primary/25" />
    </div>
    <img src={src} alt={alt} loading="lazy" className="block w-full" />
  </div>
);

const modules = [
  { icon: ClipboardList, name: "Patient records", shot: shotPatients, shotAlt: "Patient list with contact details, visit history and status", benefit: "Every patient's whole story, right where you need it.", body: "Picture the patient who walks back in after a year. Instead of flipping through a tired folder, you open their name and their whole story is there — treatments, prescriptions, X-rays, notes. Allergies and emergency contacts sit right at the top, so you can walk into that chair knowing you've missed nothing." },
  { icon: CalendarClock, name: "Scheduling", shot: shotAppointments, shotAlt: "Monthly appointment calendar showing booked patients per day", benefit: "Your day runs itself, instead of running you.", body: "You'll never look up mid-procedure to find the front desk has double-booked a chair again. Book by patient, dentist and chair without clashes. Day, week and month views, a live chair grid, a walk-in queue and a waiting list keep your day moving, even when it's hectic." },
  { icon: Smile, name: "Dental charting", shot: shotCharts, shotAlt: "Interactive adult tooth chart with per-tooth condition colours", benefit: "Chart by tooth, not by memory.", body: "Tap the tooth, record what you found, and turn back to the person in front of you. Treatment plans, prescriptions and consent forms stay attached to the same patient — so six months from now, you'll know exactly what you saw without guessing." },
  { icon: Wallet, name: "Billing", shot: shotBilling, shotAlt: "Billing screen with invoices, amounts owed and payment status", benefit: "You worked for that money. Watch it come home.", body: "There's nothing worse than a month-end total that doesn't match the work you put in. See who owes you, who's on a payment plan, and what each treatment really costs you to deliver — so your numbers finally reflect the care you give." },
  { icon: Boxes, name: "Inventory", shot: shotInventory, shotAlt: "Inventory list showing stock levels and low-stock alerts", benefit: "Never reach for something that isn't there.", body: "You're mid-procedure. The last thing you should be doing is wondering whether that material ran out yesterday. Know what's on the shelf before the patient sits down, not while they're in the chair. Low-stock alerts, suppliers and purchase orders, all in one place." },
  { icon: ShieldCheck, name: "Oversight & access", shot: shotDashboard, shotAlt: "Clinic dashboard with patient count, revenue and today's schedule", benefit: "You see everything. Your staff see only their part.", body: "Patient numbers, today's schedule, pending payments and monthly revenue on one screen — the whole clinic in a single glance, before you even take off your coat. Each person on your team only sees what their job needs, so you can let go without losing control." },
];


const included = ["Full patient records, SOAP notes and tooth-tagged imaging", "Scheduling with chair and clinician conflict prevention", "Dental charting, treatment planning and consent forms", "Billing, payment plans, commissions and profitability reporting", "Inventory linked to treatments, suppliers and purchase orders", "Reports, analytics and role-based access control"];
const roles = ["Owner", "Admin", "Dentist", "Receptionist", "Hygienist", "Assistant", "Accountant", "Lab technician", "Lab assistant"];
const plans = [
  {
    name: "Starter",
    featured: false,
    prices: [
      { label: "Quarterly", price: "₦35,000", period: "every 3 months" },
      { label: "Half-yearly", price: "₦75,000", period: "every 6 months" },
      { label: "Full year", price: "₦150,000", period: "every 12 months" },
    ],
  },
  {
    name: "Smart",
    featured: true,
    prices: [
      { label: "Quarterly", price: "₦50,000", period: "every 3 months" },
      { label: "Half-yearly", price: "₦100,000", period: "every 6 months" },
      { label: "Full year", price: "₦200,000", period: "every 12 months" },
    ],
  },
  {
    name: "Pro",
    featured: false,
    prices: [
      { label: "Quarterly", price: "₦100,000", period: "every 3 months" },
      { label: "Half-yearly", price: "₦200,000", period: "every 6 months" },
      { label: "Full year", price: "₦400,000", period: "every 12 months" },
    ],
  },
];
const setupFeeNote = "*A one-time setup fee of ₦5,000 applies.";

const coreGroups = [
  {
    icon: Users,
    title: "Patients & appointments",
    benefit: "Fewer no-shows. Shorter waits. A front desk that finally breathes.",
    points: [
"Every patient's history, files and allergies in one profile",
"Appointments, dentist schedules and a live waiting list",
"Notes, treatment plans, prescriptions and consent forms, all digital",
"Treatments link to the materials they use, so stock and notes agree",
    ],
  },
  {
    icon: Wallet,
    title: "Money & billing",
    benefit: "Know what you earned, what it cost you and who still owes you — without opening a notebook.",
    points: [
"Invoices and estimates before the patient commits to treatment",
"Payment plans for big work like implants and braces",
"Expenses and staff commissions tracked as they happen",
"See profit per treatment and per dentist, not just month-end totals",
    ],
  },
  {
    icon: Boxes,
    title: "Stock & suppliers",
    benefit: "Never have to cancel a procedure because something ran out on your watch.",
    points: [
"Every material tracked with its real cost and value",
"Treatments link straight to the materials they consume",
"Suppliers and purchase orders stay with the items they deliver",
"Check what's on the shelf in seconds, before the next patient",
    ],
  },
  {
    icon: FileBarChart,
    title: "Reports & admin",
    benefit: "Run your clinic on facts, not on the nagging feeling that something's slipping.",
    points: [
"Clear reports on patients, money and daily activity",
"Staff records, documents and clinic settings in one place",
"An audit trail showing who changed what, and when",
"A live feed, so you always know what's happening without asking",
    ],
  },
];

const DentalClinics = () => {
  return (
    <Layout>
      <PageHero
        eyebrow="Clinexus for dental clinics"
        title="You didn't spend years learning to heal teeth so you could chase folders all evening."
        description="You know the feeling — a full waiting room, a patient in the chair who needs all of you, and a stack of files daring you to fall behind. We built Clinexus sitting with dental clinics like yours, listening to the days you actually have. Everything here exists because someone like you asked for it, not because a software company guessed."
        primaryCta={{ label: "Talk to us on WhatsApp", href: WHATSAPP, external: true }}
        secondaryCta={{ label: "See the full feature list", href: "/industries/dental-clinics/features" }}
        points={[
          { value: "3–4 hrs", label: "Admin time given back each day" },
          { value: "40%", label: "Fewer no-shows with automatic reminders" },
          { value: "9", label: "Staff roles with their own access" },
        ]}
      />
      <div className="eye-theme overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pb-16 lg:pb-24">

          <section id="features" className="scroll-mt-24">
            <motion.h2 initial="hidden" whileInView="show" viewport={viewport} variants={reveal} className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              What you get, <span className="text-muted-foreground">in plain words</span>
            </motion.h2>
            <motion.p initial="hidden" whileInView="show" viewport={viewport} variants={reveal} className="mb-10 max-w-2xl text-muted-foreground">
              One simple place for your patients, your appointments, your money and your stock — instead of the folders, notebooks and endless chats that eat your evenings.
            </motion.p>
            <div className="mb-16 grid gap-6 md:grid-cols-2 lg:mb-24">
              {modules.map((item, i) => (
                <motion.article key={item.name} initial="hidden" whileInView="show" viewport={viewport} variants={slide(i % 2 === 0 ? "left" : "right")} whileHover={{ y: -5 }} className="eye-panel min-w-0 flex flex-col rounded-2xl p-5 sm:rounded-3xl sm:p-7">
                  <Screenshot src={item.shot} alt={item.shotAlt} />
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><item.icon className="h-5 w-5 text-primary" /></div>
                    <span className="font-display text-3xl font-bold text-primary/25">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-card-foreground">{item.name}</h3>
                  <p className="mb-3 font-medium text-primary">{item.benefit}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <motion.h2 initial="hidden" whileInView="show" viewport={viewport} variants={reveal} className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            The rest of the clinic, <span className="text-muted-foreground">already in there, not another product to buy</span>
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={viewport} variants={reveal} className="mb-10 max-w-2xl text-muted-foreground">
            Seeing patients is only half your job. You know the other half all too well: the money, the stock, the staff — and that patient who hasn't been back in a year, the one you keep meaning to call. It all lives in the same system, using the same records.
          </motion.p>
          <div className="mb-16 grid gap-4 md:grid-cols-2 lg:mb-24">
            {coreGroups.map((group, i) => (
              <motion.article key={group.title} initial="hidden" whileInView="show" viewport={viewport} variants={slide(i % 2 === 0 ? "left" : "right")} whileHover={{ y: -5 }} className={i === 1 ? "eye-panel-light min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8" : i === 2 ? "eye-panel-accent min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8" : "eye-panel min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8"}>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><group.icon className="h-5 w-5 text-primary" /></div>
                <h3 className="mb-2 text-xl font-bold">{group.title}</h3>
                <p className="mb-5 font-medium text-primary">{group.benefit}</p>
                <ul className="space-y-2.5">{group.points.map((point) => <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{point}</span></li>)}</ul>
              </motion.article>
            ))}
          </div>

          <div className="mb-16 grid gap-4 md:grid-cols-12 lg:mb-24">
            <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={slide("left")} className="eye-panel col-span-12 min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8 md:col-span-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><Users className="h-5 w-5 text-primary" /></div>
              <h3 className="mb-2 text-xl font-bold text-card-foreground">Know what's happening, every day</h3>
              <p className="mb-5 font-medium text-primary">Without chasing anyone for an update.</p>
              <ul className="space-y-2.5">{["Patient count, pending payments and this month's revenue, right up front", "Today's schedule and who's next, plus a live activity feed", "Reports that answer the questions you actually ask"].map((point) => <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{point}</span></li>)}</ul>
            </motion.section>
            <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={slide("right")} className="eye-panel col-span-12 min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8 md:col-span-5">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><ShieldCheck className="h-5 w-5 text-primary" /></div>
              <h3 className="mb-2 text-xl font-bold text-card-foreground">Everyone sees only what they should</h3>
              <p className="mb-5 font-medium text-primary">Reception doesn't see your finances. Simple.</p>
              <div className="flex flex-wrap gap-2">{roles.map((role) => <span key={role} className="rounded-full border border-primary/20 px-3 py-1 text-xs text-muted-foreground">{role}</span>)}</div>
            </motion.section>
          </div>

          <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={reveal} className="eye-panel rounded-2xl p-5 text-center sm:rounded-[3rem] sm:p-8 md:p-12" style={{ borderColor: "hsl(var(--primary) / 0.3)" }}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Getting started</p>
            <h2 className="mb-4 text-3xl font-bold text-card-foreground">Pick your plan. Everything's included.</h2>
            <p className="mx-auto mb-12 max-w-2xl text-muted-foreground">You shouldn't have to pay more just to run your own clinic properly, so we don't lock billing or stock behind a pricier tier. Every plan below carries the full Clinexus feature set. Choose the plan that suits your clinic, then choose how often you want to pay.</p>
            <div className="mx-auto mb-12 grid max-w-5xl gap-6 text-left md:grid-cols-3">
              {plans.map((plan, i) => (
                <motion.div key={plan.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }} whileHover={{ y: -6 }} className={plan.featured ? "eye-panel-accent rounded-2xl p-6 md:scale-105" : "rounded-2xl bg-background/50 p-6"}>
                  <div className="mb-5 flex items-center justify-between gap-2">
                    <p className={plan.featured ? "text-lg font-bold" : "text-lg font-bold text-primary"}>{plan.name}</p>
                    {plan.featured && <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">Most popular</span>}
                  </div>
                  <div className="space-y-3">
                    {plan.prices.map((tier) => (
                      <div key={tier.label} className={`flex items-center justify-between gap-3 border-t pt-3 first:border-t-0 first:pt-0 ${plan.featured ? "border-primary-foreground/25" : "border-primary/10"}`}>
                        <div>
                          <p className={plan.featured ? "text-sm font-medium" : "text-sm font-medium text-card-foreground"}>{tier.label}</p>
                          <p className={plan.featured ? "text-[11px] opacity-60" : "text-[11px] text-muted-foreground/60"}>{tier.period}</p>
                        </div>
                        <p className={plan.featured ? "text-xl font-bold" : "text-xl font-bold text-primary"}>{tier.price}<span className="align-top text-xs">*</span></p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mx-auto max-w-2xl text-left"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Included at every tier</p><div className="grid gap-4 md:grid-cols-2">{included.map((item) => <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></div>)}</div></div>
            <p className="mx-auto mt-6 max-w-2xl text-left text-xs text-muted-foreground/70">{setupFeeNote}</p>
          </motion.section>

          <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={reveal} className="mt-24 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Next step</p>
            <h2 className="mb-5 text-3xl font-bold text-foreground">See it with your own patients</h2>
            <p className="mx-auto mb-10 max-w-2xl leading-relaxed text-muted-foreground">Tell us about your day — how your clinic handles booking, charting and billing, and the part that frustrates you most — and we'll show you Clinexus doing exactly that for your workflow, not a generic demo.</p>
            <div className="flex w-full flex-col gap-4 sm:inline-flex sm:w-auto sm:flex-row"><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 font-bold text-primary-foreground transition-colors hover:bg-foreground sm:w-auto sm:px-10"><MessageCircle className="h-5 w-5" />Talk to us on WhatsApp</a><Link to="/login" className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-primary px-6 py-4 font-bold text-primary transition-colors hover:bg-primary/10 sm:w-auto sm:px-10">See demo <ArrowRight className="h-5 w-5" /></Link></div>
            <p className="mt-6 text-sm text-muted-foreground/60">Clinexus, clinic management for how your clinic really works.</p>
          </motion.section>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24">
        <LocalSeo specialty="Dental clinics" />
      </div>
    </Layout>
  );
};

export default DentalClinics;
