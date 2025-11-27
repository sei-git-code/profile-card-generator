"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkillTagProps {
  name: string;
  icon?: React.ReactNode;
  className?: string;
  index?: number;
}

export function SkillTag({ name, icon, className, index = 0 }: SkillTagProps) {
  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 border border-white/50 text-sm font-medium text-slate-700 hover:bg-sky-100 hover:border-sky-300 hover:text-sky-700 transition-all duration-300 cursor-default shadow-sm",
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{name}</span>
    </motion.div>
  );
}
