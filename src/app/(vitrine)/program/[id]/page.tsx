"use client";

import { useParams } from "next/navigation";
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";
import { TajwidStandardView } from "@/components/vitrine/TajwidStandardView";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const course = PROGRAMS_DATA[id] || PROGRAMS_DATA["tajwid_intensif"];

  if (id === "tajwid_standard") {
    return <TajwidStandardView />;
  }

  return <CourseDetailView course={course} id={id || "tajwid_intensif"} />;
}
