
import type { Metadata } from "next";

import LeadershipMessages from
  "@/components/public/leadership-messages";

export const metadata: Metadata = {
  title: "School Leadership | Doribabs School Complex",
  description:
    "Meet the leadership of Doribabs School Complex, including the Headteacher, Founder, Proprietress and Board Chair. Read their messages, vision and commitment to quality education.",
  openGraph: {
    title: "Our Leadership | Doribabs School Complex",
    description:
      "Meet the people helping guide the vision, values and educational excellence of Doribabs School Complex.",
    images: [
      {
        url: "/images/school-borad-with-some-tudent-and-teachers-group-pics.jpg",
        alt: "Doribabs School Complex school community",
      },
    ],
  },
};

export default function LeadershipPage() {
  return (
    <main className="overflow-x-hidden bg-white">
      <LeadershipMessages />
    </main>
  );
}
