"use client";

import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type Theme = "sky" | "sunset" | "midnight" | "forest" | "cotton_candy" | "lavender" | "mint" | "peach" | "ocean" | "pixel" | "aurora" | "grid";

interface ThemeSelectorProps {
  value?: Theme;
  onChange: (value: Theme) => void;
}

export function ThemeSelector({ value = "sky", onChange }: ThemeSelectorProps) {
  const { t } = useLanguage();

  const themes: { id: Theme; label: string; gradient: string }[] = [
    { 
      id: "sky", 
      label: t.themes.sky, 
      gradient: "from-sky-400 to-blue-500" 
    },
    { 
      id: "sunset", 
      label: t.themes.sunset, 
      gradient: "from-orange-400 to-purple-600" 
    },
    { 
      id: "midnight", 
      label: t.themes.midnight, 
      gradient: "from-indigo-900 to-slate-900" 
    },
    { 
      id: "forest", 
      label: t.themes.forest, 
      gradient: "from-emerald-500 to-teal-700" 
    },
    { 
      id: "cotton_candy", 
      label: t.themes.cotton_candy, 
      gradient: "from-pink-300 to-blue-300" 
    },
    { 
      id: "lavender", 
      label: t.themes.lavender, 
      gradient: "from-violet-300 to-purple-400" 
    },
    { 
      id: "mint", 
      label: t.themes.mint, 
      gradient: "from-teal-200 to-emerald-300" 
    },
    { 
      id: "peach", 
      label: t.themes.peach, 
      gradient: "from-orange-200 to-rose-300" 
    },
    { 
      id: "ocean", 
      label: t.themes.ocean, 
      gradient: "from-cyan-500 to-blue-700" 
    },
    { 
      id: "pixel", 
      label: t.themes.pixel, 
      gradient: "from-slate-900 to-slate-800 border-2 border-green-500/20" 
    },
    { 
      id: "aurora", 
      label: t.themes.aurora, 
      gradient: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" 
    },
    { 
      id: "grid", 
      label: t.themes.grid, 
      gradient: "bg-slate-50 border-2 border-slate-200" // Placeholder
    },
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-3">
        {t.theme}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => onChange(theme.id)}
            className={cn(
              "relative group flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all",
              value === theme.id 
                ? "border-sky-500 bg-sky-50" 
                : "border-transparent hover:bg-slate-50"
            )}
          >
            <div className={cn(
              "w-full h-12 rounded-lg bg-gradient-to-br shadow-sm",
              theme.gradient
            )} />
            <span className={cn(
              "text-xs font-medium",
              value === theme.id ? "text-sky-700" : "text-slate-600"
            )}>
              {theme.label}
            </span>
            {value === theme.id && (
              <div className="absolute top-2 right-2 bg-white rounded-full p-0.5 shadow-sm">
                <Check className="w-3 h-3 text-sky-500" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
