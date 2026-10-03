import Layout from "@/site/components/Layout";
import PageHero from "@/site/components/PageHero";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Check } from "lucide-react";
import shotDashboardAsset from "@/assets/current-dashboard/eye-dashboard.png.asset.json";
import shotOverviewAsset from "@/assets/current-dashboard/eye-overview.png.asset.json";
import shotExamsAsset from "@/assets/current-dashboard/eye-exams.png.asset.json";
import shotChartsAsset from "@/assets/current-dashboard/eye-charts.png.asset.json";
import shotOrdersAsset from "@/assets/current-dashboard/eye-orders.png.asset.json";
import shotPrescriptionsAsset from "@/assets/current-dashboard/eye-prescriptions.png.asset.json";
import shotSurgeryAsset from "@/assets/current-dashboard/eye-surgery.png.asset.json";
import shotContactLensesAsset from "@/assets/current-dashboard/eye-contact-lenses.png.asset.json";
import shotAppointmentsAsset from "@/assets/current-dashboard/eye-appointments.png.asset.json";
import { LocalSeo } from "@/site/components/LocalSeo";

const Screenshot = ({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) => (
  <figure className={className}>
    <div className="overflow-hidden rounded-2xl border border-primary/15 bg-background">
      <div className="flex items-center gap-1.5 border-b border-primary/10 bg-muted/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-primary/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/25" />
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
    {caption && (
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>
    )}
  </figure>
);

const WHATSAPP = "https://wa.me/2349017758165?text=Hello%20I%20would%20like%20to%20know%20more%20about%20Clinexus";
const shotDashboard = shotDashboardAsset.url;
const shotOverview = shotOverviewAsset.url;
const shotExams = shotExamsAsset.url;
const shotCharts = shotChartsAsset.url;
const shotOrders = shotOrdersAsset.url;
const shotPrescriptions = shotPrescriptionsAsset.url;
const shotSurgery = shotSurgeryAsset.url;
const shotContactLenses = shotContactLensesAsset.url;
const shotAppointments = shotAppointmentsAsset.url;
const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const slide = (dir: "left" | "right" | "up") => ({
  hidden: {
    opacity: 0,
    x: dir === "left" ? -70 : dir === "right" ? 70 : 0,
    y: dir === "up" ? 60 : 0,
  },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: EASE } },
});

const viewport = { once: true, margin: "-70px" };

const plans = [
  { label: "Quarterly", price: "₦15,000", period: "every 3 months" },
  { label: "Half-yearly", price: "₦30,000", period: "every 6 months", featured: true },
  { label: "Yearly", price: "₦60,000", period: "every 12 months" },
];
const setupFeeNote = "*A one-time setup fee of ₦5,000 applies.";

const included = [
"Full clinical exam and refraction records",
"Diagnostic imaging uploads with automatic trend charts",
"Contact lens fitting and optical order tracking",
"Surgery booking, biometry/IOL, consent tracking",
"Appointments, invoicing, inventory, staff scheduling, analytics",
];

