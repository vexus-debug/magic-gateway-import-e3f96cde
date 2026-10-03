import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import dashboardAsset from "@/assets/current-dashboard/dental-dashboard.png.asset.json";

const dashboardScreenshot = dashboardAsset.url;

const proofPoints = [
  { value: "3–4 hrs", label: "Admin time given back each day" },
  { value: "40%", label: "Fewer no-shows with automatic reminders" },
  { value: "9", label: "Staff roles with their own access" },
];

const HeroSection = () => {
  return (
    <section className="relative bg-[hsl(var(--medical-blue-dark))] py-20 md:py-28">
      <div className="container relative z-10">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="site-eyebrow block text-white/50">
              Clinic operations software
            </span>
            <h1 className="mt-5 max-w-2xl text-4xl text-white md:text-5xl lg:text-[3.75rem]">
              Your clinic deserves more revenue, and fewer late nights.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60">
              Stop chasing payments, fixing billing mistakes, and drowning in paperwork.
              Clinexus runs the business side of your clinic so you can focus on patients,
              and actually go home on time.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="https://wa.me/2349017758165?text=Hello%20I%20would%20like%20to%20know%20more%20about%20Clinexus" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 rounded-sm bg-primary px-8 text-white hover:opacity-90">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="divide-y divide-white/10 border-y border-white/10">
              {proofPoints.map((point) => (
                <div key={point.value} className="flex items-baseline gap-5 py-5">
                  <dt className="w-24 shrink-0 text-2xl text-white">{point.value}</dt>
                  <dd className="text-sm leading-relaxed text-white/50">{point.label}</dd>
                </div>
              ))}
            </div>
          </motion.dl>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-16"
        >
          <div className="site-hairline-invert overflow-hidden rounded-md">
            <img
              src={dashboardScreenshot}
              alt="Clinexus dashboard showing clinic revenue, appointments and patient records"
              className="w-full"
            />
          </div>
          <figcaption className="mt-3 text-xs text-white/35">
            The Clinexus dashboard: today's schedule, outstanding invoices and clinic revenue on one screen.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};

export default HeroSection;
