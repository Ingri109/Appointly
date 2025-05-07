// app/Booking/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '@/components/Menu';
import Stars from '@/components/Stars';
import { useAppointmentDate } from "@/hooks/useAppointmentDate";

type Worker = {
    id: string;
    fullName: string;
    email: string;
    phonenamber: string;
    category: string;
    description: string;
    url: string;
    room: string;
    location: string;
};

// Стани для завантаження даних
type FetchState = {
    loading: boolean;
    error: string | null;
    data: Worker | null;
};

export default function WorkerPage({
                                       params,
                                   }: {
    params: { id: string };
}) {
    const router = useRouter();
    const [state, setState] = useState<FetchState>({
        loading: true,
        error: null,
        data: null,
    });
    const [workerId, setWorkerId] = useState<string | null>(null);
    const { getDefaultDateTime, getMinDateTime } = useAppointmentDate();
    const [value, setValue] = useState(getDefaultDateTime());


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!workerId) return;

        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    workerId,
                    datetime: value,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || 'Błąd podczas rezerwacji.');
            } else {
                alert('Rezerwacja powiodła się!');
                router.push('/Visits'); // або інша сторінка
            }
        } catch (err) {
            console.error(err);
            alert('Wystąpił nieoczekiwany błąd.');
        }
    };

    useEffect(() => {
        async function resolveParams() {
            try {
                const resolved = await params;
                if (resolved?.id) setWorkerId(resolved.id);
                else
                    setState((p) => ({
                        ...p,
                        loading: false,
                        error: 'Worker ID is missing',
                    }));
            } catch (err) {
                console.error(err);
                setState((p) => ({
                    ...p,
                    loading: false,
                    error: 'Error getting worker ID',
                }));
            }
        }
        resolveParams();
    }, [params]);

    // Фетчимо дані працівника
    useEffect(() => {
        if (!workerId) return;
        (async () => {
            try {
                const res = await fetch(`/api/workers/${workerId}`);
                const data = await res.json();
                if (!res.ok) {
                    setState((p) => ({
                        ...p,
                        loading: false,
                        error: data.error || `Fetch failed (${res.status})`,
                    }));
                } else {
                    setState({ loading: false, error: null, data });
                }
            } catch (err) {
                console.error(err);
                setState((p) => ({
                    ...p,
                    loading: false,
                    error: 'Unexpected error fetching data',
                }));
            }
        })();
    }, [workerId]);

    if (state.loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg">Loading worker data...</p>
            </div>
        );
    }

    if (state.error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl text-red-600 mb-4">Error</h2>
                    <p>{state.error}</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const worker = state.data!;

    return (
        <main className="flex">
            <Menu />
            <section className="flex-1 px-5 py-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {/* — Worker Info — */}
                    <div className="flex items-start mb-8">
                        <div className="w-48 h-48 bg-gray-500 rounded-full" />
                        <div className="ml-8 flex-1">
                            <h2 className="text-3xl font-bold text-custom5">
                                {worker.fullName}
                            </h2>
                            <div className="mt-4 space-y-2">
                                <p>
                                    <span className="font-semibold text-custom3">E-mail: </span>
                                    <span className="font-semibold text-custom5">
                    {worker.email}
                  </span>
                                </p>
                                <p>
                                    <span className="font-semibold text-custom3">Location: </span>
                                    <span className="font-semibold text-custom5">
                    {worker.location}
                  </span>
                                </p>
                                <p>
                                    <span className="font-semibold text-custom3">Category: </span>
                                    <span className="font-semibold text-custom5">
                    {worker.category}
                  </span>
                                </p>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl font-bold text-custom5">5.0</span>
                                    <Stars stylesStar="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-b border-black py-4 mb-6 text-center">
                        <h3 className="text-4xl font-semibold text-custom2">Opis</h3>
                        <p className="mt-2 text-custom5 font-semibold">
                            {worker.description}
                        </p>
                    </div>


                    <div className="flex flex-row justify-between items-end lg:flex-row gap-8 w-full lg:w-1/1">
                        {/* Schedule table */}
                        <div className="flex-1 bg-[#E8F5F2] p-4 rounded-2xl border-2 border-[#004D5A]">
                            <h4 className="text-xl font-bold text-[#003237] mb-4 text-center">
                                Dni i godziny pracy
                            </h4>
                            <table className="w-full border-separate border-spacing-y-2">
                                <tbody>
                                {[
                                    ['Poniedziałek', '08:00 - 16:00'],
                                    ['Wtorek', '08:00 - 16:00'],
                                    ['Środa', '08:00 - 16:00'],
                                    ['Czwartek', '08:00 - 16:00'],
                                    ['Piątek', '08:00 - 16:00'],
                                    ['Sobota', 'Nie pracujemy'],
                                    ['Niedziela', 'Nie pracujemy'],
                                ].map(([day, hours]) => (
                                    <tr
                                        key={day}
                                        className="bg-white rounded-lg overflow-hidden hover:scale-105 hover:shadow-lg hover:p"
                                    >
                                        <td className="px-2 py-1 text-[12px] font-semibold text-[#004D5A]">
                                            {day}
                                        </td>
                                        <td className="px-2 py-1 text-[12px] font-semibold text-[#2AA79B] text-right">
                                            {hours}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Date-picker form */}
                        <form onSubmit={handleSubmit} className="flex flex-col w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-md border border-gray-300">
                            <label
                                htmlFor="visit-date"
                                className="block mb-2 text-lg font-semibold text-[#004D5A]"
                            >
                                Wybierz datę wizyty:
                            </label>
                            <input
                                type="datetime-local"
                                value={value}
                                onChange={handleChange}
                                min={getMinDateTime()}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />

                            <button
                                type="submit"
                                className="bg-[#00545E] hover:bg-[#2D7C88] text-custom1 text-lg font-semibold py-2 px-10 rounded-xl mt-3 hover:scale-105 transition"
                            >
                                Zarezerwuj termin
                            </button>
                        </form>
                    </div>
                </div>

                <footer className="text-center text-sm text-custom3.2 mt-8">
                    Since 2025© Creators: Pavlo Satsyk & Orest Muzyka
                    <br />
                    <a
                        href="mailto:Appointly.support.team@gmail.com"
                        className="underline hover:text-custom3.1"
                    >
                        Appointly.support.team@gmail.com
                    </a>
                </footer>
            </section>
        </main>
    );
}
