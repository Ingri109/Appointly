'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardForBooking from "@/components/Card-for-Booking";
import { useQuery } from '@apollo/client/react';
import { GET_ALL_STAFF_QUERY } from '@/graphql/queries';
import { Search, SlidersHorizontal, ArrowLeft, MapPin, Stethoscope, X } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

// Типи (краще винести в окремий файл types/staff.ts, але поки тут)
type Staff = {
    id: string;
    fullName: string;
    email: string;
    specialty?: string;
    dateOfBirth?: string;
    location?: string;
    // Інші поля, які можуть прийти з API
    roomNumber?: string;
    url?: string;
};

type AllStaffResponse = {
    allStaff: Staff[];
};

const Booking = () => {
    // Отримуємо дані з Apollo
    const { data, loading, error } = useQuery<AllStaffResponse>(GET_ALL_STAFF_QUERY);
    
    // --- СТАНИ ДЛЯ ФІЛЬТРАЦІЇ ---
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    // Отримуємо список лікарів або порожній масив
    const staff: Staff[] = data?.allStaff || [];

    // --- АВТОМАТИЧНИЙ СПИСОК СПЕЦІАЛЬНОСТЕЙ ---
    // Це створює список усіх унікальних спеціальностей, які є в базі
    const specialties = useMemo(() => {
        const specs = staff
            .map(s => s.specialty)
            .filter((item): item is string => !!item); // Прибираємо null/undefined
        return Array.from(new Set(specs)).sort(); // Лишаємо унікальні і сортуємо
    }, [staff]);

    // --- ЛОГІКА ФІЛЬТРАЦІЇ ---
    const filteredStaff = staff.filter(member => {
        // 1. Пошук по імені або спеціальності (текстовий ввід)
        const matchesSearch = 
            member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.specialty?.toLowerCase().includes(searchQuery.toLowerCase());

        // 2. Фільтр по місту
        const matchesCity = selectedCity 
            ? member.location?.toLowerCase().includes(selectedCity.toLowerCase()) 
            : true;

        // 3. Фільтр по спеціальності (випадаючий список)
        const matchesSpecialty = selectedSpecialty 
            ? member.specialty === selectedSpecialty 
            : true;

        return matchesSearch && matchesCity && matchesSpecialty;
    });

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCity("");
        setSelectedSpecialty("");
    };

    const hasActiveFilters = selectedCity || selectedSpecialty;

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-custom1">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-600">Ładowanie specjalistów...</p>
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
                    
                    {/* --- SEARCH & FILTER BUTTON --- */}
                    <div className="flex gap-2 mb-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Szukaj lekarza (imię, nazwisko, specjalizacja)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow shadow-sm"
                            />
                        </div>
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`p-3 border rounded-xl transition-all shadow-sm flex items-center justify-center ${
                                showFilters || hasActiveFilters
                                    ? 'bg-teal-50 border-teal-500 text-teal-700' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>

                    {/* --- FILTER PANEL (DROPDOWN) --- */}
                    {showFilters && (
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 animate-in slide-in-from-top-2 fade-in duration-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-slate-800">Filtrowanie</h3>
                                {hasActiveFilters && (
                                    <button 
                                        onClick={clearFilters}
                                        className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                                    >
                                        <X size={14} /> Wyczyść filtry
                                    </button>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* City Filter */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-600 flex items-center gap-1.5">
                                        <MapPin size={16} /> Lokalizacja
                                    </label>
                                    <select 
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors cursor-pointer text-slate-700"
                                    >
                                        <option value="">Wszystkie miasta</option>
                                        <option value="Lublin">Lublin</option>
                                        <option value="Kraków">Kraków</option>
                                        <option value="Wrocław">Wrocław</option>
                                        <option value="Warszawa">Warszawa</option>
                                    </select>
                                </div>

                                {/* Specialty Filter */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-600 flex items-center gap-1.5">
                                        <Stethoscope size={16} /> Specjalizacja
                                    </label>
                                    <select 
                                        value={selectedSpecialty}
                                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors cursor-pointer text-slate-700"
                                    >
                                        <option value="">Wszystkie specjalizacje</option>
                                        {specialties.map((spec) => (
                                            <option key={spec} value={spec}>{spec}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section Title */}
                    <h3 className="text-slate-700 text-base font-medium mb-4">Nasi specjaliści ({filteredStaff.length})</h3>
                    
                    {/* Staff List */}
                    <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                        {filteredStaff.map((member) => (
                            <CardForBooking 
                                worker={{
                                    id: member.id,
                                    fullName: member.fullName,
                                    email: member.email,
                                    category: member.specialty || 'Nie podano',
                                    description: member.location || '', // Використовуємо description для чогось корисного або пустого
                                    url: member.url || '', // Переконайтеся, що url є в базі або це поле для фото
                                    location: member.location || 'Brak danych',
                                    // Додаткові поля, якщо треба
                                }} 
                                key={member.id} 
                            />
                        ))}
                    </div>
                    
                    {/* No Results State */}
                    {filteredStaff.length === 0 && (
                        <div className="text-center py-10 bg-white rounded-2xl border border-slate-100 shadow-sm mt-4">
                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Search className="text-slate-400" size={32} />
                            </div>
                            <h3 className="text-slate-800 font-medium mb-1">Brak wyników</h3>
                            <p className="text-slate-500 text-sm">Spróbuj zmienić kryteria wyszukiwania.</p>
                            <button 
                                onClick={clearFilters}
                                className="mt-4 text-teal-600 font-medium hover:underline"
                            >
                                Wyczyść filtry
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Booking;