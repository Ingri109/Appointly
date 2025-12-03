import Header from '@/components/Header';
import Menu from '@/components/Menu';
import BackToMenu from '@/components/BackToMenu';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Video, Clock, CheckCircle, Shield } from 'lucide-react';

const benefits = [
  { icon: Video, title: 'Konsultacja Wideo', description: 'Połącz się z lekarzami przez wysokiej jakości połączenia wideo' },
  { icon: Clock, title: 'Szybki Dostęp', description: 'Uzyskaj poradę medyczną w ciągu minut, bez poczekalni' },
  { icon: Shield, title: 'Bezpieczne i Prywatne', description: 'Szyfrowane konsultacje końcowe dla Twojej prywatności' },
  { icon: CheckCircle, title: 'Recepty', description: 'Otrzymuj cyfrowe recepty natychmiast po konsultacji' },
];

const availableDoctors = [
  { id: 1, name: 'Dr. Lisa Anderson', specialty: 'Lekarz Rodzinny', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', availableIn: '10 min' },
  { id: 2, name: 'Dr. David Kim', specialty: 'Psychiatra', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop', availableIn: '15 min' },
  { id: 3, name: 'Dr. Maria Santos', specialty: 'Dietetyk', avatar: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=200&h=200&fit=crop', availableIn: '5 min' },
];

export default function ConsultPage() {
  return (
    <div className="flex min-h-screen bg-custom1">
      <Menu />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto bg-custom1">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <BackToMenu />
            
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Konsultacja Online</h1>
              <p className="text-slate-600">Opieka zdrowotna w zaciszu Twojego domu</p>
            </div>

            {/* Desktop Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - Left 2 Columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* Hero Card */}
                <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 p-4 rounded-xl">
                      <Video size={36} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-1">Konsultacje Online</h2>
                      <p className="text-teal-100">Dostępne 24/7</p>
                    </div>
                  </div>
                  <p className="text-teal-50">Połącz się z wykwalifikowanymi lekarzami natychmiast przez bezpieczne połączenia wideo. Uzyskaj porady medyczne, recepty i wizyty kontrolne bez wychodzenia z domu.</p>
                  <Button className="mt-4 bg-white text-teal-700 hover:bg-teal-50 font-medium">
                    Rozpocznij Konsultację Teraz
                  </Button>
                </div>

                {/* Benefits Grid */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Dlaczego Wybrać Konsultację Online?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-teal-50 transition-colors">
                        <div className="bg-teal-100 p-3 rounded-xl h-fit">
                          <benefit.icon size={24} className="text-teal-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800 mb-1">{benefit.title}</h4>
                          <p className="text-sm text-slate-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - Right Column */}
              <div className="space-y-6">
                {/* Available Doctors */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Dostępni Teraz</h3>
                  <div className="space-y-4">
                    {availableDoctors.map((doctor) => (
                      <div key={doctor.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-teal-50 transition-colors cursor-pointer">
                        <img src={doctor.avatar} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-800 text-sm truncate">{doctor.name}</h4>
                          <p className="text-xs text-slate-600">{doctor.specialty}</p>
                        </div>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full whitespace-nowrap">{doctor.availableIn}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-teal-700 hover:bg-teal-800 text-white">
                    Zobacz Wszystkich Lekarzy
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Szybkie Statystyki</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">Średni czas oczekiwania</span>
                      <span className="font-medium text-teal-700">~5 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">Lekarze online</span>
                      <span className="font-medium text-teal-700">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">Zadowolenie pacjentów</span>
                      <span className="font-medium text-teal-700">98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
