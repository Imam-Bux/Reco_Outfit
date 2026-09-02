import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Designs", href: "/designs" },
  { label: "Order", href: "/order" },
  { label: "About", href: "/about" },
];

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a href={href} aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary-700 text-secondary-300 transition-colors hover:border-primary-500 hover:text-primary-500">{children}</a>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.78-1.63 1.58v1.9h2.77l-.44 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-secondary-900">
      <div
        className="h-3 w-full"
        style={{
          backgroundColor: "var(--color-primary-500)",
          backgroundImage:
            "repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 1px, transparent 1px, transparent 20px)",
          backgroundSize: "100% 45%, 100% 100%",
          backgroundPosition: "bottom, bottom",
          backgroundRepeat: "repeat-x, repeat-x",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="text-lg font-semibold tracking-wide text-white">
              RECO
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary-300">
              Bespoke tailoring built around your measurements. From the first
              fitting to every order after, we cut and stitch each piece by
              hand for a fit that stays consistent.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink href="https://facebook.com" label="Facebook">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href="https://instagram.com" label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href="https://wa.me/920000000000" label="WhatsApp">
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              </SocialLink>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-500">
              Navigate
            </p>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-300 transition-colors hover:text-primary-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-500">
              Visit Us
            </p>
            <ul className="space-y-3 text-sm text-secondary-300">
              <li>Main Boulevard, Gulberg</li>
              <li>Lahore, Pakistan</li>
              <li>+92 300 0000000</li>
              <li>hello@recooutfit.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-secondary-800 pt-8 sm:flex-row">
          <p className="text-xs text-secondary-400">
            RECO Outfit 2026. All rights reserved.
          </p>
          <p className="text-xs text-secondary-400">
            Tailored to fit, built to last.
          </p>
        </div>
      </div>
    </footer>
  );
}