"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  separator?: string;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  separator = ",",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  // Use spring for a natural effect, dumping 100 to avoid oscillations at the end if you want a strict stop,
  // or use a tween if preferred. But spring usually feels better.
  // However, for strict duration control, animate() might be better, but useSpring is nicer for UI.
  // Let's use spring with a duration-like stiffness/damping to approximate control,
  // or simply use `animate` in an effect.
  // Actually, Shadcn/React Bits style usually implies useSpring.
  
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    duration: duration * 1000, 
  });

  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, direction, from, to]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Math.floor(latest)
        );
      }
    });
  }, [springValue, separator]);

  return <span className={className} ref={ref} />;
}
