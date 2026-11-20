
"use client";

import type { ReactNode } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

type SiteTemplateProps = {
  children: ReactNode;
};

export default function SiteTemplate({
  children,
}: SiteTemplateProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 12,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
