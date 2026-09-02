import Link from "next/link";
import { Scissors } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-secondary-900 py-20">
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg
          className="h-full w-full"
          viewBox="0 0 800 200"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="100"
            x2="800"
            y2="100"
            stroke="var(--color-primary-500)"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-500">
            <Scissors className="h-6 w-6 text-secondary-900" strokeWidth={1.75} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Your Fit, Your Fabric, Your Rules
            </h2>
            <p className="mt-2 max-w-md text-secondary-300">
              Share your measurements once and order tailored pieces whenever you need them.
            </p>
          </div>
        </div>

        <Link
          href="/order"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-500 px-8 py-4 text-base font-semibold text-secondary-900 shadow-lg transition-transform hover:scale-105 hover:bg-primary-400"
        >
          Order Now
        </Link>
      </div>
    </section>
  );
}