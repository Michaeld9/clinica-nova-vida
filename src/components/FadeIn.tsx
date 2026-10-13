"use client";

import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/clinica";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  /** Anima ao entrar na viewport em vez de ao montar. */
  inView?: boolean;
};

export function FadeIn({ children, className, delay = 0, duration = 0.6, y = 16, scale, inView = false }: FadeInProps) {
  const hidden = { opacity: 0, y: scale === undefined ? y : 0, scale: scale ?? 1 };
  const visible = { opacity: 1, y: 0, scale: 1 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(inView
        ? { whileInView: visible, viewport: { once: true, amount: 0.1 } }
        : { animate: visible })}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
