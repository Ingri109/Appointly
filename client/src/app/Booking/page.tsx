'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu"
import CardForBooking from "@/components/Card-for-Booking";
import { useEffect, useState } from 'react';

type Worker = {
    id: string;
    created_at: string;
    fullName: string;
    email: string;
    phonenamber: string;
    category: string;
    description: string;
    url: string;
    room: string;
    location: string;
};

const Booking = () => {
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkers = async () => {
            const res = await fetch('/api/workers');
            const data = await res.json();
            setWorkers(data);
            setLoading(false);
        };

        fetchWorkers();
    }, []);
    if (loading) {
        return (
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex flex-1 overflow-hidden">
                                <Menu />
                                <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-slate-50 to-teal-50 md:bg-custom1">
                                    <div className="text-center">
                                        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                        <p>Ładowanie danych użytkownika...</p>
                                    </div>
                                </section>
                            </main>
                            <Footer />
                        </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1 overflow-hidden">
                <Menu />
                <section className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-teal-50 md:bg-custom1">
                    <div className="px-4 md:px-2 py-6 md:py-2">
                        <h2 className="text-slate-900 text-2xl font-semibold mb-4 md:hidden">Znajdź i Umów Wizytę</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-2">
                            {workers.map((worker) => (
                                <CardForBooking worker={worker} key={worker.id} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
export default Booking;