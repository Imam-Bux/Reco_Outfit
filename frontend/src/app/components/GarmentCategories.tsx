import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  { name: "Shalwar Kameez", image: "/garments/shalwar-kameez.jpg" },
  { name: "Coat Pant", image: "/garments/coat-pant.jpg" },
  { name: "Sherwani", image: "/garments/sherwani.jpg" },
  { name: "Waistcoat", image: "/garments/waistcoat.jpg" },
  { name: "Safari Suit", image: "/garments/safari-suit.jpg" },
  { name: "Kurta", image: "/garments/kurta.jpg" },
  { name: "Blazer", image: "/garments/blazer.jpg" },
  { name: "Prince Coat", image: "/garments/prince-coat.jpg" },
];

export default function GarmentCategories() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-primary-500" />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary-600">
              Our Craft
            </span>
            <span className="h-px w-10 bg-primary-500" />
          </div>
          <h2 className="text-4xl font-bold text-secondary-900 sm:text-5xl">
            Every Garment, Made to Measure
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.name}
              href="/designs"
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border-2 border-dashed border-primary-500 p-2"
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-secondary-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-secondary-900/10 to-transparent" />
              </div>
              <span className="absolute bottom-5 left-5 text-base font-semibold text-white">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/designs"
            className="inline-flex items-center gap-2 rounded-full border-2 border-secondary-900 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-secondary-900 transition-colors hover:bg-secondary-900 hover:text-primary-500"
          >
            View All Designs
          </Link>
        </div>
      </div>
    </section>
  );
}