import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative site-section-tint overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-muted/20" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Your Clinic Could Look Like This Tomorrow
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Imagine knowing exactly what your clinic made today. Appointments running on time. Staff doing their jobs without you chasing anyone. That's Clinexus, from day one.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://wa.me/2349017758165?text=Hello%20I%20would%20like%20to%20know%20more%20about%20Clinexus" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 rounded-md bg-primary px-8 text-white shadow-lg hover:opacity-90">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="/app/login">
              <Button
                size="lg"
                variant="outline"
                className="rounded-sm px-8"
              >
                See It in Action First
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
