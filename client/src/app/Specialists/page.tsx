'use client';

import { useQuery } from '@apollo/client/react';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import BackToMenu from '@/components/BackToMenu';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { GET_ALL_STAFF_QUERY } from '@/graphql/queries';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Award,
  Stethoscope,
  Users,
  TrendingUp
} from 'lucide-react';

type Staff = {
  id: string;
  fullName: string;
  email: string;
  roomNumber: number;
  specialty: string;
  dateOfBirth?: string;
};

type AllStaffResponse = {
  allStaff: Staff[];
};

// Mock data for ratings and stats (would come from backend in production)
const getSpecialistStats = (id: string) => ({
  rating: 4.5 + (parseInt(id.slice(-2), 16) % 5) / 10,
  reviews: 50 + (parseInt(id.slice(-3), 16) % 150),
  experience: 5 + (parseInt(id.slice(-1), 16) % 20),
  patients: 100 + (parseInt(id.slice(-4), 16) % 500),
});

export default function SpecialistsPage() {
  const { data, loading, error } = useQuery<AllStaffResponse>(GET_ALL_STAFF_QUERY);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-custom1">
        <Menu />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Ładowanie specjalistów...</p>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-custom1">
        <Menu />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
              <Stethoscope size={48} className="text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Błąd ładowania</h2>
              <p className="text-slate-600 mb-4">Nie udało się pobrać listy specjalistów</p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Spróbuj ponownie
              </Button>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  const specialists: Staff[] = data?.allStaff || [];

  return (
    <div className="flex min-h-screen bg-custom1">
      <Menu />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto bg-custom1">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <BackToMenu />
            
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-teal-100 p-2 rounded-xl">
                  <Award size={28} className="text-teal-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Popularni Specjaliści
                </h1>
              </div>
              <p className="text-slate-600">
                Poznaj naszych najlepiej ocenianych lekarzy i specjalistów
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <Users size={24} className="text-teal-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">{specialists.length}</div>
                <div className="text-sm text-slate-600">Specjalistów</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <Star size={24} className="text-amber-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">4.8</div>
                <div className="text-sm text-slate-600">Średnia ocena</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <TrendingUp size={24} className="text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">2000+</div>
                <div className="text-sm text-slate-600">Wizyt miesięcznie</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <Award size={24} className="text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">15+</div>
                <div className="text-sm text-slate-600">Lat doświadczenia</div>
              </div>
            </div>

            {/* Specialists Grid */}
            {specialists.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <Stethoscope size={48} className="text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600">Brak specjalistów</h3>
                <p className="text-slate-500">Lista specjalistów jest pusta</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specialists.map((specialist) => {
                  const stats = getSpecialistStats(specialist.id);
                  return (
                    <div 
                      key={specialist.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <Stethoscope size={28} className="text-teal-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">
                              {specialist.fullName}
                            </h3>
                            <p className="text-teal-100 text-sm">
                              {specialist.specialty || 'Specjalista'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5">
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={star <= Math.round(stats.rating) 
                                  ? 'text-amber-400 fill-amber-400' 
                                  : 'text-slate-200'
                                }
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-slate-700">
                            {stats.rating.toFixed(1)}
                          </span>
                          <span className="text-sm text-slate-500">
                            ({stats.reviews} opinii)
                          </span>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin size={16} className="text-teal-600" />
                            <span>Gabinet {specialist.roomNumber}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock size={16} className="text-teal-600" />
                            <span>{stats.experience} lat doświadczenia</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Users size={16} className="text-teal-600" />
                            <span>{stats.patients}+ pacjentów</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button 
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
                          onClick={() => window.location.href = `/Booking/${specialist.id}`}
                        >
                          <Calendar size={18} className="mr-2" />
                          Umów wizytę
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
