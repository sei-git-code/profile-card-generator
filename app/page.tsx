"use client";

import { CloudBackground } from "@/components/ui/cloud-background";
import { GlassCard } from "@/components/ui/glass-card";
import { ImageUpload } from "@/components/ui/image-upload";
import { ThemeSelector } from "@/components/ui/theme-selector";
import { useLanguage } from "@/lib/i18n";
import { ProfileData, createProfileSchema } from "@/lib/schema";
import { encodeProfileData } from "@/lib/url-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileData>({
    resolver: zodResolver(createProfileSchema(t)),
    defaultValues: {
      skills: "Next.js, React, TypeScript",
    },
  });

  const useFormValues = watch();

  const onSubmit = async (data: ProfileData) => {
    const encoded = encodeProfileData(data);
    router.push(`/share?data=${encoded}`);
  };

  return (
    <main className="min-h-screen relative p-4 md:p-8 pb-20 overflow-hidden flex items-center justify-center">
      <CloudBackground theme={watch("theme") || "sky"} />
      <div className="max-w-lg w-full relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-2 tracking-tight">
            {t.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center mb-6">
              <ImageUpload 
                value={watch("image")} 
                onChange={(val) => setValue("image", val)} 
              />
            </div>

            <ThemeSelector 
              value={watch("theme") || "sky"} 
              onChange={(val) => setValue("theme", val)} 
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.name}</label>
                <input
                  {...register("name")}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 placeholder:text-slate-400"
                  placeholder={t.namePlaceholder}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.jobTitle}</label>
              <input
                {...register("title")}
                className="w-full px-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 placeholder:text-slate-400"
                placeholder={t.titlePlaceholder}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.about}</label>
              <textarea
                {...register("about")}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 placeholder:text-slate-400 resize-none"
                placeholder={t.aboutPlaceholder}
              />
              {errors.about && <p className="text-red-500 text-xs mt-1">{errors.about.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.skills}</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {[
                  "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", 
                  "Python", "AWS", "Docker", "GraphQL", "PostgreSQL", 
                  "Figma", "UI/UX", "Go", "Rust", "Java",
                  "Vue.js", "Svelte", "Flutter", "Firebase", "Kubernetes"
                ].map((skill) => {
                  const currentSkills = (useFormValues.skills || "").split(",").map(s => s.trim()).filter(Boolean);
                  const isSelected = currentSkills.includes(skill);
                  
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => {
                        const newSkills = isSelected
                          ? currentSkills.filter(s => s !== skill)
                          : [...currentSkills, skill];
                        setValue("skills", newSkills.join(", "), { shouldValidate: true });
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        isSelected 
                          ? "bg-sky-500 text-white shadow-md scale-105" 
                          : "bg-white/50 text-slate-600 hover:bg-white/80 border border-white/60"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
              <input
                {...register("skills")}
                className="w-full px-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 placeholder:text-slate-400"
                placeholder={t.skillsPlaceholder}
              />
              {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.qualifications}</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {[
                  "AWS Certified Developer", "Google Cloud Professional Developer", "Meta Front-End Developer",
                  "Java Silver", "Java Gold", "基本情報技術者 (FE)", "応用情報技術者 (AP)",
                  "Docker Certified Associate", "CKAD (Kubernetes App Developer)",
                  "MongoDB Certified Developer", "Stripe Certified Professional",
                  "TOEIC 900+", "JLPT N1"
                ].map((qual) => {
                  const currentQuals = (useFormValues.qualifications || "").split(",").map(s => s.trim()).filter(Boolean);
                  const isSelected = currentQuals.includes(qual);
                  
                  return (
                    <button
                      key={qual}
                      type="button"
                      onClick={() => {
                        const newQuals = isSelected
                          ? currentQuals.filter(s => s !== qual)
                          : [...currentQuals, qual];
                        setValue("qualifications", newQuals.join(", "), { shouldValidate: true });
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        isSelected 
                          ? "bg-purple-500 text-white shadow-md scale-105" 
                          : "bg-white/50 text-slate-600 hover:bg-white/80 border border-white/60"
                      }`}
                    >
                      {qual}
                    </button>
                  );
                })}
              </div>
              <input
                {...register("qualifications")}
                className="w-full px-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 placeholder:text-slate-400"
                placeholder={t.qualificationsPlaceholder}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.github}</label>
                <input
                  {...register("github")}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 placeholder:text-slate-400"
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.twitter}</label>
                <input
                  {...register("twitter")}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 placeholder:text-slate-400"
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.linkedin}</label>
                <input
                  {...register("linkedin")}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 placeholder:text-slate-400"
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.email}</label>
                <input
                  {...register("email")}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 placeholder:text-slate-400"
                  placeholder={t.emailPlaceholder}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                t.generating
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {t.generate}
                </>
              )}
            </button>
          </form>
        </GlassCard>
      </div>
    </main>
  );
}
