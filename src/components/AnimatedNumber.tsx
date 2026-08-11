import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, animate } from 'motion/react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  format?: (value: number) => string;
}

export function AnimatedNumber({ value, duration = 1.2, className = "", format }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, value, motionValue, duration]);

  useEffect(() => {
    return motionValue.on("change", (latest) => {
      if (ref.current) {
        const rounded = Math.round(latest);
        ref.current.textContent = format ? format(rounded) : rounded.toString();
      }
    });
  }, [motionValue, format]);

  return <span ref={ref} className={className}>0</span>;
}
