"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const siteData = {
  businessName: "Fresh Family Daycare",
  primaryCaretaker: "Fereselam Taye",
  phone: "240-515-7494",
  email: "Tayeferey@yahoo.com",
  location: "1664 University Blvd West, Silver Spring MD",
  heroText:
    "A bright, playful, loving place where little ones learn, laugh, and grow.",
  subText:
    "Warm family care, colorful days, and age-appropriate activities for infants and toddlers.",
  infantAvailability: {
    openSpots: 0,
    nextAvailability: "1 Spot, September 2026",
    ageRange: "Under 2 years old",
  },
  toddlerAvailability: {
    openSpots: 2,
    nextAvailability: "Now enrolling",
    ageRange: "2 years old and up",
  },
  aboutBullets: [
    "Small family daycare setting with a warm, personal feel",
    "Colorful play-based learning and daily routine structure",
    "Safe, clean, nurturing environment for infants and toddlers",
    "Focused attention, open communication, and family-centered care",
  ],
  reviews: [
    {
      id: 1,
      title: "Review Screenshot 1",
      image:
        "https://placehold.co/1200x800/png?text=Google+Review+Screenshot+1",
    },
    {
      id: 2,
      title: "Review Screenshot 2",
      image:
        "https://placehold.co/1200x800/png?text=Google+Review+Screenshot+2",
    },
    {
      id: 3,
      title: "Review Screenshot 3",
      image:
        "https://placehold.co/1200x800/png?text=Google+Review+Screenshot+3",
    },
    {
      id: 4,
      title: "Review Screenshot 4",
      image:
        "https://placehold.co/1200x800/png?text=Google+Review+Screenshot+4",
    },
    {
      id: 5,
      title: "Review Screenshot 5",
      image:
        "https://placehold.co/1200x800/png?text=Google+Review+Screenshot+5",
    },
  ],
};

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-pink-100 hover:text-pink-600"
    >
      {children}
    </a>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
  emoji,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  emoji: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-orange-600 shadow-sm">
        <span>{emoji}</span>
        {eyebrow}
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

