import { z } from "zod";

// We need a base schema type for type inference that doesn't depend on translations
const baseSchema = z.object({
  name: z.string(),
  title: z.string(),
  about: z.string(),
  skills: z.string(),
  qualifications: z.string().optional(),
  github: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  email: z.string().optional(),
  image: z.string().optional(),
  theme: z.enum(["sky", "sunset", "midnight", "forest", "cotton_candy", "lavender", "mint", "peach", "ocean", "pixel", "aurora", "grid"]).optional(),
});

export type ProfileData = z.infer<typeof baseSchema>;

export const createProfileSchema = (t: any) => z.object({
  name: z.string().min(1, t.errors.nameRequired).max(50),
  title: z.string().min(1, t.errors.titleRequired).max(50),
  about: z.string().min(1, t.errors.aboutRequired).max(300),
  skills: z.string().min(1, t.errors.skillsRequired),
  qualifications: z.string().optional(),
  github: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  email: z.string().email(t.errors.emailInvalid).optional().or(z.literal("")),
  image: z.string().optional(),
  theme: z.enum(["sky", "sunset", "midnight", "forest", "cotton_candy", "lavender", "mint", "peach", "ocean", "pixel", "aurora"]).optional(),
});
