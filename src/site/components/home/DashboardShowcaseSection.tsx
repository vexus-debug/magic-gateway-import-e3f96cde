import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import dashboardAsset from "@/assets/current-dashboard/dental-dashboard.png.asset.json";
import patientsAsset from "@/assets/current-dashboard/dental-patients.png.asset.json";
import dentalChartsAsset from "@/assets/current-dashboard/dental-charts.png.asset.json";
import profitabilityAsset from "@/assets/current-dashboard/dental-profitability.png.asset.json";
import treatmentsAsset from "@/assets/current-dashboard/dental-treatments.png.asset.json";
import inventoryAsset from "@/assets/current-dashboard/dental-inventory.png.asset.json";

const dashboard = dashboardAsset.url;
const patients = patientsAsset.url;
const dentalCharts = dentalChartsAsset.url;
const profitability = profitabilityAsset.url;
const treatments = treatmentsAsset.url;
const inventory = inventoryAsset.url;

const highlights = [
  { src: dashboard, label: "Dashboard" },
  { src: patients, label: "Patients" },
  { src: dentalCharts, label: "Dental Charts" },
  { src: profitability, label: "Profitability" },
  { src: treatments, label: "Treatments" },
  { src: inventory, label: "Inventory" },
];

const DashboardShowcaseSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative site-section-tint overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-muted/20" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Real Dashboard
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            This Is What Running a Tight Clinic Looks Like
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            No mockups here, these are real screens from a real clinic running on Clinexus today. Swipe through and see for yourself.
          </p>
        </motion.div>

        {/* Horizontal scroll gallery */}
        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-4 flex gap-5 overflow-x-auto px-4 pb-4 snap-x snap-mandatory"
        >
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex-none snap-center"
            >
              <div className="w-[220px] md:w-[260px]">
                <div className="rounded-[2rem] border-[5px] border-foreground/10 bg-foreground/5 p-1.5">
                  <div className="overflow-hidden rounded-[1.5rem]">
                    <img src={item.src} alt={item.label} className="w-full" loading="lazy" />
                  </div>
                </div>
                <p className="mt-3 text-center text-sm font-semibold text-foreground">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link to="/industries">
            <Button size="lg" className="gap-2 rounded-md bg-primary text-white shadow-lg shadow-primary/30 hover:opacity-90">
              Take the Full Tour <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardShowcaseSection;
