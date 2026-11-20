
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bus,
  Camera,
  CheckCircle2,
  Droplets,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  MapPin,
  Monitor,
  School,
  ShieldCheck,
  Sparkles,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import Reveal from "@/components/animation/Reveal";

import FacilitiesHeroCarousel from
  "@/components/public/facilities-hero-carousel";

// ======================================================
// METADATA
// ======================================================

export const metadata: Metadata = {
  title: "School Facilities | Doribabs School Complex",
  description:
    "Explore facilities at Doribabs School Complex, including our ICT centre, science laboratory, classrooms, library, playground, assembly hall, dining facilities and school transportation.",
  openGraph: {
    title: "Facilities | Doribabs School Complex",
    description:
      "Explore the learning and support facilities available to the Doribabs school community.",
    images: [
      {
        url: "/images/school-building-and-compound4.jpg",
        alt: "Doribabs School Complex campus",
      },
    ],
  },
};

// ======================================================
// REUSABLE PHOTOGRAPH
// ======================================================

type PhotoTileProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
};

function PhotoTile({
  src,
  alt,
  caption,
  className = "",
  sizes = "(max-width: 1024px) 50vw, 25vw",
}: PhotoTileProps) {
  return (
    <div
      className={`group relative isolate overflow-hidden rounded-2xl bg-slate-100 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {caption && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

          <p className="absolute bottom-4 left-4 right-4 text-sm font-extrabold text-white sm:text-base">
            {caption}
          </p>
        </>
      )}
    </div>
  );
}

// ======================================================
// FEATURED ACADEMIC FACILITIES
// ======================================================

const academicFacilities = [
  {
    id: "ict-centre",
    eyebrow: "Technology & Digital Learning",
    title: "Computer Laboratory",
    subtitle: "Our ICT Centre",
    icon: Monitor,
    description:
      "The Doribabs ICT Centre provides learners with opportunities to develop essential computer skills and digital literacy. It supports technology-based learning and prepares learners to participate confidently in a digitally connected world.",
    benefits: [
      "Developing computer skills",
      "Building digital literacy",
      "Supporting technology-based learning",
    ],
    photos: [
      {
        src: "/images/computer-lab1.jpg",
        alt: "Doribabs computer laboratory",
        caption: "Computer Learning",
      },
      {
        src: "/images/computer-lab4.jpeg",
        alt: "Learners using the Doribabs ICT centre",
        caption: "Digital Literacy",
      },
      {
        src: "/images/computer-lab7.jpg",
        alt: "Computer studies at Doribabs",
        caption: "ICT Activities",
      },
      {
        src: "/images/computer-lab10.jpeg",
        alt: "Doribabs computer learning environment",
        caption: "Technology in Education",
      },
    ],
  },
  {
    id: "science-laboratory",
    eyebrow: "Practical Learning & Discovery",
    title: "Science Laboratory",
    subtitle: "Discovering Through Experimentation",
    icon: FlaskConical,
    description:
      "Our science laboratory provides opportunities for practical learning and experimentation. It helps learners develop scientific understanding, curiosity and problem-solving skills by connecting classroom knowledge with practical experiences.",
    benefits: [
      "Practical scientific learning",
      "Developing curiosity and understanding",
      "Strengthening problem-solving skills",
    ],
    photos: [
      {
        src: "/images/science-lab-section10.jpg",
        alt: "Science laboratory activities at Doribabs",
        caption: "Practical Science",
      },
      {
        src: "/images/science-lab-section14.jpeg",
        alt: "Learners participating in science activities",
        caption: "Scientific Discovery",
      },
      {
        src: "/images/science-lab-section15.jpeg",
        alt: "Doribabs science learning activities",
        caption: "Experimentation",
      },
      {
        src: "/images/science-lab-section16.jpg",
        alt: "Doribabs science laboratory learning",
        caption: "Learning by Doing",
      },
    ],
  },
] as const;

// ======================================================
// EVERYDAY SCHOOL SPACES
// ======================================================

const everydaySpaces = [
  {
    title: "Classrooms",
    subtitle: "Teaching & Learning",
    description:
      "Our classrooms are designed to support effective teaching, active participation and meaningful interaction between teachers and learners.",
    image: "/images/exams-preparation2.jpeg",
    alt: "Doribabs learners engaged in academic work",
    icon: GraduationCap,
  },
  {
    title: "Playground",
    subtitle: "Sports & Recreation",
    description:
      "The school playground provides space for recreation, physical activity, social interaction and teamwork among learners.",
    image: "/images/games-and-fun7.jpg",
    alt: "Doribabs learners taking part in games",
    icon: Sparkles,
  },
  {
    title: "Assembly Hall",
    subtitle: "Gatherings & Events",
    description:
      "Our assembly hall serves as a venue for school gatherings, assemblies, worship, meetings, celebrations and important events.",
    image: "/images/assembly1.jpeg",
    alt: "A school assembly at Doribabs School Complex",
    icon: Users,
  },
  {
    title: "Dining Hall",
    subtitle: "Meals & Daily Life",
    description:
      "Our dining facility provides a designated space where learners enjoy their meals in a clean, organised and comfortable environment.",
    image: "/images/student-at-dinning-hall-1.jpg",
    alt: "Learners at the Doribabs dining hall",
    icon: UtensilsCrossed,
  },
] as const;

// ======================================================
// SUPPORT FACILITIES
// ======================================================

const supportFacilities = [
  {
    title: "School Library",
    description:
      "Access to educational books and learning materials encourages reading, independent study, research and the development of knowledge.",
    icon: BookOpen,
  },
  {
    title: "Staff Room",
    description:
      "A dedicated space for teachers and educational staff to prepare lessons, collaborate and carry out professional activities.",
    icon: Users,
  },
  {
    title: "Sick Bay / Infirmary",
    description:
      "A designated space for basic first aid and temporary care for learners who become unwell during school hours.",
    icon: HeartPulse,
  },
  {
    title: "Washrooms & Sanitation",
    description:
      "Washroom and sanitation facilities support hygiene, cleanliness and a healthy school environment.",
    icon: Droplets,
  },
  {
    title: "School Transportation",
    description:
      "Transport arrangements support learners' movement to and from school, subject to the school's transportation arrangements.",
    icon: Bus,
  },
] as const;

// ======================================================
// FACILITIES PHOTO COLLECTION
// ======================================================

const galleryPhotos = [
  {
    src: "/images/school-building-and-compound1.jpg",
    alt: "School buildings at Doribabs School Complex",
    caption: "Our Campus",
  },
  {
    src: "/images/computer-lab3.jpeg",
    alt: "Doribabs ICT learning environment",
    caption: "ICT Centre",
  },
  {
    src: "/images/science-lab-section12.jpg",
    alt: "Science laboratory activities at Doribabs",
    caption: "Science Laboratory",
  },
  {
    src: "/images/games-and-fun9.jpg",
    alt: "Doribabs school games and recreational activities",
    caption: "Recreation",
  },
  {
    src: "/images/student-at-dinning-hall-2.jpg",
    alt: "Learners at the Doribabs dining hall",
    caption: "Dining",
  },
  {
    src: "/images/school-building-and-compound3.jpg",
    alt: "Doribabs campus building",
    caption: "School Environment",
  },
  {
    src: "/images/computer-lab8.jpeg",
    alt: "Doribabs computer laboratory learning",
    caption: "Digital Learning",
  },
  {
    src: "/images/science-lab-section19.jpg",
    alt: "Practical science learning at Doribabs",
    caption: "Discovery",
  },
] as const;

// ======================================================
// FACILITIES PAGE
// ======================================================

export default function FacilitiesPage() {
  return (
    <main className="overflow-x-hidden bg-white">

      {/* ==================================================
          1. ANIMATED HERO
          ================================================== */}

      <FacilitiesHeroCarousel />

      {/* ==================================================
          2. FACILITIES INTRODUCTION
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <School size={18} />
                Welcome to Our Campus
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                An Environment
                <span className="mt-2 block text-[#176B49]">
                  Built for Learning
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                At Doribabs School Complex, our
                school facilities support academic
                excellence, practical learning,
                recreation and the general welfare
                of our learners and staff.
              </p>

              <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                From classrooms and specialised
                learning spaces to recreational,
                dining and support facilities,
                the campus provides an environment
                for teaching, learning and
                personal development.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Academic learning and development",
                  "Practical science and digital literacy",
                  "Recreation, activities and teamwork",
                  "Learner welfare and daily support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-1 shrink-0 text-[#176B49]"
                    />

                    <p className="text-sm font-semibold leading-7 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/contact#visit-school"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
              >
                Find Our School
                <MapPin size={18} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <PhotoTile
                src="/images/school-building-and-compound4.jpg"
                alt="Doribabs school buildings and grounds"
                caption="School Campus"
                className="col-span-2 aspect-[16/10]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <PhotoTile
                src="/images/random-students-picture4.jpg"
                alt="Learners at Doribabs School Complex"
                caption="School Community"
                className="aspect-[4/3]"
              />

              <PhotoTile
                src="/images/school-building-and-compound2.jpg"
                alt="Doribabs school compound photograph"
                caption="Our Environment"
                className="aspect-[4/3]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          3. CAMPUS AND SCHOOL BUILDINGS
          ================================================== */}

      <section className="bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                Our School Environment
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Explore Our Campus
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                Our school buildings and compound
                provide a welcoming and organised
                environment for academic activities,
                interaction and school life.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <PhotoTile
                src="/images/sky-shot-of-school-prepater-and-student.jpg"
                alt="Doribabs school premises"
                caption="The Doribabs Environment"
                className="aspect-[16/10] lg:h-full lg:aspect-auto"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </Reveal>

            <div className="grid grid-cols-2 gap-4 lg:col-span-5">
              <Reveal className="col-span-2">
                <PhotoTile
                  src="/images/school-building-and-compound1.jpg"
                  alt="Doribabs school buildings"
                  caption="School Buildings"
                  className="aspect-[16/8]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </Reveal>

              <Reveal delay={0.07}>
                <PhotoTile
                  src="/images/school-building-and-compound3.jpg"
                  alt="Doribabs school compound"
                  className="aspect-[4/3]"
                />
              </Reveal>

              <Reveal delay={0.12}>
                <PhotoTile
                  src="/images/school-borad-with-some-tudent-group-pics2.jpg"
                  alt="Doribabs school community"
                  className="aspect-[4/3]"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. CORE ACADEMIC FACILITIES
          ================================================== */}

      <section
        id="explore-facilities"
        className="scroll-mt-28 bg-white px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                Learning Spaces
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Facilities for Discovery
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                Our specialised learning environments
                help learners develop practical
                knowledge, scientific understanding
                and important digital skills.
              </p>
            </div>
          </Reveal>

          <div className="space-y-24 lg:space-y-32">
            {academicFacilities.map((facility, index) => {
              const Icon = facility.icon;

              return (
                <div
                  key={facility.id}
                  id={facility.id}
                  className="scroll-mt-28 grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Four-photo collage */}
                  <Reveal
                    className={
                      index % 2 === 1
                        ? "lg:order-2"
                        : ""
                    }
                  >
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {facility.photos.map(
                        (photo, photoIndex) => (
                          <PhotoTile
                            key={photo.src}
                            src={photo.src}
                            alt={photo.alt}
                            caption={photo.caption}
                            className={`${
                              photoIndex === 0
                                ? "col-span-2 aspect-[16/9]"
                                : photoIndex === 3
                                ? "hidden"
                                : "aspect-[4/3]"
                            }`}
                            sizes="(max-width: 1024px) 50vw, 25vw"
                          />
                        )
                      )}
                    </div>

                    {/* Fourth image below the collage */}
                    <div className="mt-3 sm:mt-4">
                      <PhotoTile
                        src={facility.photos[3].src}
                        alt={facility.photos[3].alt}
                        caption={facility.photos[3].caption}
                        className="aspect-[16/6]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </Reveal>

                  {/* Content */}
                  <Reveal
                    delay={0.1}
                    className={
                      index % 2 === 1
                        ? "lg:order-1"
                        : ""
                    }
                  >
                    <div>
                      <div className="flex h-15 w-15 items-center justify-center rounded-2xl bg-[#EAF5EE] text-[#176B49]">
                        <Icon size={29} />
                      </div>

                      <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                        {facility.eyebrow}
                      </p>

                      <h3 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                        {facility.title}
                      </h3>

                      <p className="mt-4 text-lg font-bold text-[#176B49]">
                        {facility.subtitle}
                      </p>

                      <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                        {facility.description}
                      </p>

                      <div className="mt-8 space-y-4 rounded-2xl border border-green-100 bg-[#F8FBF8] p-6">
                        {facility.benefits.map(
                          (benefit) => (
                            <div
                              key={benefit}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle2
                                size={19}
                                className="mt-1 shrink-0 text-[#176B49]"
                              />

                              <span className="text-sm font-semibold leading-7 text-slate-700">
                                {benefit}
                              </span>
                            </div>
                          )
                        )}
                      </div>

                      <Link
                        href="/academics"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
                      >
                        Explore Our Academics
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          5. EVERYDAY SCHOOL FACILITIES
          ================================================== */}

      <section className="bg-[#FFF8F0] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">
                Everyday School Life
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Supporting Every School Day
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                Classrooms, recreation, dining and
                assembly facilities provide spaces
                for the daily experiences that make
                up life at Doribabs.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {everydaySpaces.map((space, index) => {
              const Icon = space.icon;

              return (
                <Reveal
                  key={space.title}
                  delay={index * 0.08}
                  className="h-full"
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <Image
                        src={space.image}
                        alt={space.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-7 sm:p-9">
                      <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#EAF5EE] text-[#176B49]">
                        <Icon size={25} />
                      </div>

                      <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.15em] text-orange-600">
                        {space.subtitle}
                      </p>

                      <h3 className="mt-3 text-2xl font-extrabold text-slate-950">
                        {space.title}
                      </h3>

                      <p className="mt-4 text-sm leading-8 text-slate-600">
                        {space.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          6. OTHER FACILITIES AND SERVICES
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <ShieldCheck size={18} />
                Supporting Our Learners
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Additional Facilities
                <span className="block text-[#176B49]">
                  & Support Services
                </span>
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                The school also maintains facilities
                that support reading, staff activities,
                learner wellbeing, sanitation and
                transportation.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {supportFacilities.map((facility, index) => {
              const Icon = facility.icon;

              return (
                <Reveal
                  key={facility.title}
                  delay={Math.min(index * 0.06, 0.24)}
                  className="h-full"
                >
                  <article className="h-full rounded-2xl border border-slate-100 bg-[#F8FAF8] p-7 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF5EE] text-[#176B49]">
                      <Icon size={27} />
                    </div>

                    <h3 className="mt-6 text-xl font-extrabold text-slate-950">
                      {facility.title}
                    </h3>

                    <p className="mt-4 text-sm leading-8 text-slate-600">
                      {facility.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-10 rounded-2xl border-l-4 border-[#F4A43C] bg-[#FFF8F0] p-6 sm:p-8">
              <p className="text-sm leading-8 text-slate-700">
                For additional information about
                particular facilities, availability
                or school transportation arrangements,
                parents and guardians are encouraged
                to contact the school administration.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#176B49]"
              >
                Contact the School
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          7. PHOTO GALLERY
          ================================================== */}

      <section className="bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                  <Camera size={18} />
                  Captured at Doribabs
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  Our Facilities in Pictures
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600">
                  Explore more photographs of
                  the Doribabs environment,
                  practical learning and
                  daily school experiences.
                </p>
              </div>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#176B49] transition hover:gap-3"
              >
                View Full Gallery
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {galleryPhotos.map((photo, index) => (
              <Reveal
                key={photo.src}
                delay={Math.min(index * 0.05, 0.25)}
                className={index < 2 ? "col-span-2" : ""}
              >
                <PhotoTile
                  src={photo.src}
                  alt={photo.alt}
                  caption={photo.caption}
                  className="aspect-[4/3]"
                  sizes={
                    index < 2
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 640px) 50vw, 25vw"
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          8. VISIT AND ADMISSIONS CTA
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] px-5 py-20 text-white sm:px-8 lg:py-28">
        <Image
          src="/images/school-borad-with-some-tudent-and-teachers-group-pics.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#071C12]/85" />

        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-[#FFCA75]">
              <School size={17} />
              Experience Doribabs
            </span>

            <h2 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Come Discover
              <span className="mt-2 block text-[#F4A43C]">
                Our School.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              Explore the facilities, learning
              programmes and school community
              that make Doribabs School Complex
              a place for educational and
              personal development.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-7 py-4 text-sm font-extrabold text-[#103D2C] transition hover:bg-[#FFCA75]"
              >
                Explore Admissions
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/contact#visit-school"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Find Our Location
                <MapPin size={18} />
              </Link>
            </div>

            <p className="mt-10 text-sm font-semibold italic text-[#FFCA75]">
              Doribabs... Seeing Is Believing!
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
