import { applyDistancielOffer, formatEuros } from "@/lib/distanciel-offer";

type Props = {
  /** Tarif habituel en euros (ex. 399). */
  price: number;
  /** Slug de la formation (pour savoir si l'offre s'applique). */
  slug: string;
  /** Classes du tarif affiché (celui réellement facturé). */
  className?: string;
  /** Classes du tarif barré. */
  originalClassName?: string;
  /** Afficher le badge « −100 € ». */
  badge?: boolean;
};

/**
 * Tarif d'une formation à distance : habituel barré en rouge + tarif remisé.
 * Hors offre, affiche simplement le tarif habituel.
 */
export function DistancielPrice({
  price,
  slug,
  className = "",
  originalClassName = "",
  badge = true,
}: Props) {
  const offer = applyDistancielOffer(price, { slug });
  if (offer.discount <= 0) {
    return <span className={className}>{formatEuros(offer.original)}</span>;
  }
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span className="inline-flex items-center gap-2">
        <s
          className={`text-red-500 decoration-red-500 decoration-2 ${originalClassName}`}
          aria-label={`Tarif habituel ${formatEuros(offer.original)}`}
        >
          {formatEuros(offer.original)}
        </s>
        {badge && (
          <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
            −{offer.discount} €
          </span>
        )}
      </span>
      <span className={className}>{formatEuros(offer.current)}</span>
    </span>
  );
}
