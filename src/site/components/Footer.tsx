import { Link } from "react-router-dom";
import clinexusLogoWhite from "@/assets/site/clinexus-logo-white.png";

const Footer = () => {
  return (
    <footer className="site-footer border-t border-primary/20 bg-card text-foreground">
      <div className="container py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={clinexusLogoWhite} alt="Clinexus" className="h-9" />
            </div>
            <p className="text-sm text-foreground/70">
              Run a calmer, more profitable clinic, less admin, fewer no-shows, more time for patients.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com/clinexus_ng" target="_blank" rel="noopener noreferrer" className="text-foreground/50 transition-colors hover:text-foreground" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://x.com/clinexus_ng" target="_blank" rel="noopener noreferrer" className="text-foreground/50 transition-colors hover:text-foreground" aria-label="X (Twitter)">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/50">Product</h4>
            <div className="flex flex-col gap-2">
              <Link to="/industries" className="text-sm text-foreground/70 transition-colors hover:text-foreground">Industries</Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/50">Company</h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-foreground/70 transition-colors hover:text-foreground">About</Link>
              <Link to="/contact" className="text-sm text-foreground/70 transition-colors hover:text-foreground">Contact</Link>
              <a href="https://wa.me/2349017758165?text=Hello%20I%20would%20like%20to%20know%20more%20about%20Clinexus" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/70 transition-colors hover:text-foreground">0901 7758 165</a>
              <a href="mailto:support@clinexus.com.ng" className="text-sm text-foreground/70 transition-colors hover:text-foreground">support@clinexus.com.ng</a>
              <span className="text-sm text-foreground/70">Ikeja, Lagos, Nigeria</span>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/50">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-foreground/70 transition-colors hover:text-foreground">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-foreground/70 transition-colors hover:text-foreground">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary/10 pt-8 text-center text-sm text-foreground/50">
          © {new Date().getFullYear()} Clinexus. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
