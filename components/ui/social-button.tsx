"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export function SocialButton({ href, icon, label, className }: SocialButtonProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="w-full">
      <motion.div
        className={cn(
          "flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-white/40 border border-white/50 text-slate-700 font-medium hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-300 group shadow-sm",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="group-hover:scale-110 transition-transform duration-300">{icon}</span>
        <span>{label}</span>
      </motion.div>
    </Link>
  );
}
