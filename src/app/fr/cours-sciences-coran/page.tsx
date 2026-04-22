"use client";

import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export default function SciencesDuCoranSEOPage() {
  const course = PROGRAMS_DATA["sciences_du_coran"];

  return <CourseDetailView course={course} id="sciences_du_coran" />;
}
