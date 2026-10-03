import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight, X, ChevronDown, Mail, Phone } from "lucide-react";
import clinexusLogoWhite from "@/assets/site/clinexus-logo-white.png";
import clinexusLogo from "@/assets/site/clinexus-logo.png";

const mobileGroups = [
  {
    label: "Industries",
    items: [
      { label: "All industries", to: "/industries" },
      { label: "Eye clinics", to: "/industries/eye-clinics" },
      { label: "Dental clinics", to: "/industries/dental-clinics" },
    ],
  },
  {
    label: "Tutorials",
    items: [
      { label: "All tutorials", to: "/tutorials" },
      { label: "Eye clinic", to: "/tutorials/eye-clinics" },
      { label: "Dental clinic", to: "/tutorials/dental-clinics" },
    ],
  },
  {
    label: "Features",
    items: [
      { label: "Eye clinic features", to: "/industries/eye-clinics/features" },
      { label: "Dental clinic features", to: "/industries/dental-clinics/features" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Cookie Policy", to: "/cookies" },
    ],
  },
];

const mobileDirect = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Industries", to: "/industries" },
  { label: "Tutorials", to: "/tutorials" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
];

const isDark = (pathname: string) =>
  [
"/",
"/about",
"/contact",
"/industries",
"/privacy",
"/terms",
"/industries/eye-clinics",
"/industries/eye-clinics/features",
  ].includes(pathname);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const darkHero = isDark(location.pathname) && !scrolled;

  const close = () => {
    setOpen(false);
    setOpenGroup(null);
  };

  useEffect(() => {
    close();
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/60 bg-background/90 shadow-sm backdrop-blur-xl"
          : darkHero
          ? "border-b border-white/10 bg-transparent"
          : "border-b border-border/40 bg-background/80 backdrop-blur-md"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={clinexusLogoWhite}
            alt="Clinexus"
            className="h-8 transition-all duration-300"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center md:flex">
          <div className="flex items-center rounded-sm border border-border/50 bg-background/60 px-1 py-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-sm px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? darkHero
                      ? "bg-white/15 text-white shadow-sm"
                      : "bg-primary text-primary-foreground shadow-sm"
                    : darkHero
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <a href="/login">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-sm text-sm font-medium ${
                darkHero ? "text-white/80 hover:text-white hover:bg-white/10" : ""
              }`}
            >
              Log In
            </Button>
          </a>
          <a href="https://wa.me/2349017758165?text=Hello%20I%20would%20like%20to%20know%20more%20about%20Clinexus" target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="gap-1.5 rounded-sm bg-primary px-5 text-white shadow-sm hover:opacity-90"
            >
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden inline-flex h-11 w-11 items-center justify-center rounded-sm border transition-colors ${
            open
              ? "border-border bg-background text-foreground"
              : darkHero
              ? "border-white/20 text-white hover:bg-white/10"
              : "border-border/60 text-foreground hover:bg-muted"
          }`}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile full-screen panel */}
      {open &&
        createPortal(
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="md:hidden fixed inset-x-0 bottom-0 top-16 z-[999] flex flex-col bg-background animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
            <Link to="/" onClick={close} aria-label="Clinexus home">
              <img src={clinexusLogo} alt="Clinexus" className="h-8" />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border/70 text-foreground transition-colors hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-border/60">
              {mobileGroups.map((group) => {
                const expanded = openGroup === group.label;
                return (
                  <div key={group.label}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() =>
                        setOpenGroup(expanded ? null : group.label)
                      }
                      className="flex w-full items-center justify-between px-5 py-5 text-left text-lg font-medium text-foreground transition-colors hover:bg-muted/50"
                    >
                      {group.label}
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expanded && (
                      <div className="flex flex-col pb-3">
                        {group.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            onClick={close}
                            className={`px-5 py-3.5 pl-8 text-base transition-colors ${
                              location.pathname === item.to
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {mobileDirect.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={close}
                  className={`block px-5 py-5 text-lg font-medium transition-colors hover:bg-muted/50 ${
                    location.pathname === link.to
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="space-y-3 border-t border-border/60 px-5 py-6">
              <a
                href="mailto:support@clinexus.com"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                support@clinexus.com
              </a>
              <a
                href="tel:+2349017758165"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                +234 901 775 8165
              </a>
            </div>
          </div>

          <div className="space-y-3 border-t border-border bg-background px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
            <a href="/login" onClick={close} className="block">
              <Button variant="outline" className="h-12 w-full rounded-sm text-base">
                Log In
              </Button>
            </a>
            <a
              href="https://wa.me/2349017758165?text=Hello%20I%20would%20like%20to%20know%20more%20about%20Clinexus"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="block"
            >
              <Button className="h-12 w-full gap-2 rounded-sm bg-primary text-base text-primary-foreground hover:opacity-90">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
