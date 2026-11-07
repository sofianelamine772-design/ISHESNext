/**
 * Formulaire d'inscription à la newsletter « Lettres spirituelles » (Brevo / Sibforms).
 * Aucune clé API : simple iframe, double confirmation gérée par Brevo.
 * Hauteur 760 px pour ne pas tronquer le formulaire (ne pas revenir aux 305 px proposés par Brevo).
 */
export const NEWSLETTER_FORM_URL =
  "https://c8801ef7.sibforms.com/v2/serve/MUIFAPBcO4COV3wXpT3GhYyavKUmFPxeR8fn1Ps5xfwHs45Et1OgPBNkkqQYE5YY-vrSQwmYwXq7tbg3nAGAyM4-RUZNvBsx4y8EuOqGgRuqBY-lS3gMOPPL3Z5NVT7c4xmJltCu3r9wmrlL-c77y1eNdwOMcuqc55KlfHJqiK_qOjilZePM7og23lieghp057OLz1jzXxgNDD5M7g==";

export function NewsletterEmbed({
  height = 760,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <iframe
      src={NEWSLETTER_FORM_URL}
      width="100%"
      height={height}
      loading="lazy"
      scrolling="auto"
      title="Inscription aux lettres spirituelles de l’Institut ISHES"
      className={`block mx-auto max-w-full border-0 ${className}`}
    />
  );
}
