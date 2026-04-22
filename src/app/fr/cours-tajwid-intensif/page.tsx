"use client";

import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export default function TajwidIntensifSEOPage() {
  const course = PROGRAMS_DATA["tajwid_intensif"];

  return <CourseDetailView course={course} id="tajwid_intensif" />;
}
