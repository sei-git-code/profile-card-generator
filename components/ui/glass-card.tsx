"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-md shadow-xl shadow-sky-900/5",
        hoverEffect && "hover:bg-white/70 transition-colors duration-300",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
