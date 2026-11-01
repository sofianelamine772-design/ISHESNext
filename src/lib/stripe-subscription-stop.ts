/**
 * Arrêt des mensualités Stripe après N prélèvements réussis.
 * 1) Pose un `cancel_at` natif (filet si un webhook futur manque)
 * 2) Annule dès que le compteur de factures payées atteint N
 */

export function computeInstallmentCancelAt(params: {
  installmentsTotal: number;
  paidInvoiceCount: number;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  nowSeconds?: number;
}): number | null {
  const total = Math.round(Number(params.installmentsTotal) || 0);
  const paid = Math.max(0, Math.round(Number(params.paidInvoiceCount) || 0));
  if (!(total > 0)) return null;

  const periodStart = Number(params.currentPeriodStart) || 0;
  const periodEnd = Number(params.currentPeriodEnd) || 0;
  const periodLength = periodEnd - periodStart;
  if (!(periodLength > 0)) return null;

  // Fin de la N-ème période à partir du début de la période courante
  // (on est dans la période `paid` après encaissement de la facture `paid`).
  const periodsRemainingAfterCurrent = Math.max(0, total - paid);
  return periodEnd + periodsRemainingAfterCurrent * periodLength;
}

export function shouldCancelSubscriptionNow(params: {
  installmentsTotal: number;
  paidInvoiceCount: number;
}): boolean {
  const total = Math.round(Number(params.installmentsTotal) || 0);
  const paid = Math.round(Number(params.paidInvoiceCount) || 0);
  return total > 0 && paid >= total;
}
