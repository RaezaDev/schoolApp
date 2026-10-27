"use client";

import React from "react";
import { SectionBlock, SchoolTheme } from "@/types/builder";
import { HeroBlock } from "./HeroBlock";
import { SambutanBlock } from "./SambutanBlock";
import { FasilitasBlock } from "./FasilitasBlock";
import { GuruStafBlock } from "./GuruStafBlock";
import { PrestasiBlock } from "./PrestasiBlock";
import { GaleriBlock } from "./GaleriBlock";
import { KontakPetaBlock } from "./KontakPetaBlock";
import { FaqBlock } from "./FaqBlock";
import { VideoProfilBlock } from "./VideoProfilBlock";
import { ProgramJurusanBlock } from "./ProgramJurusanBlock";
import { TestimoniBlock } from "./TestimoniBlock";
import { CtaPpdbBlock } from "./CtaPpdbBlock";

interface SectionRendererProps {
  section: SectionBlock;
  theme: SchoolTheme;
  isBuilderMode?: boolean;
}

export function SectionRenderer({ section, theme, isBuilderMode }: SectionRendererProps) {
  if (!section.isActive) return null;

  switch (section.type) {
    case "hero":
      return <HeroBlock section={section as any} theme={theme} isBuilderMode={isBuilderMode} />;
    case "sambutan_kepsek":
      return <SambutanBlock section={section as any} theme={theme} />;
    case "fasilitas":
      return <FasilitasBlock section={section as any} theme={theme} />;
    case "guru_staf":
      return <GuruStafBlock section={section as any} theme={theme} />;
    case "prestasi":
      return <PrestasiBlock section={section as any} theme={theme} />;
    case "galeri":
      return <GaleriBlock section={section as any} theme={theme} />;
    case "kontak_peta":
      return <KontakPetaBlock section={section as any} theme={theme} />;
    case "faq":
      return <FaqBlock section={section as any} theme={theme} />;
    case "video_profil":
      return <VideoProfilBlock section={section as any} theme={theme} />;
    case "program_jurusan":
      return <ProgramJurusanBlock section={section as any} theme={theme} />;
    case "testimoni":
      return <TestimoniBlock section={section as any} theme={theme} />;
    case "cta_ppdb":
      return <CtaPpdbBlock section={section as any} theme={theme} isBuilderMode={isBuilderMode} />;
    default:
      return null;
  }
}
