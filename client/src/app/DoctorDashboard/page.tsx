'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  ClipboardList, 
  FileText, 
  Clock,
  TrendingUp,
  Video,
  MessageSquare 
} from 'lucide-react';

type StaffUser = {
  id: string;
  fullName: string;
  email: string;
  specialty?: string;
};

export default function DoctorDashboardPage() {
  const router = useRouter();
  const [staffUser, setStaffUser] = useState<StaffUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for staff authentication via localStorage
    const staffToken = localStorage.getItem('staffToken');
    const staffData = localStorage.getItem('staffUser');
    
    if (!staffToken || !staffData) {
      router.push('/DoctorLogin');
      return;
    }
    
    try {
      setStaffUser(JSON.parse(staffData));
    } catch {
      router.push('/DoctorLogin');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-custom1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Ładowanie...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Dzisiejsze Wizyty', value: '12', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    { label: 'Pacjenci w Kolejce', value: '5', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { label: 'Oczekujące Wyniki', value: '8', icon: ClipboardList, color: 'bg-amber-100 text-amber-600' },
    { label: 'Czas Oczekiwania', value: '15 min', icon: Clock, color: 'bg-teal-100 text-teal-600' },
  ];

  const upcomingAppointments = [
    { id: 1, patient: 'Jan Kowalski', time: '14:00', type: 'Konsultacja', status: 'Potwierdzona' },
    { id: 2, patient: 'Anna Nowak', time: '14:30', type: 'Kontrola', status: 'Potwierdzona' },
    { id: 3, patient: 'Piotr Wiśniewski', time: '15:00', type: 'Nowy Pacjent', status: 'Oczekujące' },
  ];

  const quickActions = [
    { label: 'Rozpocznij Wizytę', icon: Video, color: 'bg-teal-600 hover:bg-teal-700' },
    { label: 'Wyślij Receptę', icon: FileText, color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Wiadomości', icon: MessageSquare, color: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'Raporty', icon: TrendingUp, color: 'bg-slate-600 hover:bg-slate-700' },
  ];

  return (
    <div className="min-h-screen bg-custom1 flex flex-col">
      <Header />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Witaj, Dr. {staffUser?.fullName || 'Doktorze'}
            </h1>
            <p className="text-slate-600">
              Oto przegląd Twojego harmonogramu na dzisiaj
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-3xl font-bold text-slate-800">{stat.value}</span>
                </div>
                <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Upcoming Appointments */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Nadchodzące Wizyty</h2>
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-teal-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <span className="text-teal-700 font-semibold text-sm">{appointment.time}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{appointment.patient}</h3>
                        <p className="text-sm text-slate-600">{appointment.type}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Potwierdzona' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-white text-teal-700 border border-teal-700 hover:bg-teal-50">
                Zobacz Pełny Kalendarz
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Szybkie Akcje</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    className={`w-full ${action.color} text-white justify-start gap-3 py-6`}
                  >
                    <action.icon size={20} />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Ostatnia Aktywność</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 border-l-4 border-green-500 bg-green-50 rounded-r-xl">
                <FileText size={20} className="text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Recepta wysłana do pacjenta Jan Kowalski</p>
                  <p className="text-xs text-slate-500">5 minut temu</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-xl">
                <ClipboardList size={20} className="text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Wyniki badań dostępne dla Anna Nowak</p>
                  <p className="text-xs text-slate-500">15 minut temu</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-xl">
                <Video size={20} className="text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Konsultacja wideo zakończona z Piotr Mazur</p>
                  <p className="text-xs text-slate-500">1 godzinę temu</p>
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
