'use client';
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToMenu from "@/components/BackToMenu";
import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// TODO: When server has appointments GraphQL queries, replace this with real data
// import { useQuery } from '@apollo/client';
// import { GET_USER_APPOINTMENTS_QUERY } from '@/graphql/queries';

type Appointment = {
    id: string;
    appointment_time: string;
    duration_minutes: number;
    staff: {
        id: string;
        fullName: string;
        specialty: string;
        roomNumber: number;
    };
};

const VisitsPage = () => {
    const router = useRouter();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (!token || !user) {
            router.push('/Login');
            return;
        }
        
        setIsAuthenticated(true);
        
        // TODO: Replace with GraphQL query when server supports appointments
        // For now, just show empty appointments
        setAppointments([]);
        setLoading(false);
    }, [router]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (!isAuthenticated || loading) {
        return (
            <div className="flex min-h-screen bg-custom1">
                <Menu />
                <div className="flex-1 flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-[#3CA6A6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-600">Ładowanie wizyt...</p>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }

    if (appointments.length === 0) {
        return (
            <div className="flex min-h-screen bg-custom1">
                <Menu />
                <div className="flex-1 flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <Calendar size={64} className="mx-auto mb-4 text-slate-300" />
                            <h2 className="text-xl font-semibold text-slate-700 mb-2">Brak zaplanowanych wizyt</h2>
                            <p className="text-slate-500 mb-4">Nie masz jeszcze żadnych wizyt</p>
                            <Button 
                                onClick={() => router.push('/Booking')}
                                className="bg-teal-600 hover:bg-teal-700 text-white"
                            >
                                Umów wizytę
                            </Button>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-custom1">
            <Menu />
            <div className="flex-1 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto px-6 py-8">
                        <BackToMenu />
                        
                        <div className="mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Moje Wizyty</h1>
                            <p className="text-slate-600">Masz {appointments.length} zaplanowanych wizyt</p>
                        </div>

                        <div className="space-y-4">
                            {appointments.map((appointment) => (
                                <div 
                                    key={appointment.id} 
                                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-800">
                                                {appointment.staff.fullName}
                                            </h3>
                                            <p className="text-teal-600 font-medium">
                                                {appointment.staff.specialty}
                                            </p>
                                            <div className="mt-2 space-y-1 text-sm text-slate-600">
                                                <p className="flex items-center gap-2">
                                                    <Calendar size={16} />
                                                    {formatDate(appointment.appointment_time)}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span>🕐</span>
                                                    {formatTime(appointment.appointment_time)} ({appointment.duration_minutes} min)
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span>📍</span>
                                                    Gabinet {appointment.staff.roomNumber}
                                                </p>
                                            </div>
                                        </div>
                                        <Button 
                                            variant="destructive"
                                            className="bg-red-500 hover:bg-red-600"
                                            onClick={() => {
                                                // TODO: Implement cancellation via GraphQL mutation
                                                alert('Funkcja anulowania będzie dostępna wkrótce');
                                            }}
                                        >
                                            Anuluj wizytę
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default VisitsPage;
