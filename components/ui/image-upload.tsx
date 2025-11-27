"use client";

import { useLanguage } from "@/lib/i18n";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 120; // Reduced from 400 to prevent URL length issues
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Compress to JPEG with 0.6 quality to save space in URL
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
        onChange(compressedBase64);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {t.photo}
      </label>
      
      {value ? (
        <div className="relative w-32 h-32 mx-auto">
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/50 shadow-lg">
            <Image 
              src={value} 
              alt="Profile" 
              fill 
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-1 -right-1 p-1.5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className={`
            relative w-32 h-32 mx-auto rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all
            ${isDragging 
              ? "border-sky-500 bg-sky-50 scale-105" 
              : "border-slate-300 bg-white/30 hover:bg-white/50 hover:border-sky-400"
            }
          `}
        >
          <ImagePlus className={`w-8 h-8 mb-1 ${isDragging ? "text-sky-500" : "text-slate-400"}`} />
          <span className="text-xs text-slate-500 font-medium text-center px-2">
            {t.uploadPhoto}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}
    </div>
  );
}
