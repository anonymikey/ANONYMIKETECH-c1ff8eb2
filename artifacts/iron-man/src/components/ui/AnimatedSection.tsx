"use client";

import { motion, type Variants } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

type SectionProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & { children: ReactNode };

export function AnimatedSection({ children, className = "" }: SectionProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ children, className = "" }: SectionProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
