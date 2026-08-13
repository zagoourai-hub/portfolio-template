"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Use spring for a smoother, physics-based progress bar animation
  const scaleX = useSpring(scrollYProgress, {
    damping: 30,
    restDelta: 0.001,
    stiffness: 200,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] z-50"
      style={{
        scaleX,
        transformOrigin: "0%",
      }}
    />
  );
}
