import Header from '@/components/Header';
import Menu from '@/components/Menu';
import BackToMenu from '@/components/BackToMenu';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Video, CheckCircle } from 'lucide-react';

const upcomingVisits = [
  { id: 1, doctor: 'Dr. Sarah Mitchell', specialty: 'Cardiologist', date: 'December 1, 2025', time: '10:00 AM', type: 'video', location: 'Online', status: 'confirmed', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop' },
  { id: 2, doctor: 'Dr. James Chen', specialty: 'Dermatologist', date: 'December 5, 2025', time: '2:30 PM', type: 'in-person', location: '123 Medical Center, LA', status: 'confirmed', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop' },
];

const pastVisits = [
  { id: 3, doctor: 'Dr. Emily Rodriguez', specialty: 'Pediatrician', date: 'November 15, 2025', time: '11:00 AM', type: 'video', status: 'completed', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop' },
  { id: 4, doctor: 'Dr. Michael Brown', specialty: 'Orthopedic Surgeon', date: 'November 8, 2025', time: '3:00 PM', type: 'in-person', status: 'completed', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop' },
];

export default function ManageVisitsPage() {
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
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Zarządzaj Wizytami</h1>
              <p className="text-slate-600">Przeglądaj i zarządzaj swoimi wizytami</p>
            </div>

            {/* Stats Cards - Top Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 text-center shadow-lg">
                <div className="text-3xl font-bold text-teal-700 mb-1">{upcomingVisits.length}</div>
                <div className="text-sm text-slate-600">Nadchodzące</div>
              </div>
              <div className="bg-white rounded-xl p-5 text-center shadow-lg">
                <div className="text-3xl font-bold text-slate-700 mb-1">{pastVisits.length}</div>
                <div className="text-sm text-slate-600">Zakończone</div>
              </div>
              <div className="bg-white rounded-xl p-5 text-center shadow-lg">
                <div className="text-3xl font-bold text-slate-400 mb-1">0</div>
                <div className="text-sm text-slate-600">Anulowane</div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Upcoming Visits - Spans 2 Columns */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">Nadchodzące Wizyty</h2>
                  <span className="text-sm text-teal-600 font-medium">{upcomingVisits.length} wizyt</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingVisits.map((visit) => (
                    <div key={visit.id} className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex gap-4 mb-4">
                        <img src={visit.avatar} alt={visit.doctor} className="w-16 h-16 rounded-xl object-cover shadow" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 mb-1">{visit.doctor}</h3>
                          <p className="text-sm text-slate-600 mb-2">{visit.specialty}</p>
                          <div className="flex items-center gap-1">
                            <CheckCircle size={14} className="text-green-600" />
                            <span className="text-xs text-green-600 font-medium">Potwierdzona</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4 bg-slate-50 rounded-xl p-3">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Calendar size={16} className="text-teal-600" />
                          <span>{visit.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Clock size={16} className="text-teal-600" />
                          <span>{visit.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          {visit.type === 'video' ? (
                            <>
                              <Video size={16} className="text-teal-600" />
                              <span>Rozmowa Wideo - {visit.location}</span>
                            </>
                          ) : (
                            <>
                              <MapPin size={16} className="text-teal-600" />
                              <span>{visit.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="text-slate-600 border-slate-300 hover:bg-slate-50 rounded-xl text-sm">Przenieś</Button>
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 rounded-xl text-sm">Anuluj</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar - Past Visits + Quick Actions */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-5 text-white shadow-lg">
                  <h3 className="text-lg font-semibold mb-3">Szybkie Akcje</h3>
                  <Button className="w-full bg-white text-teal-700 hover:bg-teal-50 rounded-xl mb-3">
                    <Calendar size={18} className="mr-2" />
                    Umów Nową Wizytę
                  </Button>
                  <p className="text-sm text-teal-100">Musisz spotkać się z lekarzem? Zarezerwuj swoją kolejną wizytę teraz.</p>
                </div>

                {/* Past Visits */}
                <div className="bg-white rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-800">Przeszłe Wizyty</h3>
                    <span className="text-xs text-slate-500">{pastVisits.length} zakończonych</span>
                  </div>
                  <div className="space-y-3">
                    {pastVisits.map((visit) => (
                      <div key={visit.id} className="p-3 bg-slate-50 rounded-xl">
                        <div className="flex gap-3 mb-2">
                          <img src={visit.avatar} alt={visit.doctor} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-slate-800 text-sm truncate">{visit.doctor}</h4>
                            <p className="text-xs text-slate-500">{visit.specialty}</p>
                            <p className="text-xs text-slate-400 mt-1">{visit.date}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full text-teal-700 border-teal-600 hover:bg-teal-50 rounded-lg text-xs">
                          Umów Ponownie
                        </Button>
                      </div>
                    ))}
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
