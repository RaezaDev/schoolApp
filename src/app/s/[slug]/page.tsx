"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { SchoolSite } from "@/types/builder";
import { initialDemoSchool } from "@/lib/mockData";
import { SchoolNavbar } from "@/components/school/SchoolNavbar";
import { SchoolFooter } from "@/components/school/SchoolFooter";
import { SectionRenderer } from "@/components/blocks/SectionRenderer";

export default function PublicSchoolProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [school, setSchool] = useState<SchoolSite>(initialDemoSchool);

  useEffect(() => {
    // Check if customized data exists in localStorage
    const saved = localStorage.getItem("school_site_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.slug === slug || !slug) {
          setSchool(parsed);
        }
      } catch (e) {
        console.error("Failed to load local school site data", e);
      }
    }
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <SchoolNavbar school={school} isBuilderMode={false} />

      {/* Main Sections */}
      <main className="flex-1">
        {school.sections
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <SectionRenderer
              key={section.id}
              section={section}
              theme={school.theme}
              isBuilderMode={false}
            />
          ))}
      </main>

      {/* Footer */}
      <SchoolFooter school={school} />
    </div>
  );
}
