import { Button } from "@/components/ui/button";
import { FileText, UserPlus } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { stripe } from "@/lib/stripe";
import { AdminSidebar } from "@/components/AdminSidebar";

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
            <Button variant="ishes-outline" size="sm" className="hidden sm:flex h-10">
              <FileText className="w-4 h-4 mr-1" /> <span className="hidden md:inline">Exporter Rapport</span>
              <span className="md:hidden">Export</span>
            </Button>
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
                <div className="min-w-[600px] h-full relative">
                  <div className="absolute inset-0 flex items-end justify-between gap-2 md:gap-4">
                    {[
                      { month: 'Jan', value: 35 },
                      { month: 'Fev', value: 55 },
                      { month: 'Mar', value: 42 },
                      { month: 'Avr', value: 78 },
                      { month: 'Mai', value: 85 },
                      { month: 'Jun', value: 68 },
                      { month: 'Jul', value: 48 },
                      { month: 'Aou', value: 58 },
                      { month: 'Sep', value: 72 },
                      { month: 'Oct', value: 52 },
                      { month: 'Nov', value: 64 },
                      { month: 'Dec', value: 80 },
                    ].map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-4 group relative">
                        {/* Tooltip on hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 px-2 py-1 bg-ishes-dark text-white text-[10px] font-bold rounded shadow-xl pointer-events-none z-20">
                          {item.value}K€
                        </div>
                        
                        {/* Bar */}
                        <div 
                          className="w-full bg-[#E0E7FF] group-hover:bg-[#C7D2FE] transition-all duration-500 rounded-t-xl rounded-b-lg relative overflow-hidden"
                          style={{ height: `${item.value}%` }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        
                        {/* Label */}
                        <span className="text-[10px] font-black uppercase tracking-tight text-gray-400 group-hover:text-ishes-dark transition-colors">
                          {item.month}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Horizontal lines (Background) */}
                  <div className="absolute inset-0 -z-10 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="w-full border-t border-dashed border-gray-300"></div>
                    <div className="w-full border-t border-dashed border-gray-300"></div>
                    <div className="w-full border-t border-dashed border-gray-300"></div>
                    <div className="w-full border-t border-dashed border-gray-300"></div>
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
