import Image from "next/image";
import { Ruler, Award, Clock, Heart } from "lucide-react";

const REASONS = [
  {
    icon: Ruler,
    title: "Precision Measurements",
    desc: "Every measurement is recorded and saved to your profile, so your fit stays consistent order after order.",
  },
  {
    icon: Award,
    title: "Skilled Karigars",
    desc: "Decades of hands-on tailoring experience behind every stitch, cut, and finish.",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    desc: "We commit to your delivery date and keep you updated at every stage of production.",
  },
  {
    icon: Heart,
    title: "Made For You",
    desc: "No mass production. Every garment is cut and stitched specifically for your body and your style.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-secondary-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -top-4 -left-4 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 shadow-lg">
              <span className="text-center text-xs font-bold leading-tight text-secondary-900">
                Since
                <br />
                2026
              </span>
            </div>

            <div className="relative rounded-2xl border-2 border-dashed border-primary-500 p-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
                <Image
                  src="/why-us.jpg"
                  alt="Tailor at work"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500">
                  <Ruler className="h-5 w-5 text-secondary-900" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary-900">A-to-Z</p>
                  <p className="text-xs text-secondary-500">Custom Measurements</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-primary-500" />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary-600">
                Why Choose Us
              </span>
            </div>

            <h2 className="mb-10 text-4xl font-bold leading-tight text-secondary-900 sm:text-5xl">
              Tailored to fit,
              <br />
              built to last
            </h2>

            <div className="space-y-8">
              {REASONS.map((reason) => {
                const Icon = reason.icon;
                return (
                  <div key={reason.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary-500 bg-white">
                      <Icon className="h-5 w-5 text-primary-600" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-secondary-900">
                        {reason.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-secondary-500">
                        {reason.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}