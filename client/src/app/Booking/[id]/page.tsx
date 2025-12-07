// app/Booking/[id]/page.tsx
"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stars from "@/components/Stars";
import { GET_STAFF_MEMBER_QUERY } from "@/graphql/queries";
import { ArrowLeft, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ImageCard1 from "@/imgs/ImageCard1.png";

type StaffMember = {
  id: string;
  fullName: string;
  email: string;
  roomNumber: number;
  specialty: string;
  dateOfBirth?: string;
};

type StaffMemberResponse = {
  staffMember: StaffMember;
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

export default function WorkerPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const { data, loading, error } = useQuery<StaffMemberResponse>(GET_STAFF_MEMBER_QUERY, {
    variables: { id },
    skip: !id,
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("09:30");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [submitting, setSubmitting] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    setSubmitting(true);
    try {
      alert("Rezerwacja powiodła się!");
      router.push("/Visits");
    } catch (err) {
      console.error(err);
      alert("Wystąpił nieoczekiwany błąd.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-custom1">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Ładowanie danych specjalisty...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.staffMember) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-custom1">
        <div className="text-center">
          <h2 className="text-xl text-red-600 mb-4">Błąd</h2>
          <p>{error?.message || "Nie znaleziono specjalisty"}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Powrót
          </button>
        </div>
      </div>
    );
  }

  const staff = data.staffMember;
  const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
  const dayNames = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"];
  const days = getDaysInMonth(currentMonth);

  return (
    <div className="flex flex-col min-h-screen bg-custom1">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
          {/* Back Link - Mobile Only */}
          <Link 
            href="/Booking" 
            className="md:hidden inline-flex items-center gap-1 text-teal-600 font-medium mb-4 hover:text-teal-700"
          >
            <ArrowLeft size={18} />
            <span>Powrót</span>
          </Link>

          {/* Doctor Info Card */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm mb-4">
            <div className="flex items-start gap-4">
              <Image 
                src={ImageCard1} 
                alt={staff.fullName}
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-slate-100"
              />
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">{staff.fullName}</h2>
                <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                  <MapPin size={14} />
                  <span>Lublin</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Stars stylesStar="w-4 h-4" />
                  <span className="text-sm font-medium text-slate-700 ml-1">5</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <span className="inline-block bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                Specjalizacja: {staff.specialty || "Specjalista"}
              </span>
            </div>
          </div>

          {/* Desktop: Side by side layout */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Calendar Section */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Wybierz datę</h3>
              
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <span className="font-semibold text-slate-800">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
              
              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm text-slate-500 py-2 font-medium">{day}</div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day && handleDateSelect(day)}
                    disabled={!day}
                    className={`
                      aspect-square flex items-center justify-center text-sm rounded-lg transition-colors
                      ${!day ? 'invisible' : ''}
                      ${day === selectedDate.getDate() && 
                        currentMonth.getMonth() === selectedDate.getMonth() && 
                        currentMonth.getFullYear() === selectedDate.getFullYear()
                        ? 'bg-teal-600 text-white font-semibold' 
                        : 'hover:bg-teal-50 text-slate-700'}
                    `}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-teal-600" />
                <h3 className="text-lg font-bold text-slate-900">Wybierz godzinę</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      py-3 px-4 rounded-xl text-sm font-medium transition-colors
                      ${selectedTime === time 
                        ? 'bg-teal-600 text-white shadow-md' 
                        : 'bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-700'}
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Selected Date & Time Summary */}
              <div className="mt-auto p-4 bg-teal-50 rounded-xl">
                <p className="text-sm text-teal-700 font-medium mb-1">Wybrana data i godzina:</p>
                <p className="text-lg font-bold text-teal-900">
                  {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}, {selectedTime}
                </p>
              </div>

              {/* Desktop Book Button */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="hidden md:block mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 shadow-lg hover:shadow-xl"
              >
                {submitting ? "Rezerwacja..." : "Zarezerwuj wizytę"}
              </button>
            </div>
          </div>

          {/* Book Button - Mobile Only */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="md:hidden w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors disabled:opacity-50 shadow-lg hover:shadow-xl"
          >
            {submitting ? "Rezerwacja..." : "Zarezerwuj wizytę"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}