"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type Language = "ja" | "en" | "zh" | "ko";

type Translations = {
  [key in Language]: {
    title: string;
    subtitle: string;
    name: string;
    jobTitle: string;
    about: string;
    aboutPlaceholder: string;
    skills: string;
    skillsPlaceholder: string;
    qualifications: string;
    qualificationsPlaceholder: string;
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
    generate: string;
    generating: string;
    aboutMe: string;
    techStack: string;
    connect: string;
    createOwn: string;
    loading: string;
    photo: string;
    uploadPhoto: string;
    namePlaceholder: string;
    titlePlaceholder: string;
    emailPlaceholder: string;
    theme: string;
    themes: {
      sky: string;
      sunset: string;
      midnight: string;
      forest: string;
      cotton_candy: string;
      lavender: string;
      mint: string;
      peach: string;
      ocean: string;
      pixel: string;
      aurora: string;
      grid: string;
    };
    errors: {
      nameRequired: string;
      titleRequired: string;
      aboutRequired: string;
      skillsRequired: string;
      emailInvalid: string;
    };
  };
};

const translations: Translations = {
  ja: {
    title: "プロフィールジェネレーター",
    subtitle: "登録不要。数秒であなたのデジタル名刺を作成。",
    name: "名前",
    jobTitle: "肩書き",
    about: "自己紹介",
    aboutPlaceholder: "あなた自身について簡単に紹介してください...",
    skills: "スキル (複数選択)",
    skillsPlaceholder: "React, Node.js, AWS",
    qualifications: "資格",
    qualificationsPlaceholder: "AWS ソリューションアーキテクト, 応用情報技術者",
    github: "GitHub URL",
    twitter: "Twitter / X URL",
    linkedin: "LinkedIn URL",
    email: "メールアドレス",
    generate: "プロフィールを生成",
    generating: "生成中...",
    aboutMe: "自己紹介",
    techStack: "技術スタック",
    connect: "リンク",
    createOwn: "自分のプロフィールを作成",
    loading: "読み込み中...",
    photo: "プロフィール写真",
    uploadPhoto: "写真をアップロード",
    namePlaceholder: "山田 太郎",
    titlePlaceholder: "フルスタックエンジニア",
    emailPlaceholder: "taro.yamada@example.com",
    theme: "背景テーマ",
    themes: {
      sky: "青空",
      sunset: "夕暮れ",
      midnight: "真夜中",
      forest: "森林",
      cotton_candy: "コットンキャンディ",
      lavender: "ラベンダー",
      mint: "ミント",
      peach: "ピーチ",
      ocean: "オーシャン",
      pixel: "ピクセル",
      aurora: "オーロラ",
      grid: "グリッド",
    },
    errors: {
      nameRequired: "名前は必須です",
      titleRequired: "肩書きは必須です",
      aboutRequired: "自己紹介は必須です",
      skillsRequired: "スキルを少なくとも1つ選択してください",
      emailInvalid: "有効なメールアドレスを入力してください",
    },
  },
  en: {
    title: "Profile Generator",
    subtitle: "Create your premium digital business card in seconds. No registration required.",
    name: "Name",
    jobTitle: "Job Title",
    about: "About",
    aboutPlaceholder: "Brief introduction about yourself...",
    skills: "Skills (Select multiple)",
    skillsPlaceholder: "React, Node.js, AWS",
    qualifications: "Qualifications",
    qualificationsPlaceholder: "AWS Solution Architect, PMP",
    github: "GitHub URL",
    twitter: "Twitter / X URL",
    linkedin: "LinkedIn URL",
    email: "Email",
    generate: "Generate Profile",
    generating: "Generating...",
    aboutMe: "About Me",
    techStack: "Tech Stack",
    connect: "Connect",
    createOwn: "Create Your Own Profile",
    loading: "Loading...",
    photo: "Profile Photo",
    uploadPhoto: "Upload Photo",
    namePlaceholder: "Alex Chen",
    titlePlaceholder: "Full Stack Engineer",
    emailPlaceholder: "hello@example.com",
    theme: "Background Theme",
    themes: {
      sky: "Sky Blue",
      sunset: "Sunset",
      midnight: "Midnight",
      forest: "Forest",
      cotton_candy: "Cotton Candy",
      lavender: "Lavender",
      mint: "Mint",
      peach: "Peach",
      ocean: "Ocean",
      pixel: "Pixel",
      aurora: "Aurora",
      grid: "Infinite Grid",
    },
    errors: {
      nameRequired: "Name is required",
      titleRequired: "Title is required",
      aboutRequired: "About section is required",
      skillsRequired: "At least one skill is required",
      emailInvalid: "Invalid email address",
    },
  },
  zh: {
    title: "个人简介生成器",
    subtitle: "无需注册，几秒钟内创建您的数字名片。",
    name: "姓名",
    jobTitle: "职位",
    about: "关于我",
    aboutPlaceholder: "简要介绍一下你自己...",
    skills: "技能 (多选)",
    skillsPlaceholder: "React, Node.js, AWS",
    qualifications: "资格证书",
    qualificationsPlaceholder: "AWS 解决方案架构师, PMP",
    github: "GitHub 链接",
    twitter: "Twitter / X 链接",
    linkedin: "LinkedIn 链接",
    email: "电子邮箱",
    generate: "生成个人简介",
    generating: "生成中...",
    aboutMe: "关于我",
    techStack: "技术栈",
    connect: "联系方式",
    createOwn: "创建您自己的个人简介",
    loading: "加载中...",
    photo: "个人照片",
    uploadPhoto: "上传照片",
    namePlaceholder: "陈小明",
    titlePlaceholder: "全栈工程师",
    emailPlaceholder: "xiaoming@example.com",
    theme: "背景主题",
    themes: {
      sky: "天空蓝",
      sunset: "日落",
      midnight: "午夜",
      forest: "森林",
      cotton_candy: "棉花糖",
      lavender: "薰衣草",
      mint: "薄荷",
      peach: "蜜桃",
      ocean: "海洋",
      pixel: "像素",
      aurora: "极光",
      grid: "网格",
    },
    errors: {
      nameRequired: "姓名是必填项",
      titleRequired: "职位是必填项",
      aboutRequired: "关于我是必填项",
      skillsRequired: "请至少选择一项技能",
      emailInvalid: "请输入有效的电子邮件地址",
    },
  },
  ko: {
    title: "프로필 생성기",
    subtitle: "가입 없이 몇 초 만에 디지털 명함을 만드세요.",
    name: "이름",
    jobTitle: "직함",
    about: "소개",
    aboutPlaceholder: "자신에 대해 간단히 소개해 주세요...",
    skills: "기술 (다중 선택)",
    skillsPlaceholder: "React, Node.js, AWS",
    qualifications: "자격증",
    qualificationsPlaceholder: "AWS 솔루션 아키텍트, 정보처리기사",
    github: "GitHub URL",
    twitter: "Twitter / X URL",
    linkedin: "LinkedIn URL",
    email: "이메일",
    generate: "프로필 생성",
    generating: "생성 중...",
    aboutMe: "소개",
    techStack: "기술 스택",
    connect: "연결",
    createOwn: "나만의 프로필 만들기",
    loading: "로딩 중...",
    photo: "프로필 사진",
    uploadPhoto: "사진 업로드",
    namePlaceholder: "김철수",
    titlePlaceholder: "풀스택 엔지니어",
    emailPlaceholder: "chulsoo@example.com",
    theme: "배경 테마",
    themes: {
      sky: "하늘",
      sunset: "노을",
      midnight: "한밤중",
      forest: "숲",
      cotton_candy: "솜사탕",
      lavender: "라벤더",
      mint: "민트",
      peach: "복숭아",
      ocean: "바다",
      pixel: "픽셀",
      aurora: "오로라",
      grid: "그리드",
    },
    errors: {
      nameRequired: "이름은 필수입니다",
      titleRequired: "직함은 필수입니다",
      aboutRequired: "소개는 필수입니다",
      skillsRequired: "기술을 하나 이상 선택해 주세요",
      emailInvalid: "유효한 이메일 주소를 입력해 주세요",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ja");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
