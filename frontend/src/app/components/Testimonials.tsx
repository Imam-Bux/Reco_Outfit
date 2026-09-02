import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ahmed Raza",
    garment: "Sherwani",
    quote:
      "The measurements were spot on and the stitching felt like it was made only for me. My sherwani fit perfectly on the first try.",
  },
  {
    name: "Bilal Hussain",
    garment: "Coat Pant",
    quote:
      "I have been ordering my office suits from RECO for two years now. They keep my measurements on file so every order is faster than the last.",
  },
  {
    name: "Usman Tariq",
    garment: "Shalwar Kameez",
    quote:
      "Asked for a custom collar that I could not find anywhere else in the city. The karigars got it right without a single alteration needed.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-secondary-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-primary-500" />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary-600">
              Customer Voices
            </span>
            <span className="h-px w-10 bg-primary-500" />
          </div>
          <h2 className="text-4xl font-bold text-secondary-900 sm:text-5xl">
            Fitted, Finished, Approved
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="flex flex-col rounded-2xl border-2 border-dashed border-primary-500 bg-white p-8"
            >
              <Quote className="mb-4 h-8 w-8 text-primary-500" strokeWidth={1.5} />
              <p className="mb-6 flex-1 text-sm leading-relaxed text-secondary-500">
                {item.quote}
              </p>
              <div className="border-t border-secondary-200 pt-4">
                <p className="text-sm font-semibold text-secondary-900">
                  {item.name}
                </p>
                <p className="text-xs uppercase tracking-widest text-primary-600">
                  {item.garment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}