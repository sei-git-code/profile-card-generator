"use client";

import { CloudBackground } from "@/components/ui/cloud-background";
import { GlassCard } from "@/components/ui/glass-card";
import { SkillTag } from "@/components/ui/skill-tag";
import { SocialButton } from "@/components/ui/social-button";
import { useLanguage } from "@/lib/i18n";
import { ProfileData } from "@/lib/schema";
import {
  Award,
  Code2,
  Edit,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Twitter,
  User
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SharePage() {
  const params = useParams();
  const { t } = useLanguage();
  const id = params.id as string;
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProfile() {
      try {
        const response = await fetch(`/api/profile/${id}`);
        
        if (!response.ok) {
          throw new Error('Profile not found');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen relative p-4 md:p-8 pb-20 overflow-hidden flex items-center justify-center">
        <CloudBackground theme="sky" />
        <div className="text-center relative z-10">
          <p className="text-lg text-slate-600 mb-4">{t.loading}</p>
        </div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="min-h-screen relative p-4 md:p-8 pb-20 overflow-hidden flex items-center justify-center">
        <CloudBackground theme="sky" />
        <div className="text-center relative z-10">
          <p className="text-lg text-slate-600 mb-4">{error || 'Profile not found'}</p>
          <Link href="/" className="text-sky-500 hover:underline">
            {t.createOwn}
          </Link>
        </div>
      </main>
    );
  }

  const skillsList = profile.skills.split(",").map(s => s.trim()).filter(Boolean);
  const qualificationsList = (profile.qualifications || "").split(",").map(s => s.trim()).filter(Boolean);

  return (
    <main className="min-h-screen relative p-4 md:p-8 pb-20 overflow-hidden">
      <CloudBackground theme={profile.theme || "sky"} />
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Header Card */}
        <GlassCard className="p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-sky-200/50 to-blue-200/50" />
          
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-white rounded-full p-1 shadow-xl mb-4">
              <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                {profile.image ? (
                  <img 
                    src={profile.image} 
                    alt={profile.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-slate-400" />
                )}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{profile.name}</h1>
            <p className="text-sky-600 font-medium text-lg">{profile.title}</p>
          </div>
        </GlassCard>

        {/* About Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3 ml-1 flex items-center gap-2 text-slate-600">
            <Terminal className="w-4 h-4" />
            {t.aboutMe}
          </h2>
          <GlassCard>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {profile.about}
            </p>
          </GlassCard>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3 ml-1 flex items-center gap-2 text-slate-600">
            <Code2 className="w-4 h-4" />
            {t.techStack}
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill, index) => (
              <SkillTag key={skill} name={skill} index={index} />
            ))}
          </div>
        </section>

        {/* Qualifications Section */}
        {qualificationsList.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 ml-1 flex items-center gap-2 text-slate-600">
              <Award className="w-4 h-4" />
              {t.qualifications}
            </h2>
            <div className="flex flex-wrap gap-2">
              {qualificationsList.map((qual, index) => (
                <SkillTag key={qual} name={qual} index={index} className="hover:bg-purple-100 hover:border-purple-300 hover:text-purple-700" />
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3 ml-1 flex items-center gap-2 text-slate-600">
            <Mail className="w-4 h-4" />
            {t.connect}
          </h2>
          <div className="grid gap-3">
            {profile.github && (
              <SocialButton 
                href={profile.github} 
                icon={<Github className="w-5 h-5" />} 
                label="GitHub" 
              />
            )}
            {profile.twitter && (
              <SocialButton 
                href={profile.twitter} 
                icon={<Twitter className="w-5 h-5" />} 
                label="Twitter / X" 
              />
            )}
            {profile.linkedin && (
              <SocialButton 
                href={profile.linkedin} 
                icon={<Linkedin className="w-5 h-5" />} 
                label="LinkedIn" 
              />
            )}
            {profile.email && (
              <SocialButton 
                href={`mailto:${profile.email}`} 
                icon={<Mail className="w-5 h-5" />} 
                label="Email Me" 
              />
            )}
          </div>
        </section>

        <footer className="text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </footer>

        <div className="text-center pt-4 pb-4">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 text-primary font-bold shadow-lg hover:bg-white transition-all">
                <Edit className="w-4 h-4" />
                {t.createOwn}
            </Link>
        </div>
      </div>
    </main>
  );
}
