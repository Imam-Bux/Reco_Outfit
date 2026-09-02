import Image from "next/image";
import { Scissors } from "lucide-react";

export default function About() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-primary-500" />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary-600">
                About RECO Outfit
              </span>
            </div>

            <h2 className="mb-6 text-4xl font-bold leading-tight text-secondary-900 sm:text-5xl">
              A tailoring house built on measurements that never lie
            </h2>

            <p className="mb-4 text-sm leading-relaxed text-secondary-500">
              RECO Outfit started as a single cutting table and a promise: every
              garment leaves the shop fitting exactly as it should. That promise
              has not changed since, even as the shop has grown.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-secondary-500">
              Every customer profile is kept on file, from the first chest
              measurement to the smallest alteration note, so returning for a
              new order never means starting over. Our karigars cut and stitch
              each piece by hand, and nothing leaves the workshop until it
              passes a final fit check.
            </p>

            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-3xl font-bold text-secondary-900">15+</p>
                <p className="text-sm text-secondary-500">Years Tailoring</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary-900">8,000+</p>
                <p className="text-sm text-secondary-500">Garments Delivered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary-900">12</p>
                <p className="text-sm text-secondary-500">Karigars On Staff</p>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-4 -right-4 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 shadow-lg">
              <Scissors className="h-6 w-6 text-secondary-900" strokeWidth={1.75} />
            </div>

            <div className="relative rounded-2xl border-2 border-dashed border-primary-500 p-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
                <Image
                  src="/about-workshop.jpg"
                  alt="RECO Outfit workshop"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}