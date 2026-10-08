import { Metadata } from 'next';
import { PROGRAMS_DATA } from '@/lib/programs-data';
import { buildPageMetadata, truncateDescription } from '@/lib/seo';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const course = PROGRAMS_DATA[id];

  if (!course) {
    return buildPageMetadata({
      title: 'Programme introuvable',
      description: 'Découvrez nos formations en langue arabe, Tajwid et sciences islamiques.',
      path: '/program',
      noIndex: true,
    });
  }

  const description = truncateDescription(
    course.hook || course.description || `${course.title} — formation Institut ISHES`,
  );

  return buildPageMetadata({
    title: `${course.title} | Formation ISHES`,
    description,
    path: `/program/${id}`,
    keywords: [course.title, course.tag, 'institut ishes', 'formation'].filter(Boolean) as string[],
  });
}

export default function ProgramDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
