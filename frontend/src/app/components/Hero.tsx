"use client";
import Image from "next/image";
import Link from "next/link";
import HeroImages from "../Data/Data";

export default function Hero() {
  return (
    <section className="relative flex h-[90vh] w-full items-center overflow-hidden bg-secondary-900">
      {HeroImages.map((src, i) => (
        <div
          key={i}
          className="hero-slide absolute inset-0"
          style={{ animationDelay: `${i * 5}s` }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-secondary-900/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/60 via-secondary-900/30 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-primary-500" />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary-400">
              Bespoke Tailoring
            </span>
          </div>

          <p className="mb-2 text-lg font-medium text-white/90">
            Want your clothes to look best?
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl">
            RECO Outfit,
            <br />
            <span className="text-primary-500">the best fit</span>
          </h1>

          <div className="mb-8 flex items-center gap-3">
            <svg
              width="120"
              height="10"
              viewBox="0 0 120 10"
              fill="none"
              className="text-primary-500"
            >
              <line
                x1="0"
                y1="5"
                x2="120"
                y2="5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          <Link
            href="/order"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-4 text-base font-semibold text-secondary-900 shadow-lg transition-transform hover:scale-105 hover:bg-primary-400"
          >
            Order Now
          </Link>
        </div>
      </div>
    </section>
  );
}