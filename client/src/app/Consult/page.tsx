'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BackToMenu from '@/components/BackToMenu';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Video, Clock, CheckCircle, Shield, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

const platforms = [
  { id: 'video', name: 'Wideo Online', icon: Video, description: 'Rozmowy wideo HD przez przeglądarkę', link: '/Booking' },
  { id: 'zoom', name: 'Zoom', icon: Video, description: 'Rozmowy wideo HD z udostępnianiem ekranu', link: 'https://zoom.us/join' },
  { id: 'line', name: 'LINE', icon: MessageCircle, description: 'Bezpieczne wiadomości i rozmowy głosowe', link: 'https://line.me/R/' },
  { id: 'phone', name: 'Telefon', icon: Phone, description: 'Tradycyjna konsultacja głosowa', link: 'tel:+48123456789' },
];

const benefits = [
  { icon: Video, title: 'Konsultacja Wideo', description: 'Połącz się z lekarzami przez wysokiej jakości połączenia wideo' },
  { icon: Clock, title: 'Szybki Dostęp', description: 'Uzyskaj poradę medyczną w ciągu minut, bez poczekalni' },
  { icon: Shield, title: 'Bezpieczne i Prywatne', description: 'Szyfrowane konsultacje dla Twojej prywatności' },
  { icon: CheckCircle, title: 'Recepty', description: 'Otrzymuj cyfrowe recepty natychmiast po konsultacji' },
];

const availableDoctors = [
  { id: 1, name: 'Dr. Lisa Anderson', specialty: 'Lekarz Rodzinny', availableIn: '10 min' },
  { id: 2, name: 'Dr. David Kim', specialty: 'Psychiatra', availableIn: '15 min' },
  { id: 3, name: 'Dr. Maria Santos', specialty: 'Dietetyk', availableIn: '5 min' },
];

export default function ConsultPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('video');

  return (
    <div className="flex flex-col min-h-screen bg-custom1">
      <Header />
      <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
            <BackToMenu />
            
            {/* Page Title */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-xl md:text-3xl font-bold text-slate-800 mb-2">Konsultacja Online</h1>
              <p className="text-sm md:text-base text-slate-600">Opieka zdrowotna w zaciszu Twojego domu</p>
            </div>

            {/* Platform Selection - Tabs */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg mb-6">
              <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-4">Wybierz Platformę</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex flex-col items-center p-3 md:p-4 rounded-xl transition-all ${
                      selectedPlatform === platform.id
                        ? 'bg-teal-600 text-white shadow-lg ring-2 ring-teal-400'
                        : 'bg-slate-50 text-slate-700 hover:bg-teal-50'
                    }`}
                  >
                    <platform.icon size={24} className="mb-2" />
                    <span className="text-xs md:text-sm font-medium text-center">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - Left 2 Columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* Hero Card */}
                <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-5 md:p-6 text-white shadow-lg">
                  <div className="flex items-center gap-3 md:gap-4 mb-4">
                    <div className="bg-white/20 p-3 md:p-4 rounded-xl">
                      {platforms.find(p => p.id === selectedPlatform)?.icon && (
                        <Video size={28} />
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold text-white mb-1">
                        Konsultacja przez {platforms.find(p => p.id === selectedPlatform)?.name}
                      </h2>
                      <p className="text-sm text-teal-100">Dostępne 24/7</p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-teal-50 mb-4">
                    {platforms.find(p => p.id === selectedPlatform)?.description}. 
                    Uzyskaj porady medyczne, recepty i wizyty kontrolne bez wychodzenia z domu.
                  </p>
                  {(() => {
                    const currentPlatform = platforms.find(p => p.id === selectedPlatform);
                    const isExternal = currentPlatform?.link?.startsWith('http') || 
                                      currentPlatform?.link?.startsWith('tel:');
                    
                    if (isExternal) {
                      return (
                        <a 
                          href={currentPlatform?.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full md:w-auto bg-white text-teal-700 hover:bg-teal-50 font-medium h-10 px-4 py-2 rounded-md text-sm"
                        >
                          Rozpocznij Konsultację Teraz
                        </a>
                      );
                    }
                    return (
                      <Link href={currentPlatform?.link || '/Booking'}>
                        <span className="inline-flex items-center justify-center w-full md:w-auto bg-white text-teal-700 hover:bg-teal-50 font-medium h-10 px-4 py-2 rounded-md text-sm">
                          Rozpocznij Konsultację Teraz
                        </span>
                      </Link>
                    );
                  })()}
                </div>

                {/* Benefits Grid */}
                <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg">
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-4">Dlaczego Wybrać Konsultację Online?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-3 md:gap-4 p-3 md:p-4 bg-slate-50 rounded-xl hover:bg-teal-50 transition-colors">
                        <div className="bg-teal-100 p-2 md:p-3 rounded-xl h-fit">
                          <benefit.icon size={20} className="text-teal-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800 mb-1 text-sm md:text-base">{benefit.title}</h4>
                          <p className="text-xs md:text-sm text-slate-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - Right Column */}
              <div className="space-y-6">
                {/* Available Doctors */}
                <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg">
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-4">Dostępni Teraz</h3>
                  <div className="space-y-3">
                    {availableDoctors.map((doctor) => (
                      <div key={doctor.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-teal-50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-200 flex items-center justify-center text-teal-700 font-bold">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-800 text-sm truncate">{doctor.name}</h4>
                          <p className="text-xs text-slate-600">{doctor.specialty}</p>
                        </div>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full whitespace-nowrap">{doctor.availableIn}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-teal-700 hover:bg-teal-800 text-white text-sm">
                    Zobacz Wszystkich Lekarzy
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg">
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-4">Szybkie Statystyki</h3>
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
  );
}
