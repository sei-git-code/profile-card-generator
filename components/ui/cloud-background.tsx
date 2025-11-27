
"use client";

import { Theme } from "@/components/ui/theme-selector";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CloudBackground({ theme = "sky" }: { theme?: Theme }) {
  const [clouds, setClouds] = useState<any[]>([]);

  const gradients = {
    sky: "from-sky-300 via-sky-400 to-blue-500",
    sunset: "from-orange-300 via-pink-400 to-purple-600",
    midnight: "from-indigo-900 via-purple-900 to-slate-900",
    forest: "from-emerald-400 via-teal-500 to-green-700",
    cotton_candy: "from-pink-200 via-purple-200 to-blue-200",
    lavender: "from-violet-200 via-purple-300 to-indigo-400",
    mint: "from-teal-100 via-emerald-200 to-green-300",
    peach: "from-orange-100 via-rose-200 to-pink-300",
    ocean: "from-cyan-500 via-blue-600 to-indigo-800",
    pixel: "bg-slate-950",
  };

  const cloudColors = {
    sky: "bg-white",
    sunset: "bg-orange-50",
    midnight: "bg-indigo-200/20",
    forest: "bg-green-50",
    cotton_candy: "bg-white",
    lavender: "bg-purple-50",
    mint: "bg-emerald-50",
    peach: "bg-rose-50",
    ocean: "bg-cyan-50",
    pixel: "bg-green-500", // Pixel color
    aurora: "bg-white/20",
    grid: "bg-transparent",
  };

  useEffect(() => {
    const newClouds = [...Array(6)].map((_, i) => ({
      id: i,
      initial: {
        x: Math.random() * 100 - 50 + "%",
        y: Math.random() * 100 - 50 + "%",
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.2,
      },
      animate: {
        x: [
          Math.random() * 100 - 50 + "%",
          Math.random() * 100 - 50 + "%",
          Math.random() * 100 - 50 + "%",
        ],
        y: [
          Math.random() * 100 - 50 + "%",
          Math.random() * 100 - 50 + "%",
          Math.random() * 100 - 50 + "%",
        ],
      },
      transition: {
        duration: Math.random() * 20 + 20,
        repeat: Infinity,
        ease: theme === "pixel" ? "linear" : "easeInOut",
      },
      style: {
        width: theme === "pixel" ? `${Math.random() * 40 + 20}px` : `${Math.random() * 400 + 200}px`,
        height: theme === "pixel" ? `${Math.random() * 40 + 20}px` : `${Math.random() * 400 + 200}px`,
      }
    }));
    setClouds(newClouds);
  }, [theme]);

  // Grid pattern for pixel theme
  const GridPattern = () => (
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(to right, #22c55e 1px, transparent 1px),
                         linear-gradient(to bottom, #22c55e 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    />
  );

  const gridBgUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC";

  return (
    <div className={cn(
      "fixed inset-0 -z-10 overflow-hidden transition-colors duration-700",
      theme === "pixel" ? gradients.pixel : 
      theme === "aurora" ? "animate-aurora bg-[linear-gradient(-45deg,#ee7752,#e73c7e,#23a6d5,#23d5ab)] bg-[length:400%_400%]" :
      theme === "grid" ? "animate-scrolling-grid bg-slate-900" :
      `bg-gradient-to-br ${gradients[theme]}`
    )}
    style={theme === "grid" ? {
      backgroundImage: `url(${gridBgUrl})`,
      backgroundRepeat: 'repeat',
      backgroundPosition: '0 0'
    } : undefined}
    >
      {theme === "pixel" && <GridPattern />}
      
      {/* Animated Clouds / Pixels */}
      {theme !== "grid" && (
        <div className="absolute inset-0 opacity-60">
          {clouds.map((cloud) => (
            <motion.div
              key={cloud.id}
              className={cn(
                "absolute",
                theme === "pixel" ? "rounded-none" : "rounded-full blur-3xl",
                cloudColors[theme]
              )}
              initial={cloud.initial}
              animate={cloud.animate}
              transition={cloud.transition}
              style={cloud.style}
            />
          ))}
        </div>
      )}
    </div>
  );
}
