'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardForBooking from "@/components/Card-for-Booking";
import { useQuery } from '@apollo/client/react';
import { GET_ALL_STAFF_QUERY } from '@/graphql/queries';
import { Search, SlidersHorizontal, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
    const [searchQuery, setSearchQuery] = useState("");

    const staff: Staff[] = data?.allStaff || [];
    
    const filteredStaff = staff.filter(member => 
        member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-custom1">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p>Ładowanie specjalistów...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen bg-custom1">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center text-red-600">
                        <p>Błąd podczas ładowania danych: {error.message}</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-custom1">
            <Header />
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6">
                    {/* Back to Home - Mobile Only */}
                    <Link 
                        href="/" 
                        className="md:hidden inline-flex items-center gap-1 text-teal-700 font-medium mb-4 hover:text-teal-800"
                    >
                        <ArrowLeft size={18} />
                        <span>Powrót</span>
                    </Link>

                    {/* Title */}
                    <h2 className="text-slate-900 text-lg md:text-2xl font-bold mb-4">Znajdź i umów wizytę</h2>
                    
                    {/* Search Bar */}
                    <div className="flex gap-2 mb-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Szukaj"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>
                        <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                            <SlidersHorizontal size={20} className="text-slate-600" />
                        </button>
                    </div>

                    {/* Section Title */}
                    <h3 className="text-slate-700 text-base font-medium mb-4">Nasi specjaliści</h3>
                    
                    {/* Staff List */}
                    <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                        {filteredStaff.map((member) => (
                            <CardForBooking 
                                worker={{
                                    id: member.id,
                                    fullName: member.fullName,
                                    email: member.email,
                                    category: member.specialty || 'Specjalista',
                                    description: `Gabinet: ${member.roomNumber}`,
                                    url: '',
                                    room: String(member.roomNumber),
                                    location: 'Lublin',
                                    phonenamber: '',
                                    created_at: ''
                                }} 
                                key={member.id} 
                            />
                        ))}
                    </div>
                    
                    {filteredStaff.length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                            Nie znaleziono specjalistów
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
export default Booking;