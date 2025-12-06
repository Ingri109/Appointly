'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu"
import CardForBooking from "@/components/Card-for-Booking";
import { useQuery } from '@apollo/client/react';
import { GET_ALL_STAFF_QUERY } from '@/graphql/queries';

type Staff = {
    id: string;
    fullName: string;
    email: string;
    roomNumber: number;
    specialty: string;
    dateOfBirth: string;
};

type AllStaffResponse = {
    allStaff: Staff[];
};

const Booking = () => {
    const { data, loading, error } = useQuery<AllStaffResponse>(GET_ALL_STAFF_QUERY);

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex flex-1 overflow-hidden">
                    <Menu />
                    <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-slate-50 to-teal-50 md:bg-custom1">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p>Ładowanie specjalistów...</p>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex flex-1 overflow-hidden">
                    <Menu />
                    <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-slate-50 to-teal-50 md:bg-custom1">
                        <div className="text-center text-red-600">
                            <p>Błąd podczas ładowania danych: {error.message}</p>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    const staff: Staff[] = data?.allStaff || [];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1 overflow-hidden">
                <Menu />
                <section className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-teal-50 md:bg-custom1">
                    <div className="px-4 md:px-2 py-6 md:py-2">
                        <h2 className="text-slate-900 text-2xl font-semibold mb-4 md:hidden">Znajdź i Umów Wizytę</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-2">
                            {staff.map((member) => (
                                <CardForBooking 
                                    worker={{
                                        id: member.id,
                                        fullName: member.fullName,
                                        email: member.email,
                                        category: member.specialty || 'Specjalista',
                                        description: `Gabinet: ${member.roomNumber}`,
                                        url: '',
                                        room: String(member.roomNumber),
                                        location: 'Klinika',
                                        phonenamber: '',
                                        created_at: ''
                                    }} 
                                    key={member.id} 
                                />
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