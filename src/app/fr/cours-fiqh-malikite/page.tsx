"use client";

import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export default function FiqhMalikiteSEOPage() {
  const course = PROGRAMS_DATA["fiqh_malikite"];

  return <CourseDetailView course={course} id="fiqh_malikite" />;
}
