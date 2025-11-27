"use client";

import { Language, useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useState } from "react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: "ja", label: "日本語" },
    { code: "en", label: "English" },
    { code: "zh", label: "中文" },
    { code: "ko", label: "한국어" },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-2 bg-white/80 backdrop-blur-md border border-white/50 rounded-xl shadow-lg overflow-hidden min-w-[120px]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-sky-100 transition-colors ${
                  language === lang.code ? "text-sky-600 font-bold bg-sky-50" : "text-slate-600"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/50 rounded-full shadow-lg text-slate-700 hover:bg-white hover:text-sky-600 transition-all"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium uppercase">{language}</span>
        </button>
      </div>
    </div>
  );
}
