import Header from '@/components/Header';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Video, MessageCircle, Phone, CheckCircle } from 'lucide-react';
import BackToMenu from '@/components/BackToMenu';

const platforms = [
  { name: 'Skype', icon: Video, description: 'Rozmowy wideo HD z udostępnianiem ekranu', available: true },
  { name: 'LINE', icon: MessageCircle, description: 'Bezpieczne wiadomości i rozmowy głosowe', available: true },
  { name: 'Połączenie Telefoniczne', icon: Phone, description: 'Tradycyjna konsultacja głosowa', available: true },
];

const features = [
  'Połącz się przez preferowanej platformy',
  'Ta sama jakość usług zdrowotnych',
  'Bezpieczna i szyfrowana komunikacja',
  'Udostępniaj pliki i obrazy podczas rozmowy',
  'Nagrywaj konsultacje (za zgodą)',
  'Natychmiastowe potwierdzenia wizyt',
];

const upcomingCalls = [
  { id: 1, doctor: 'Dr. Sarah Mitchell', specialty: 'Cardiologist', date: 'Dec 1, 2025', time: '10:00 AM', platform: 'Skype', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop' },
  { id: 2, doctor: 'Dr. James Chen', specialty: 'Dermatologist', date: 'Dec 3, 2025', time: '2:30 PM', platform: 'LINE', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop' },
];

export default function SkypeLinePage() {
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
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Konsultacje Skype/LINE</h1>
              <p className="text-slate-600">Połącz się używając swojej ulubionej platformy</p>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Hero Banner */}
                <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 p-4 rounded-xl">
                      <Video size={36} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-1">Elastyczna Komunikacja</h2>
                      <p className="text-teal-100">Połącz się używając aplikacji, które już znasz i którym ufasz</p>
                    </div>
                  </div>
                  <p className="text-teal-50 mb-4">Obsługujemy wiele platform, abyś mógł połączyć się z lekarzami za pomocą aplikacji, które już znasz i którym ufasz. Jakość wideo HD z bezpiecznymi, szyfrowanymi połączeniami.</p>
                  <div className="flex gap-2">
                    <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium">Skype</span>
                    <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium">LINE</span>
                    <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium">Telefon</span>
                  </div>
                </div>

                {/* Available Platforms - Horizontal Grid */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Dostępne Platformy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {platforms.map((platform, index) => (
                      <div key={index} className="bg-slate-50 rounded-xl p-4 text-center hover:bg-teal-50 transition-colors">
                        <div className="bg-white p-4 rounded-xl mb-3 mx-auto w-fit shadow-sm">
                          <platform.icon size={28} className="text-teal-600" />
                        </div>
                        <h4 className="font-semibold text-slate-800 mb-1">{platform.name}</h4>
                        <p className="text-sm text-slate-600 mb-2">{platform.description}</p>
                        {platform.available && (
                          <div className="flex items-center justify-center gap-1 text-green-600 text-sm">
                            <CheckCircle size={14} />
                            <span>Dostępne</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Calls */}
                {upcomingCalls.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Nadchodzące Połączenia</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {upcomingCalls.map((call) => (
                        <div key={call.id} className="border border-slate-200 rounded-xl p-4 hover:border-teal-300 hover:shadow-md transition-all">
                          <div className="flex gap-4 mb-4">
                            <img src={call.avatar} alt={call.doctor} className="w-16 h-16 rounded-xl object-cover shadow" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-800 mb-1">{call.doctor}</h4>
                              <p className="text-sm text-slate-600 mb-2">{call.specialty}</p>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{call.date}</span>
                                <span>•</span>
                                <span>{call.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-teal-50 rounded-xl">
                            <span className="text-sm text-teal-700 font-medium">Platforma: {call.platform}</span>
                            <Button size="sm" className="bg-teal-700 hover:bg-teal-800 text-white rounded-lg">Dołącz</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar - Features + CTA */}
              <div className="space-y-6">
                
                {/* Features List */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Funkcje Platformy</h3>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book Now CTA */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
                  <h3 className="text-lg font-semibold mb-3">Gotowy do Połączenia?</h3>
                  <p className="text-sm text-slate-300 mb-4">Zarezerwuj konsultację wideo ze specjalistą już dziś.</p>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3">
                    <Video size={18} className="mr-2" />
                    Zarezerwuj Konsultację Wideo
                  </Button>
                </div>

                {/* Quick Help */}
                <div className="bg-teal-50 rounded-2xl p-5 border border-teal-100">
                  <h4 className="font-medium text-teal-900 mb-2">Potrzebujesz Pomocy?</h4>
                  <p className="text-sm text-teal-700 mb-3">Nasz zespół wsparcia może pomóc Ci skonfigurować preferowanej platformy.</p>
                  <Button variant="outline" size="sm" className="text-teal-700 border-teal-600 hover:bg-teal-100 rounded-lg">
                    Skontaktuj się ze Wsparciem
                  </Button>
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
