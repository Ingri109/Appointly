import Header from '@/components/Header';
import BackToMenu from '@/components/BackToMenu';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';

const plans = [
  { id: 1, name: 'Basic', price: 29, period: 'month', popular: false, features: ['2 consultations per month','Email support','Basic health tracking','Prescription management','Access to general physicians'] },
  { id: 2, name: 'Premium', price: 79, period: 'month', popular: true, features: ['Unlimited consultations','24/7 priority support','Advanced health tracking','Prescription management','Access to all specialists','Family sharing (up to 4 members)','Discounted lab tests','Mental health support'] },
  { id: 3, name: 'Family', price: 129, period: 'month', popular: false, features: ['Unlimited consultations','24/7 priority support','Advanced health tracking','Prescription management','Access to all specialists','Family sharing (up to 8 members)','Free lab tests (4 per year)','Mental health support','Annual health checkups'] },
];

export default function PlansPage() {
  return (
    <div className="flex flex-col min-h-screen bg-custom1">
      <Header />
      <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <BackToMenu />
            
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Plany Ubezpieczeniowe</h1>
              <p className="text-slate-600">Wybierz najlepszy plan dla swoich potrzeb zdrowotnych</p>
            </div>

            {/* Hero Banner */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white mb-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 p-4 rounded-xl">
                  <Shield size={36} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">Chroniona Opieka Zdrowotna</h2>
                  <p className="text-teal-100">Zaoszczędź do 60% na kosztach medycznych</p>
                </div>
              </div>
              <p className="text-teal-50">Nasze plany ubezpieczeniowe obejmują konsultacje, recepty, badania laboratoryjne i więcej. Wybierz plan, który pasuje do Twojego stylu życia.</p>
            </div>

            {/* Plans Grid - Side by Side on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <div key={plan.id} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col ${plan.popular ? 'border-2 border-teal-600 relative ring-4 ring-teal-100' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-teal-600 text-white px-4 py-1 rounded-full text-xs flex items-center gap-1 shadow">
                        <Star size={12} className="fill-white" />
                        Najpopularniejszy
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6 pt-2">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-teal-700">${plan.price}</span>
                      <span className="text-slate-500">/{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={16} className="text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 5 && (
                      <li className="text-sm text-teal-600 font-medium ml-6">+{plan.features.length - 5} więcej funkcji</li>
                    )}
                  </ul>
                  <Link href="/Payment">
                    <Button className={`w-full rounded-xl ${plan.popular ? 'bg-teal-700 hover:bg-teal-800 text-white' : 'bg-white text-teal-700 border border-teal-700 hover:bg-teal-50'}`}>
                      {plan.popular ? 'Rozpocznij' : 'Wybierz Plan'}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* All Plans Include */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Wszystkie Plany Obejmują:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Brak ukrytych opłat lub niespodzianek</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Anuluj w każdej chwili, bez długich umów</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Ogólnopolska sieć usługodawców zdrowia</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Zgodny z HIPAA i bezpieczny</span>
                </div>
              </div>
            </div>
          </div>
      </main>
      <Footer />
    </div>
  );
}