function AvailabilityCard({
  title,
  openSpots,
  nextAvailability,
  ageRange,
  bgClass,
  badgeClass,
  emoji,
}: {
  title: string;
  openSpots: number;
  nextAvailability: string;
  ageRange: string;
  bgClass: string;
  badgeClass: string;
  emoji: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border-0 ${bgClass} shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:-translate-y-1`}
    >
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/80 p-3 text-2xl shadow-sm">
              {emoji}
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-800">
                {title}
              </h3>
              <p className="text-sm font-medium text-slate-600">{ageRange}</p>
            </div>
          </div>
          <span
            className={`${badgeClass} rounded-full px-4 py-2 text-sm font-bold text-white`}
          >
            Live Status
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] bg-white/85 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Empty spots remaining
            </p>
            <p className="mt-2 text-5xl font-black text-slate-800">
              {openSpots}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white/85 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Next availability
            </p>
            <p className="mt-3 text-2xl font-extrabold text-slate-800">
              {nextAvailability}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  scale,
}: {
  review: { id: number; title: string; image: string };
  scale: number;
}) {
  return (
    <div
      className="transition-all duration-200"
      style={{
        transform: `scale(${scale})`,
        opacity: Math.max(0.45, Math.min(1, scale + 0.05)),
      }}
    >
      <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-pink-100 via-yellow-100 to-sky-100 px-5 py-4">
          <div className="flex items-center gap-2 text-slate-700">
            <span>⭐</span>
            <span className="text-sm font-bold">Parent Review</span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Screenshot
          </span>
        </div>
        <img
          src={review.image}
          alt={review.title}
          className="h-[340px] w-full object-cover sm:h-[420px]"
        />
      </div>
    </div>
  );
}

export default function Page() {
  const reviewRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scales, setScales] = useState<number[]>(
    siteData.reviews.map(() => 0.86)
  );

  useEffect(() => {
    const updateScales = () => {
      const viewportCenter = window.innerHeight / 2;

      const nextScales = siteData.reviews.map((_, index) => {
        const el = reviewRefs.current[index];
        if (!el) return 0.86;

        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - cardCenter);
        const maxDistance = window.innerHeight * 0.7;
        const normalized = Math.min(distance / maxDistance, 1);

        return 1.08 - normalized * 0.28;
      });

      setScales(nextScales);
    };

    updateScales();
    window.addEventListener("scroll", updateScales);
    window.addEventListener("resize", updateScales);

    return () => {
      window.removeEventListener("scroll", updateScales);
      window.removeEventListener("resize", updateScales);
    };
  }, []);

  const floatingDecor = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 5.3) % 95}%`,
    top: `${(i * 13.7) % 100}%`,
    size: 10 + (i % 4) * 7,
    color: [
      "bg-pink-400",
      "bg-yellow-400",
      "bg-sky-400",
      "bg-green-400",
      "bg-orange-400",
      "bg-purple-400",
      "bg-rose-400",
      "bg-cyan-400",
    ][i % 8],
  }));

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100">
              <Image
                src="/fresh-daycare-logo.png"
                alt="Fresh Family Daycare logo"
                width={56}
                height={56}
                className="h-14 w-14 object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-lg font-black leading-none text-green-600">
                Fresh
              </p>
              <p className="text-sm font-bold text-sky-500">Family Daycare</p>
            </div>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About Us</NavLink>
            <NavLink href="#availability">Availability</NavLink>
            <NavLink href="#reviews">Reviews</NavLink>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="relative overflow-hidden">
          <div className="absolute inset-0">
            {floatingDecor.map((dot) => (
              <span
                key={dot.id}
                className={`absolute rounded-full ${dot.color} opacity-70 blur-[1px]`}
                style={{
                  left: dot.left,
                  top: dot.top,
                  width: dot.size,
                  height: dot.size,
                }}
              />
            ))}
          </div>

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-bold text-pink-600 shadow-sm">
                <span>✨</span>
                Playful, colorful, family-centered care
              </div>

              <div className="inline-block rounded-[2.5rem] border-4 border-green-200 bg-white px-8 py-6 shadow-[0_25px_80px_-25px_rgba(0,0,0,0.22)]">
                <div className="mb-2 flex items-center gap-3 text-xl">
                  <span className="rounded-full bg-yellow-200 p-2">☀️</span>
                  <span className="rounded-full bg-green-200 p-2">🌈</span>
                  <span className="rounded-full bg-sky-200 p-2">🧸</span>
                </div>
                <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
                  <span className="text-green-600">Fresh</span>{" "}
                  <span className="text-sky-500">Family</span>{" "}
                  <span className="text-orange-500">Daycare</span>
                </h1>
              </div>

              <p className="mt-8 max-w-xl text-xl font-semibold leading-8 text-slate-700">
                {siteData.heroText}
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                {siteData.subText}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#availability"
                  className="rounded-full bg-pink-500 px-7 py-4 text-base font-bold text-white transition hover:bg-pink-600"
                >
                  Check Availability
                </a>
                <a
                  href="#about"
                  className="rounded-full border-2 border-sky-300 bg-white px-7 py-4 text-base font-bold text-sky-600 transition hover:bg-sky-50"
                >
                  Learn More
                </a>
              </div>

              <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-yellow-50 p-4 shadow-sm">
                  <p className="text-sm font-bold text-yellow-600">Warm care</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Family-style environment
                  </p>
                </div>
                <div className="rounded-2xl bg-sky-50 p-4 shadow-sm">
                  <p className="text-sm font-bold text-sky-600">
                    Playful learning
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Fun, colorful activities
                  </p>
                </div>
                <div className="rounded-2xl bg-green-50 p-4 shadow-sm">
                  <p className="text-sm font-bold text-green-600">Open spots</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Infants and toddlers
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="relative mx-auto max-w-xl">
                <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-pink-200 blur-2xl" />
                <div className="absolute -right-8 top-10 h-28 w-28 rounded-full bg-yellow-200 blur-2xl" />
                <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full bg-sky-200 blur-2xl" />

                <div className="relative overflow-hidden rounded-[2.5rem] border-0 bg-white shadow-[0_25px_90px_-30px_rgba(0,0,0,0.24)]">
                  <div className="p-8 sm:p-10">
                    <div className="rounded-[2rem] bg-gradient-to-br from-green-100 via-white to-yellow-100 p-8">
                      <div className="mx-auto max-w-md rounded-[2rem] border-4 border-green-200 bg-white p-8 text-center shadow-sm">
                        <div className="mb-4 flex justify-center gap-3 text-2xl">
                          <span className="rounded-full bg-yellow-200 p-3">
                            ☀️
                          </span>
                          <span className="rounded-full bg-pink-200 p-3">
                            💖
                          </span>
                          <span className="rounded-full bg-sky-200 p-3">
                            🧸
                          </span>
                        </div>
                        <h3 className="text-4xl font-black leading-tight">
                          <span className="text-green-600">Fresh</span>{" "}
                          <span className="text-sky-500">Family</span>{" "}
                          <span className="text-orange-500">Daycare</span>
                        </h3>
                        <p className="mt-4 text-base font-medium leading-7 text-slate-600">
                          Loving care, colorful days, and happy little learners.
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-3">
                          <span className="rounded-full bg-green-500 px-4 py-2 text-white">
                            Infants
                          </span>
                          <span className="rounded-full bg-orange-500 px-4 py-2 text-white">
                            Toddlers
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-pink-50 p-4 text-center">
                        <div className="text-2xl">👶</div>
                        <p className="mt-2 text-sm font-bold text-slate-700">
                          Gentle care
                        </p>
                      </div>
                      <div className="rounded-2xl bg-yellow-50 p-4 text-center">
                        <div className="text-2xl">🧩</div>
                        <p className="mt-2 text-sm font-bold text-slate-700">
                          Play time
                        </p>
                      </div>
                      <div className="rounded-2xl bg-sky-50 p-4 text-center">
                        <div className="text-2xl">💚</div>
                        <p className="mt-2 text-sm font-bold text-slate-700">
                          Family feel
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              emoji="🌈"
              eyebrow="About Us"
              title="A cheerful place where little ones feel safe, loved, and excited to learn"
              subtitle={`Fresh Family Daycare is designed to feel bright, welcoming, and personal, with care led by ${siteData.primaryCaretaker}. This section can be customized with your real story, teaching style, schedule, certifications, and daily routine.`}
            />

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[2rem] border-0 bg-gradient-to-br from-pink-50 via-white to-yellow-50 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.18)]">
                <div className="p-8 sm:p-10">
                  <h3 className="text-2xl font-extrabold text-slate-800">
                    Why families choose us
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    We blend nurturing family care with playful routines,
                    colorful learning, and personal attention. Children get a
                    safe and loving environment while parents get clear
                    communication and peace of mind.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {siteData.aboutBullets.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-[1.5rem] bg-white p-5 shadow-sm"
                      >
                        <div className="mt-1 rounded-full bg-green-100 p-2 text-green-600">
                          💚
                        </div>
                        <p className="text-sm font-medium leading-6 text-slate-700">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="rounded-[2rem] border-0 bg-sky-50 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.18)]">
                  <div className="p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-2xl bg-white p-3 text-xl shadow-sm">
                        ⏰
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-800">
                        Daily rhythm
                      </h3>
                    </div>
                    <p className="text-base leading-7 text-slate-600">
                      Add your daily schedule here, such as morning drop-off,
                      circle time, meals, nap time, outdoor play, and pickup.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] border-0 bg-yellow-50 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.18)]">
                  <div className="space-y-4 p-8">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-white p-3 text-xl shadow-sm">
                        👩‍👧
                      </div>
                      <p className="font-semibold text-slate-700">
                        Primary Caretaker: {siteData.primaryCaretaker}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-white p-3 text-xl shadow-sm">
                        📞
                      </div>
                      <p className="font-semibold text-slate-700">
                        {siteData.phone}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-white p-3 text-xl shadow-sm">
                        ✉️
                      </div>
                      <p className="font-semibold text-slate-700">
                        {siteData.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-white p-3 text-xl shadow-sm">
                        📍
                      </div>
                      <p className="font-semibold text-slate-700">
                        {siteData.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="availability"
          className="bg-gradient-to-b from-white to-emerald-50 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              emoji="👶"
              eyebrow="Current Availability"
              title="See open spots for infants and toddlers"
              subtitle="This section is built so you can update your current openings as they change. Edit the values at the top of the file to keep the website current."
            />

            <div className="grid gap-8 lg:grid-cols-2">
              <AvailabilityCard
                title="Infants"
                emoji="👶"
                openSpots={siteData.infantAvailability.openSpots}
                nextAvailability={siteData.infantAvailability.nextAvailability}
                ageRange={siteData.infantAvailability.ageRange}
                bgClass="bg-gradient-to-br from-pink-100 via-white to-rose-100"
                badgeClass="bg-pink-500"
              />

              <AvailabilityCard
                title="Toddlers"
                emoji="🧸"
                openSpots={siteData.toddlerAvailability.openSpots}
                nextAvailability={siteData.toddlerAvailability.nextAvailability}
                ageRange={siteData.toddlerAvailability.ageRange}
                bgClass="bg-gradient-to-br from-yellow-100 via-white to-orange-100"
                badgeClass="bg-orange-500"
              />
            </div>
          </div>
        </section>

        <section id="reviews" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              emoji="⭐"
              eyebrow="Reviews"
              title="Parent reviews that grow as they reach the center of the screen"
              subtitle="Replace these placeholder images with your Google review screenshots. The card closest to the center of the screen grows larger while the others shrink."
            />

            <div className="mx-auto flex max-w-3xl flex-col gap-10">
              {siteData.reviews.map((review, index) => (
                <div
                  key={review.id}
                  ref={(el) => {
                    reviewRefs.current[index] = el;
                  }}
                >
                  <ReviewCard review={review} scale={scales[index] ?? 0.86} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-center sm:px-6 lg:px-8">
          <div className="flex justify-center gap-2">
            <span className="h-3 w-3 rounded-full bg-pink-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-sky-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="h-3 w-3 rounded-full bg-orange-400" />
          </div>
          <p className="text-lg font-black">
            <span className="text-green-600">Fresh</span>{" "}
            <span className="text-sky-500">Family</span>{" "}
            <span className="text-orange-500">Daycare</span>
          </p>
          <p className="text-sm text-slate-500">
            Colorful care, happy hearts, and room to grow.
          </p>
        </div>
      </footer>
    </div>
  );
}
