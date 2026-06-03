import { Metadata } from 'next';
import { PROGRAMS_DATA } from '@/lib/programs-data';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const course = PROGRAMS_DATA[id];

  if (!course) {
    return {
      title: "Programme | Institut ISHES",
      description: "Découvrez nos formations en langue arabe et Tajwid.",
    };
  }

  return {
    title: `${course.title} | Institut ISHES`,
    description: course.hook || course.description?.substring(0, 160),
  };
}

export default function ProgramDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
