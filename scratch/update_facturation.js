const fs = require('fs');

const filePath = '/Users/elamine/Desktop/ISHES/src/app/app/admin/facturation/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Import the action
if (!content.includes('sendPaymentReminderWithLinkAction')) {
  content = content.replace(
    'import { fetchPaymentsAction } from "@/app/actions/students";',
    'import { fetchPaymentsAction, sendPaymentReminderWithLinkAction } from "@/app/actions/students";\nimport { Loader2 } from "lucide-react";'
  );
}

// 2. Add loading state
if (!content.includes('isSendingReminder')) {
  content = content.replace(
    'const [loading, setLoading] = useState(true);',
    'const [loading, setLoading] = useState(true);\n  const [isSendingReminder, setIsSendingReminder] = useState(false);\n  const [popupMsg, setPopupMsg] = useState<{title: string, desc: string, type: "success"|"error"} | null>(null);'
  );
}

// 3. Add handleRelance function
if (!content.includes('const handleRelance = async')) {
  const handler = `
  const handleRelance = async (paymentId: string) => {
    try {
      setIsSendingReminder(true);
      const res = await sendPaymentReminderWithLinkAction(paymentId);
      if (res.success) {
        setPopupMsg({ title: "Relance envoyée !", desc: "L'e-mail de relance contenant le lien de paiement a bien été envoyé.", type: "success" });
      } else {
        setPopupMsg({ title: "Erreur d'envoi", desc: res.error || "Une erreur est survenue.", type: "error" });
      }
    } catch (err: any) {
      setPopupMsg({ title: "Erreur inattendue", desc: "Impossible d'envoyer la relance.", type: "error" });
    } finally {
      setIsSendingReminder(false);
      setTimeout(() => setPopupMsg(null), 5000);
    }
  };
`;
  content = content.replace('const totalRefused = payments.filter', handler + '\n  const totalRefused = payments.filter');
}

// 4. Update the Button
content = content.replace(
  '<Button className="flex-1 bg-ishes-green hover:bg-ishes-green-hover shadow-xl shadow-ishes-green/20 h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-none">',
  '<Button disabled={isSendingReminder} onClick={() => handleRelance(selectedPayment.rawId)} className="flex-1 bg-ishes-green hover:bg-ishes-green-hover shadow-xl shadow-ishes-green/20 h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-none">\n{isSendingReminder ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}'
);

// 5. Add popup display (Toast)
const popupHTML = `
      {/* ── Popup / Toast ────────────────────────────────────────────── */}
      {popupMsg && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-sm w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in slide-in-from-bottom-5">
          <div className="flex items-start gap-4">
            <div className={\`w-10 h-10 rounded-full flex items-center justify-center shrink-0 \${popupMsg.type === 'success' ? 'bg-ishes-green/10 text-ishes-green' : 'bg-red-50 text-red-500'}\`}>
              {popupMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-sm font-bold text-ishes-dark">{popupMsg.title}</h4>
              <p className="text-[11px] font-medium text-gray-500 mt-0.5 leading-relaxed">{popupMsg.desc}</p>
            </div>
            <button onClick={() => setPopupMsg(null)} className="ml-auto text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
`;

if (!content.includes('Popup / Toast')) {
  content = content.replace('</main>', '</main>\n' + popupHTML);
}

fs.writeFileSync(filePath, content);
console.log('Updated facturation page');