const EyeClinics = () => {
  return (
    <Layout>
      <PageHero
        eyebrow="Clinexus for eye clinics"
        title="You fix eyes all day. The paperwork shouldn't be the thing wearing you down."
        description="You chose this work because a patient's sight depends on you. So the exams, refractions, diagnostics, lens dispensing, surgeries and everyday admin shouldn't be the part that drains you. Clinexus holds it all in one simple place, so nothing slips past you."
        primaryCta={{ label: "Talk to us on WhatsApp", href: WHATSAPP, external: true }}
        secondaryCta={{ label: "See the full feature list", href: "/industries/eye-clinics/features" }}
        points={[
          { value: "3–4 hrs", label: "Admin time given back each day" },
          { value: "40%", label: "Fewer no-shows with automatic reminders" },
          { value: "9", label: "Staff roles with their own access" },
        ]}
      />
      <div className="eye-theme overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pb-16 lg:pb-24">

          {/* Hero product shot */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="mb-16 lg:mb-24"
          >
            <Screenshot
              src={shotDashboard}
              alt="Clinexus dashboard showing revenue, patient stats and today's appointments for a demo eye clinic"
              caption="The clinic dashboard, revenue, patients and today's schedule at a glance"
            />
          </motion.div>

          {/* Bento capabilities */}
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="mb-10 text-2xl font-bold text-foreground md:text-3xl"
          >
            What you get -{" "}
            <span className="text-muted-foreground">in plain words</span>
          </motion.h2>

          <div className="mb-16 grid grid-cols-12 gap-4 lg:mb-24">
            {/* 01 */}
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={slide("left")}
              whileHover={{ y: -5 }}
              className="eye-panel col-span-12 flex min-h-[400px] min-w-0 flex-col justify-between rounded-2xl p-5 sm:rounded-3xl sm:p-8 md:col-span-8"
            >
              <div>
                <span className="font-display text-5xl font-bold text-primary/30">01</span>
                <h3 className="mb-2 mt-4 text-2xl font-bold text-card-foreground">
                  Every exam, one record, nothing lost
                </h3>
                <Screenshot
                  src={shotExams}
                  alt="Eye exam records showing visual acuity and IOP readings per patient"
                  className="mt-5"
                />
                <p className="mb-4 font-medium text-primary">
                  Stop rebuilding a patient's history from memory or a paper folder. You open their name,
                  and their whole story is right there on one timeline, trending on its own.
                </p>
                <p className="max-w-2xl leading-relaxed text-muted-foreground">
                  Vision (aided, unaided, pinhole), eye pressure and how it was measured, pupils, front and
                  back of the eye, C/D ratio and dilation. Full refraction per eye: sphere, cylinder, axis,
                  add, prism and PD for distance, reading, bifocal, progressive, computer and contact lens
                  prescriptions, with issue and expiry dates tracked.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {["OD / OS timeline", "Refraction history", "IOP + C/D trend"].map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.6, ease: EASE }}
                    className="flex h-20 flex-1 items-end rounded-xl border border-primary/10 bg-background p-3 text-[11px] uppercase tracking-wide text-muted-foreground/70"
                  >
                    {label}
                  </motion.div>
                ))}
              </div>
            </motion.article>

            {/* 02 */}
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={slide("right")}
              whileHover={{ y: -5 }}
              className="eye-panel-light col-span-12 min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8 md:col-span-4"
            >
              <span className="font-display text-5xl font-bold opacity-20">02</span>
              <h3 className="mb-2 mt-4 text-2xl font-bold">Charts that draw themselves</h3>
              <Screenshot
                src={shotCharts}
                alt="Eye charts plotting IOP, OCT and visual field trends over time"
                className="mt-5"
              />
              <p className="mb-4 font-medium opacity-80">
                Spot the slow change — that quiet drift of early glaucoma — before a single visit makes
                it obvious to you.
              </p>
              <p className="text-sm leading-relaxed opacity-70">
                Log OCT, visual fields, fundus photos, angiography, topography, pachymetry, biometry/IOL,
                B-scan and more, with files attached to findings. Pressure, C/D ratio, RNFL and field trends
                plot automatically for each eye. One reports view shows every result for a patient.
              </p>
            </motion.article>

            {/* 03 */}
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={slide("up")}
              whileHover={{ y: -5 }}
              className="eye-panel col-span-12 min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8 md:col-span-4"
            >
              <span className="font-display text-5xl font-bold text-primary/30">03</span>
              <h3 className="mb-2 mt-4 text-xl font-bold text-card-foreground">
                Lens fittings and orders that track themselves
              </h3>
              <Screenshot
                src={shotContactLenses}
                alt="Contact lens fittings with brand, base curve and aftercare dates"
                className="mt-5"
              />
              <p className="mb-2 font-medium text-primary">
                Know where every fitting and order stands, without scrolling a chat thread at 9pm.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Contact lens fittings record brand, type, curve, diameter, powers and fit, with aftercare
                dates booked automatically. Optical orders track frame, lens type, coatings and lab status
                from ordered → at lab → ready → collected, against promised dates.
              </p>
            </motion.article>

            {/* 04 */}
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={slide("up")}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="eye-panel col-span-12 min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8 md:col-span-4"
            >
              <span className="font-display text-5xl font-bold text-primary/30">04</span>
              <h3 className="mb-2 mt-4 text-xl font-bold text-card-foreground">
                Surgery bookings with nothing left to chance
              </h3>
              <Screenshot
                src={shotSurgery}
                alt="Surgery bookings list with procedure, theatre and IOL details"
                className="mt-5"
              />
              <p className="mb-2 font-medium text-primary">
                Everything surgery day needs sits with the booking, not scattered across folders.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Book by procedure (phaco, trabeculectomy, YAG, pterygium, injections and more), eye and
                theatre. IOL power from biometry, pre-op checklists and consent forms all live on the same
                record, with outcome notes after.
              </p>
            </motion.article>

            {/* 05 */}
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={slide("up")}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="eye-panel-accent col-span-12 min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8 md:col-span-4"
            >
              <span className="font-display text-5xl font-bold opacity-30">05</span>
              <h3 className="mb-2 mt-4 text-xl font-bold">
                Everything else, included and not bolted on
              </h3>
              <Screenshot
                src={shotAppointments}
                alt="Appointments schedule for the demo clinic"
                className="mt-5"
              />
              <p className="mb-2 font-medium opacity-80">
                One system instead of three or four you have to keep in sync.
              </p>
              <p className="text-sm leading-relaxed opacity-90">
                Appointments and waiting list, invoicing and payments, stock for drops, lenses and frames,
                prescriptions, staff schedules and reports for the whole clinic.
              </p>
            </motion.article>
          </div>

          {/* Product gallery */}
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="mb-4 text-2xl font-bold text-foreground md:text-3xl"
          >
            See it in action -{" "}
            <span className="text-muted-foreground">real screens from a demo eye clinic</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="mb-10 max-w-2xl text-muted-foreground"
          >
            Real screens from a working demo clinic, not mockups.
          </motion.p>

          <div className="mb-16 grid gap-8 md:grid-cols-2 lg:mb-24 lg:gap-10">
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={slide("left")}>
              <Screenshot
                src={shotOverview}
                alt="Eye care overview with raised-IOP alerts and glaucoma watch lists"
                caption="Eye care overview, raised-IOP alerts and glaucoma watch lists surface automatically"
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={slide("right")}>
              <Screenshot
                src={shotCharts}
                alt="Trend charts for eye pressure, OCT and visual field results"
                caption="Trend charts, IOP, OCT and visual field results plotted per eye over time"
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={slide("left")}>
              <Screenshot
                src={shotExams}
                alt="Clinical exam records with vision and pressure readings"
                caption="Exam records, visual acuity, IOP and refraction on one timeline"
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={slide("right")}>
              <Screenshot
                src={shotPrescriptions}
                alt="Optical prescriptions with full lens details per eye"
                caption="Prescriptions, sphere, cylinder, axis, add and PD per eye, with expiry tracked"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={slide("up")}
              className="md:col-span-2"
            >
              <Screenshot
                src={shotOrders}
                alt="Optical orders tracking frames and lenses through the lab"
                caption="Optical orders, frames and lenses tracked from ordered to collected"
              />
            </motion.div>
          </div>

          {/* Pricing */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="eye-panel rounded-2xl p-5 text-center sm:rounded-[3rem] sm:p-8 md:p-12"
            style={{ borderColor: "hsl(var(--primary) / 0.3)" }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Getting started
            </p>
            <h2 className="mb-4 text-3xl font-bold text-card-foreground">
              One plan. Everything included. No surprises.
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-muted-foreground">
              We don't hold diagnostics or surgery tracking behind a pricier tier. Everything above is in
              from day one. Just choose how often you want to pay.
            </p>

            <div className="mx-auto mb-12 grid max-w-4xl gap-8 md:grid-cols-3">
              {plans.map((p, i) => (
                <motion.div
                  key={p.period}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
                  whileHover={{ y: -6 }}
                  className={
                    p.featured
                      ? "eye-panel-accent rounded-2xl p-6 md:scale-105"
                      : "rounded-2xl bg-background/50 p-6"
                  }
                >
                  <p
                    className={
                      p.featured
                        ? "mb-2 text-sm font-bold opacity-70"
                        : "mb-2 text-sm text-muted-foreground"
                    }
                  >
                    {p.label}
                  </p>
                  <div
                    className={p.featured ? "text-3xl font-bold" : "text-3xl font-bold text-primary"}
                  >
                    {p.price}<span className="align-top text-base">*</span>
                  </div>
                  <p className={p.featured ? "mt-1 text-xs opacity-60" : "mt-1 text-xs text-muted-foreground/60"}>
                    {p.period}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mx-auto max-w-2xl text-left">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Included at every tier
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-left text-xs text-muted-foreground/70">{setupFeeNote}</p>
          </motion.section>

          {/* Final CTA */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="mt-24 text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Next step</p>
            <h2 className="mb-5 text-3xl font-bold text-foreground">
              See it with your own patients
            </h2>
            <p className="mx-auto mb-10 max-w-2xl leading-relaxed text-muted-foreground">
              Tell us how your clinic handles exams, dispensing and surgery today, and we'll show you Clinexus
              doing exactly that for your workflow, not a generic demo.
            </p>
            <div className="flex w-full flex-col gap-4 sm:inline-flex sm:w-auto sm:flex-row">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 font-bold text-primary-foreground transition-colors hover:bg-foreground sm:w-auto sm:px-10"
              >
                <MessageCircle className="h-5 w-5" />
                Talk to us on WhatsApp
              </a>
              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-primary px-6 py-4 font-bold text-primary transition-colors hover:bg-primary/10 sm:w-auto sm:px-10"
              >
                See demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground/60">
              Clinexus, clinic management for how your clinic really works.
            </p>
          </motion.section>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24">
        <LocalSeo specialty="Eye clinics" />
      </div>
    </Layout>
  );
};

export default EyeClinics;
