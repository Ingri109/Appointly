"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stars from "@/components/Stars";
// Не забудь, що в queries.ts має бути запит, який повертає description і location!
import { GET_STAFF_MEMBER_QUERY, GET_BOOKED_SLOTS_QUERY } from "@/graphql/queries";
import { CREATE_APPOINTMENT_MUTATION } from "@/graphql/mutations";
import { ArrowLeft, MapPin, Clock, ChevronLeft, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ImageCard1 from "@/imgs/ImageCard1.png";

// 1. Оновлюємо типи, додаємо description та location
type StaffMember = {
  id: string;
  fullName: string;
  email: string;
  specialty?: string;
  location?: string;     // ✅ Додано
  description?: string;  // ✅ Додано
  dateOfBirth?: string;
};

type StaffMemberResponse = {
  staffMember: StaffMember;
};

type BookedSlotsResponse = {
  getBookedSlots: string[];
};

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

export default function WorkerPage({ params }: any) {
  const resolvedParams = use(params) as { id: string };
  const { id } = resolvedParams;
  const router = useRouter();

  // Отримуємо дані лікаря
  const { data: staffData, loading: staffLoading, error: staffError } = useQuery<StaffMemberResponse>(GET_STAFF_MEMBER_QUERY, {
    variables: { id },
    skip: !id,
  });

  console.log(staffData)

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [submitting, setSubmitting] = useState(false);

  // Форматуємо дату
  const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  // Отримуємо зайняті слоти
  const { data: slotsData } = useQuery<BookedSlotsResponse>(GET_BOOKED_SLOTS_QUERY, {
    variables: { staffId: id, date: formattedDate },
    skip: !id,
    fetchPolicy: "network-only",
  });

  const bookedSlots = slotsData?.getBookedSlots || [];

  const [createAppointment] = useMutation(CREATE_APPOINTMENT_MUTATION, {
    onCompleted: () => {
      alert("Wizyta została pomyślnie zarezerwowana!");
      router.push("/Visits");
    },
    onError: (err) => {
      alert(`Błąd rezerwacji: ${err.message}`);
    }
  });

  const handleSubmit = async () => {
    if (!id || !selectedTime) return;
    setSubmitting(true);
    try {
      await createAppointment({
        variables: {
          input: {
            staffId: id,
            date: formattedDate,
            time: selectedTime,
          }
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  // Календарна логіка
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    setSelectedTime(null);
  };

  // Render Loading/Error
  if (staffLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-custom1">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (staffError || !staffData?.staffMember) return <div className="p-10 text-center">Nie znaleziono lekarza</div>;

  const staff = staffData.staffMember;
  const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
  const dayNames = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"];
  const days = getDaysInMonth(currentMonth);

  return (
    <div className="flex flex-col min-h-screen bg-custom1">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/Booking" className="md:hidden inline-flex items-center gap-1 text-teal-600 font-medium mb-4 hover:text-teal-700">
            <ArrowLeft size={18} /><span>Powrót</span>
          </Link>

          {/* --- КАРТКА ЛІКАРЯ (ОНОВЛЕНА) --- */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-slate-100">
             <div className="flex flex-col md:flex-row gap-6">
               {/* Аватар */}
               <div className="flex-shrink-0">
                 <Image 
                    src={ImageCard1} // Тут можна додати логіку для реального фото, якщо є url
                    alt={staff.fullName} 
                    width={100} 
                    height={100} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-sm" 
                 />
               </div>

               {/* Інформація */}
               <div className="flex-1">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{staff.fullName}</h1>
                        <p className="text-teal-600 font-medium text-lg">{staff.specialty || "Lekarz specjalista"}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-lg self-start">
                        <Stars stylesStar="w-5 h-5" />
                        <span className="text-slate-700 font-bold ml-1">5.0</span>
                    </div>
                 </div>

                 {/* Локація */}
                 <div className="flex items-center gap-2 text-slate-500 mb-4">
                    <MapPin size={18} className="text-slate-400" />
                    <span>{staff.location || "Lokalizacja nieznana"}</span>
                 </div>

                 {/* Опис (Description) */}
                 <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-2">
                        <Info size={16} className="text-teal-600"/> 
                        O lekarzu
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        {staff.description 
                            ? staff.description 
                            : "Brak dodatkowego opisu dla tego specjalisty."}
                    </p>
                 </div>
               </div>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-4">
            {/* Calendar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-fit">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Wybierz datę wizyty</h3>
                <div className="flex justify-between items-center mb-6 bg-slate-50 p-2 rounded-xl">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><ChevronLeft className="text-slate-600"/></button>
                    <span className="font-bold text-slate-800 text-lg">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><ChevronRight className="text-slate-600"/></button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {dayNames.map(day => <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase py-2">{day}</div>)}
                    {days.map((day, i) => (
                        <button 
                            key={i} 
                            onClick={() => day && handleDateSelect(day)}
                            disabled={!day}
                            className={`aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200
                                ${!day ? 'invisible' : ''}
                                ${day === selectedDate.getDate() && currentMonth.getMonth() === selectedDate.getMonth()
                                ? 'bg-teal-600 text-white shadow-md scale-105' 
                                : 'hover:bg-teal-50 text-slate-700 hover:text-teal-700'}
                            `}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>

            {/* Time Slots */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg text-teal-700">
                    <Clock size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Dostępne godziny</h3>
                    <p className="text-xs text-slate-500">Dla {selectedDate.toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                {timeSlots.map(time => {
                  const isBooked = bookedSlots.includes(time);
                  return (
                    <button
                      key={time}
                      onClick={() => !isBooked && setSelectedTime(time)}
                      disabled={isBooked}
                      className={`
                        py-2.5 px-2 rounded-lg text-sm font-medium transition-all border
                        ${isBooked 
                          ? 'bg-slate-50 text-slate-300 border-transparent cursor-not-allowed line-through decoration-slate-300' 
                          : selectedTime === time 
                            ? 'bg-teal-600 text-white border-teal-600 shadow-md transform scale-105' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50'
                        }
                      `}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-xs text-slate-500 mb-1">Wybrany termin:</p>
                        <p className="text-base font-bold text-slate-800">
                             {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                        </p>
                    </div>
                    <div className="text-right">
                         <p className="text-xs text-slate-500 mb-1">Godzina:</p>
                         <p className="text-xl font-bold text-teal-600">{selectedTime || "--:--"}</p>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={submitting || !selectedTime}
                    className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-teal-200"
                >
                    {submitting ? "Przetwarzanie..." : "Potwierdź rezerwację"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}