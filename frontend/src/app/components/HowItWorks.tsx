import { Ruler, Scissors, ShieldCheck, PackageCheck } from "lucide-react";

const STEPS = [
  {
    icon: Ruler,
    title: "Share Your Measurements",
    desc: "Visit us or fill our measurement form. We save your profile so future orders are even faster.",
  },
  {
    icon: Scissors,
    title: "We Cut & Stitch",
    desc: "Your fabric is cut and stitched by hand by skilled karigars, following your exact design and instructions.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Check",
    desc: "Every piece is inspected for fit and finish before it leaves our workshop.",
  },
  {
    icon: PackageCheck,
    title: "Ready for Pickup",
    desc: "We notify you the moment your order is ready, stitched to perfection and on time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-primary-500" />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary-600">
              Our Process
            </span>
            <span className="h-px w-10 bg-primary-500" />
          </div>
          <h2 className="text-4xl font-bold text-secondary-900 sm:text-5xl">
            How It Works
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <svg
            className="pointer-events-none absolute top-8 left-0 hidden w-full lg:block"
            height="2"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="1"
              x2="1000"
              y2="1"
              stroke="var(--color-secondary-200)"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
          </svg>

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 shadow-md">
                  <Icon className="h-7 w-7 text-secondary-900" strokeWidth={1.75} />
                </div>

                <span className="mb-2 text-xs font-bold uppercase tracking-widest text-primary-600">
                  Step {i + 1}
                </span>

                <h3 className="mb-2 text-lg font-semibold text-secondary-900">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-secondary-500">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}