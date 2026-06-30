import { Button } from "@/components/ui/button";
import { FileText, UserPlus } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { AdminSidebar } from "@/components/AdminSidebar";
import { stripe } from "@/lib/stripe";
import { SalesChart } from "@/components/admin/SalesChart";
import { fetchStudentsAction } from "@/app/actions/students";

export const dynamic = 'force-dynamic';

export default async function AdminOverview() {
  // Fetch stats using the same logic as the student list (filters out parents and abandoned carts)
  const studentsResult = await fetchStudentsAction();
  const totalStudents = studentsResult.success ? (studentsResult.data?.length || 0) : 0;

  // Stripe Revenue Data
  let monthlyRevenue = 0;
  let yearlyRevenue = 0;

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    
    const startOfMonthTimestamp = Math.floor(startOfMonth.getTime() / 1000);
    const startOfYearTimestamp = Math.floor(startOfYear.getTime() / 1000);

    // Get monthly revenue (limit 100 for simplicity)
    const monthPIs = await stripe.paymentIntents.list({
      created: { gte: startOfMonthTimestamp },
      limit: 100,
    });
    monthlyRevenue = monthPIs.data
      .filter(pi => pi.status === 'succeeded')
      .reduce((acc, pi) => acc + (pi.amount_received / 100), 0);

    // Get yearly revenue (limit 100)
    const yearPIs = await stripe.paymentIntents.list({
      created: { gte: startOfYearTimestamp },
      limit: 100,
    });
    yearlyRevenue = yearPIs.data
      .filter(pi => pi.status === 'succeeded')
      .reduce((acc, pi) => acc + (pi.amount_received / 100), 0);
  } catch (err) {
    console.error("Stripe Fetch Error:", err);
  }

  // Fetch successful payments from Supabase directly
  const { data: dbPayments } = await supabaseAdmin
    .from('paiements')
    .select('amount, created_at, status')
    .eq('status', 'succeeded');

  // Fetch recent payments with student info (real-time stream)
  const { data: recentPaymentsRaw } = await supabaseAdmin
    .from('paiements')
    .select('id, amount, status, created_at, stripe_session_id, etudiants (first_name, last_name, email)')
    .order('created_at', { ascending: false })
    .limit(10);

  const recentPayments = recentPaymentsRaw || [];

  const monthlyData = [
    { month: 'Jan', value: 0 },
    { month: 'Fev', value: 0 },
    { month: 'Mar', value: 0 },
    { month: 'Avr', value: 0 },
    { month: 'Mai', value: 0 },
    { month: 'Jun', value: 0 },
    { month: 'Jul', value: 0 },
    { month: 'Aou', value: 0 },
    { month: 'Sep', value: 0 },
    { month: 'Oct', value: 0 },
    { month: 'Nov', value: 0 },
    { month: 'Dec', value: 0 },
  ];

  if (dbPayments) {
    const currentYear = new Date().getFullYear();
    dbPayments.forEach(p => {
      const date = new Date(p.created_at);
      if (date.getFullYear() === currentYear) {
        const monthIndex = date.getMonth();
        if (monthIndex >= 0 && monthIndex < 12) {
          monthlyData[monthIndex].value += Number(p.amount || 0);
        }
      }
    });
  }

  const maxRevenueValue = Math.max(...monthlyData.map(d => d.value), 1);

  const formatRevenue = (val: number) => {
    if (val >= 1000) return (val / 1000).toFixed(1) + "K€";
    return val.toFixed(0) + "€";
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            {/* Spacer for mobile menu button */}
            <div className="w-10 lg:hidden" />
            <h1 className="text-xl md:text-2xl ishes-heading text-ishes-dark truncate">Vue d'ensemble</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9 md:w-10 md:h-10 border-2 border-ishes-green p-[2px]"
                }
              }}
            />
          </div>
        </header>

        <div className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

              {/* Card 1 */}
              <div className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex flex-col">
                  <p className="ishes-label text-ishes-green mb-1 text-[10px] md:text-xs">Élèves inscrits</p>
                  <div className="flex items-end gap-3">
                    <h3 className="text-3xl md:text-4xl ishes-heading text-ishes-dark">{totalStudents || 0}</h3>
                    <span className="text-[10px] font-black italic text-ishes-green bg-ishes-green/5 px-2 py-0.5 rounded mb-1">+12%</span>
                  </div>
                  <div className="mt-4 h-1 w-12 bg-ishes-green rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex flex-col">
                  <p className="ishes-label text-ishes-green mb-1 text-[10px] md:text-xs">Revenus (Ce mois)</p>
                  <div className="flex items-end gap-3">
                    <h3 className="text-3xl md:text-4xl ishes-heading text-ishes-dark">{formatRevenue(monthlyRevenue)}</h3>
                    <span className="text-[10px] font-black italic text-ishes-green bg-ishes-green/5 px-2 py-0.5 rounded mb-1">+5.2%</span>
                  </div>
                  <div className="mt-4 h-1 w-12 bg-ishes-dark rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex flex-col">
                  <p className="ishes-label text-ishes-green mb-1 text-[10px] md:text-xs">Revenus (Année)</p>
                  <div className="flex items-end gap-3">
                    <h3 className="text-3xl md:text-4xl ishes-heading text-ishes-dark">{formatRevenue(yearlyRevenue)}</h3>
                  </div>
                  <div className="mt-4 h-1 w-12 bg-ishes-green rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex flex-col">
                  <p className="ishes-label text-ishes-green mb-1 text-[10px] md:text-xs">Dossiers finalisés</p>
                  <div className="flex items-end gap-3">
                    <h3 className="text-3xl md:text-4xl ishes-heading text-ishes-dark">89%</h3>
                    <span className="text-[10px] font-black italic text-gray-400 bg-gray-50 px-2 py-0.5 rounded mb-1">-2%</span>
                  </div>
                  <div className="mt-4 h-1 w-12 bg-ishes-dark rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>

            {/* Sales Overview & Recent Payments Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* Left: Sales Overview Chart Section (2 cols) */}
              <div className="lg:col-span-2 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 p-6 md:p-10 shadow-sm overflow-hidden flex flex-col justify-between">
                <SalesChart monthlyData={monthlyData} />
              </div>

              {/* Right: Recent Payments (1 col) */}
              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 p-6 md:p-8 shadow-sm flex flex-col overflow-hidden h-[450px]">
                <div className="flex flex-col mb-6">
                  <h3 className="text-xl ishes-heading text-ishes-dark">Derniers Paiements</h3>
                  <p className="text-xs font-medium text-gray-400 mt-1">Les derniers flux financiers en temps réel.</p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar">
                  {recentPayments.length > 0 ? (
                    recentPayments.map((p: any) => {
                      const studentName = p.etudiants
                        ? `${p.etudiants.first_name || ''} ${p.etudiants.last_name || ''}`.trim() || p.etudiants.email
                        : "Élève Inconnu";
                      const studentEmail = p.etudiants?.email || "Pas d'adresse email";
                      const paymentDate = new Date(p.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      });

                      const isSucceeded = p.status === 'succeeded';
                      
                      return (
                        <div key={p.id} className="flex items-center justify-between p-3.5 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-ishes-green/20 transition-all">
                          <div className="min-w-0 flex-1 pr-2">
                            <div className="text-xs font-black text-ishes-dark truncate">{studentName}</div>
                            <div className="text-[9px] text-gray-400 font-mono truncate">{studentEmail}</div>
                            <div className="text-[9px] text-gray-450 mt-1 font-semibold">{paymentDate}</div>
                          </div>
                          <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                            <span className="font-black text-sm text-ishes-dark">{Number(p.amount).toFixed(0)} €</span>
                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                              isSucceeded 
                                ? 'bg-ishes-green/10 text-ishes-green' 
                                : 'bg-red-50 text-red-500 border border-red-100'
                            }`}>
                              {isSucceeded ? 'Réussi' : 'Échoué'}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-400">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <span className="text-xl">💳</span>
                      </div>
                      <p className="font-bold text-xs">Aucune transaction</p>
                      <p className="text-[10px] italic">Les paiements s'afficheront ici en direct.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
