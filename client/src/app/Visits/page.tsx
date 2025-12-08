'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToMenu from "@/components/BackToMenu";
import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle } from 'lucide-react'; // Додав іконки
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from "next/link";

// 1. Імпорти Apollo
import { useQuery } from '@apollo/client/react';
import { GET_MY_APPOINTMENTS_QUERY } from '@/graphql/queries';

// 2. Типи згідно з GraphQL схемою
type Staff = {
    id: string;
    fullName: string;
    specialty: string;
    location?: string;
};

type Appointment = {
    id: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    status: string; // CONFIRMED, PENDING, etc.
    staff: Staff;
};

type MyAppointmentsData = {
    myAppointments: Appointment[];
};

const VisitsPage = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 3. Перевірка авторизації
    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        
        if (!token) {
            router.push('/Login');
            return;
        }
        setIsAuthenticated(true);
    }, [router]);

    // 4. Запит даних (реальний)
    const { data, loading, error } = useQuery<MyAppointmentsData>(GET_MY_APPOINTMENTS_QUERY, {
        skip: !isAuthenticated,
        fetchPolicy: "network-only",
    });

    const appointments = data?.myAppointments || [];

    // Форматування дати
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Helper для кольорів статусу
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'text-green-600 bg-green-50 border-green-200';
            case 'PENDING': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'CANCELLED': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'Potwierdzona';
            case 'PENDING': return 'Oczekująca';
            case 'CANCELLED': return 'Anulowana';
            default: return status;
        }
    };

    // --- Loading State ---
    if (!isAuthenticated || loading) {
        return (
            <div className="flex flex-col min-h-screen bg-custom1">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full py-20">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-[#3CA6A6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-600">Ładowanie wizyt...</p>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // --- Error State ---
    if (error) {
        return (
            <div className="flex flex-col min-h-screen bg-custom1">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-4">
                    <AlertCircle className="text-red-500 mb-2" size={40} />
                    <p className="text-slate-600">Wystąpił błąd podczas pobierania danych.</p>
                    <p className="text-red-600 font-mono bg-red-50 p-4 rounded-lg text-sm max-w-2xl break-words">
                        {error.message}
                    </p>
                    <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">Spróbuj ponownie</Button>
                </main>
                <Footer />
            </div>
        );
    }

    // --- Empty State ---
    if (appointments.length === 0) {
        return (
            <div className="flex flex-col min-h-screen bg-custom1">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto px-4 py-4">
                        <BackToMenu />
                        <div className="flex flex-col items-center justify-center py-12">
                            <Calendar size={64} className="mb-4 text-slate-300" />
                            <h2 className="text-xl font-semibold text-slate-700 mb-2">Brak zaplanowanych wizyt</h2>
                            <p className="text-slate-500 mb-4">Nie masz jeszcze żadnych wizyt</p>
                            <Button 
                                onClick={() => router.push('/Booking')}
                                className="bg-teal-600 hover:bg-teal-700 text-white"
                            >
                                Umów wizytę
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // --- Main Content ---
    return (
        <div className="flex flex-col min-h-screen bg-custom1">
            <Header />
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <BackToMenu />
                    
                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Moje Wizyty</h1>
                            <p className="text-slate-600">Masz <span className="font-bold text-teal-600">{appointments.length}</span> zaplanowanych wizyt</p>
                        </div>
                        <Button 
                            onClick={() => router.push('/Booking')}
                            className="bg-teal-600 hover:bg-teal-700 text-white shadow-md"
                        >
                            + Nowa wizyta
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {appointments.map((appointment) => (
                            <div 
                                key={appointment.id} 
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-transparent hover:border-teal-100"
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    
                                    {/* Ліва колонка: Дата і час */}
                                    <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-1 md:w-40 md:border-r border-slate-100 pr-4">
                                        <div className="text-center md:text-left">
                                            <span className="block text-3xl font-bold text-slate-800 leading-none">
                                                {appointment.time}
                                            </span>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                                {new Date(appointment.date).toLocaleDateString('pl-PL', { weekday: 'short' })}
                                            </span>
                                        </div>
                                        <div className="hidden md:block w-full h-px bg-slate-100 my-2"></div>
                                        <div className="text-sm text-slate-500 font-medium">
                                            {new Date(appointment.date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                        </div>
                                    </div>

                                    {/* Центральна колонка: Інфо */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-800">
                                                    {appointment.staff.fullName}
                                                </h3>
                                                <p className="text-teal-600 font-medium">
                                                    {appointment.staff.specialty}
                                                </p>
                                            </div>
                                            {/* Статус */}
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(appointment.status)}`}>
                                                {getStatusText(appointment.status)}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                                                <Clock size={16} className="text-teal-500" />
                                                <span>30 min</span> {/* Тривалість поки хардкод або можна додати в схему */}
                                            </div>
                                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                                                <MapPin size={16} className="text-teal-500" />
                                                <span>{appointment.staff.location || "Online"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Права колонка: Кнопки */}
                                    <div className="flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-4">
                                        <Button 
                                            variant="ghost"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50 w-full justify-start"
                                            onClick={() => alert('Funkcja anulowania będzie dostępna wkrótce')}
                                        >
                                            Anuluj
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default VisitsPage;