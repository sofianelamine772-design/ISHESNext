import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  CIVILISATION_PATH,
  CIVILISATION_SAVANTS,
  getSavant,
  savantPath,
} from "@/lib/civilisation-savants";
import { CivilisationCtas } from "@/components/vitrine/CivilisationCtas";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
  faqJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return CIVILISATION_SAVANTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const savant = getSavant(slug);
  if (!savant) return {};
  return buildPageMetadata({
    title: savant.headline,
    description: savant.summary,
    path: savantPath(slug),
    keywords: savant.keywords,
    type: "article",
  });
}

export default async function SavantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const savant = getSavant(slug);
  if (!savant) notFound();

  const others = CIVILISATION_SAVANTS.filter((s) => s.slug !== slug);
  const wordCount = savant.sections.reduce(
    (n, sec) => n + sec.paragraphs.join(" ").split(/\s+/).length,
    80,
  );

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 pt-28">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Civilisation arabo-musulmane", path: CIVILISATION_PATH },
          { name: "Savants", path: `${CIVILISATION_PATH}/savants` },
          { name: savant.name, path: savantPath(slug) },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          headline: savant.headline,
          description: savant.summary,
          path: savantPath(slug),
          keywords: savant.keywords,
          wordCount,
          about: [savant.name, "Civilisation arabo-musulmane", ...savant.fields],
        })}
      />
      <JsonLd data={faqJsonLd(savant.faqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: savant.name,
          alternateName: savant.latinName,
          description: savant.summary,
          url: absoluteUrl(savantPath(slug)),
          jobTitle: savant.fields.join(", "),
          knowsAbout: savant.fields,
        }}
      />

      <article className="max-w-3xl mx-auto px-6">
        <nav className="flex flex-wrap gap-3 text-sm font-bold text-gray-500 mb-8">
          <Link href={CIVILISATION_PATH} className="inline-flex items-center gap-2 hover:text-ishes-blue">
            <ArrowLeft className="w-4 h-4" />
            Formation
          </Link>
          <span aria-hidden>/</span>
          <Link href={`${CIVILISATION_PATH}/savants`} className="hover:text-ishes-blue">
            Tous les savants
          </Link>
        </nav>

        <p className="text-ishes-gold font-black uppercase tracking-[0.2em] text-xs mb-3">
          Biographie · {savant.dates}
        </p>
        <h1 className="text-3xl md:text-5xl font-black text-ishes-blue leading-tight mb-4">
          {savant.headline}
        </h1>
        <p className="text-lg text-gray-600 font-medium mb-4">{savant.summary}</p>
        <p className="text-sm font-bold text-ishes-dark mb-8">
          {savant.fields.join(" · ")} — {savant.cities}
        </p>

        <ol className="mb-12 flex flex-wrap gap-2 text-xs font-bold">
          {savant.sections.map((sec) => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                className="block rounded-full bg-white border border-gray-200 px-3 py-1.5 text-ishes-blue hover:border-ishes-gold"
              >
                {sec.title}
              </a>
            </li>
          ))}
        </ol>

        {savant.sections.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-28 mb-10">
            <h2 className="text-2xl font-black text-ishes-blue mb-4">{sec.title}</h2>
            <div className="space-y-4 text-[16px] leading-relaxed text-gray-700 font-medium">
              {sec.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <section className="mb-12">
          <h2 className="text-2xl font-black text-ishes-blue mb-4">Œuvres principales</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 font-medium">
            {savant.works.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </section>

        <div className="p-6 rounded-2xl bg-[#f9f5f0] border border-ishes-gold/20 mb-4">
          <h2 className="text-xl font-black text-ishes-blue mb-3">
            Étudier {savant.name} dans la formation ISHES
          </h2>
          <p className="text-gray-700 font-medium leading-relaxed mb-6">{savant.whyInCourse}</p>
          <CivilisationCtas />
        </div>
      </article>

      <div className="max-w-3xl mx-auto">
        <VitrineFaq
          eyebrow={`FAQ ${savant.name}`}
          title={`Questions fréquentes sur ${savant.name}`}
          items={savant.faqs}
        />
      </div>

      <nav className="max-w-3xl mx-auto px-6 mt-8" aria-label="Autres savants">
        <h2 className="text-xl font-black text-ishes-blue mb-6">
          Continuer : autres savants de la civilisation arabo-musulmane
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={savantPath(s.slug)}
                className="block rounded-xl border border-gray-100 bg-white p-4 hover:border-ishes-gold/40 hover:shadow-sm"
              >
                <span className="font-black text-ishes-blue">{s.name}</span>
                <span className="block text-xs text-gray-500 font-medium mt-1">{s.headline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
