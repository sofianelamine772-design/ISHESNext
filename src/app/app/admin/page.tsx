import { Button } from "@/components/ui/button";
import { FileText, UserPlus } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { AdminSidebar } from "@/components/AdminSidebar";
import { stripe } from "@/lib/stripe";

export const dynamic = 'force-dynamic';

export default async function AdminOverview() {
  // Fetch stats directly on the server (much faster)
  const { count: totalStudents } = await supabaseAdmin
    .from('etudiants')
    .select('*', { count: 'exact', head: true });

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

            {/* Sales Overview Chart Section */}
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 p-6 md:p-10 shadow-sm overflow-hidden">
              <div className="flex flex-col mb-8 md:mb-12">
                <h3 className="text-xl md:text-2xl ishes-heading text-ishes-dark">Aperçu des Ventes</h3>
                <p className="text-xs md:text-sm font-medium text-gray-400 mt-1">Visualisation de vos revenus ce mois-ci.</p>
              </div>

               {/* Chart Container */}
              <div className="relative h-64 w-full mt-8 overflow-x-auto custom-scrollbar pb-4">
                <div className="min-w-[600px] h-full relative flex flex-col justify-end">
                  
                  {/* Grid Lines behind the bars */}
                  <div className="absolute inset-x-0 top-4 bottom-10 flex flex-col justify-between pointer-events-none z-0 opacity-40">
                    <div className="w-full border-t border-dashed border-gray-200"></div>
                    <div className="w-full border-t border-dashed border-gray-200"></div>
                    <div className="w-full border-t border-dashed border-gray-200"></div>
                    <div className="w-full border-t border-dashed border-gray-200"></div>
                  </div>

                  {/* Bars Row */}
                  <div className="h-[210px] w-full flex items-end justify-between gap-2 md:gap-4 relative z-10">
                    {monthlyData.map((item, index) => {
                      const percentHeight = maxRevenueValue > 0 ? (item.value / maxRevenueValue) * 100 : 0;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                          
                          {/* Value text above the bar - ALWAYS VISIBLE */}
                          <span className="text-[10px] font-black text-ishes-dark mb-1.5 opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:text-ishes-green shrink-0">
                            {formatRevenue(item.value)}
                          </span>
                          
                          {/* Bar Track (Transparent Grey Background) & Interactive Bar */}
                          <div className="w-full h-full max-h-[155px] bg-gray-100/50 rounded-t-xl rounded-b-lg relative overflow-hidden flex items-end shadow-inner border border-gray-200/20">
                            
                            {/* Green Gradient Bar */}
                            <div 
                              className="w-full bg-gradient-to-t from-[#065440] via-ishes-green to-[#0ea880] rounded-t-xl rounded-b-lg transition-all duration-700 ease-out relative group-hover:brightness-105"
                              style={{ height: `${percentHeight}%` }}
                            >
                              {/* Shimmer overlay on hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                          </div>
                          
                          {/* Month Label */}
                          <span className="text-[10px] font-black uppercase tracking-tight text-gray-400 mt-2 group-hover:text-ishes-dark transition-colors shrink-0">
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
