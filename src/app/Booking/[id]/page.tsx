// app/Booking/[id]/page.tsx
'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Menu from "@/components/Menu";
import Stars from "@/components/Stars";

// Тип для моделі працівника
type Worker = {
    id: string;
    fullName: string;
    email: string;
    phonenamber: string; // Збережено оригінальне написання з вашого коду
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

export default function WorkerPage({params}: { params: { id: string } }) {
    const router = useRouter();
    const [state, setState] = useState<FetchState>({
        loading: true,
        error: null,
        data: null,
    });
    const [workerId, setWorkerId] = useState<string | null>(null);

    // Спочатку отримуємо ID (асинхронно)
    useEffect(() => {
        async function resolveParams() {
            try {
                // Чекаємо на розв'язання params
                const resolvedParams = await params;
                if (resolvedParams && resolvedParams.id) {
                    setWorkerId(resolvedParams.id);
                } else {
                    setState(prev => ({...prev, loading: false, error: 'Worker ID is missing'}));
                }
            } catch (err) {
                console.error('Error resolving params:', err);
                setState(prev => ({...prev, loading: false, error: 'Error getting worker ID'}));
            }
        }

        resolveParams();
    }, [params]); // Залежність тільки від самого params об'єкта

    // Другий useEffect для отримання даних після отримання ID
    useEffect(() => {
        // Якщо ID ще не отримано, не робимо нічого
        if (!workerId) return;

        const fetchWorkerData = async () => {
            try {
                console.log('Fetching worker with ID:', workerId);

                // Виконуємо запит до API
                const res = await fetch(`/api/workers/${workerId}`);
                console.log('API response status:', res.status);

                // Отримуємо дані
                const data = await res.json();
                console.log('API response data:', data);

                if (!res.ok) {
                    // Якщо статус відповіді не OK, обробляємо помилку
                    setState(prev => ({
                        ...prev,
                        loading: false,
                        error: data.error || `Failed to fetch worker data (${res.status})`
                    }));
                    return;
                }

                // Встановлюємо отримані дані
                setState({
                    loading: false,
                    error: null,
                    data: data,
                });
            } catch (err) {
                console.error('Error fetching worker data:', err);
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: 'An unexpected error occurred while fetching data',
                }));
            }
        };

        fetchWorkerData();
    }, [workerId]); // Залежність від workerId

    // Відображення під час завантаження
    if (state.loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <p className="text-lg">Loading worker data...</p>
                </div>
            </div>
        );
    }

    // Відображення помилки
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
            <Menu/>
            <section className="flex-1 px-5 py-6">
                <div className="col-span-3 bg-white rounded-lg shadow-[0px_0px_12px_4px_rgba(0,0,0,0.30)] p-6">
                    <div className="flex flex-col">
                        <div className="flex items-start mb-8">
                            <div className="flex flex-col items-center">
                                <div className="w-50 h-50 bg-gray-500 rounded-full mb-2"></div>
                            </div>
                            <div className="ml-10 flex-1">
                                <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-3xl font-bold text-custom5">{worker.fullName}</h2>
                                </div>

                                <div className="flex flex-row justify-start items-center mb-4">
                                    <p className="text-custom3 font-semibold text-lg">E-mail:</p>
                                    <p className="text-lg font-semibold text-custom5 ml-3">{worker.email}</p>
                                </div>
                                <div className="flex flex-row justify-start items-center mb-4">
                                    <p className="text-custom3 font-semibold text-lg">Location:</p>
                                    <p className="text-lg font-semibold text-custom5 ml-3">{worker.location}</p>
                                </div>
                                <div className="flex flex-row justify-start items-center mb-4">
                                    <p className="text-custom3 font-semibold text-lg">Category:</p>
                                    <p className="text-lg font-semibold text-custom5 ml-3">{worker.category}</p>
                                </div>
                                <div className={"flex flex-row justify-start items-center space-x-2"}>
                                    <span className={'text-[20px] text-custom5 font-bold'}>5.0</span>
                                    <Stars stylesStar={'w-7 h-7'}/>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-start items-center border-t border-b border-black py-4 mb-4">
                            <h2 className={'text-4xl font-semibold text-custom2'}>Opis</h2>
                            <p className={'text-[16px] font-semibold text-custom5 mt-2'}>{worker.description}</p>
                        </div>
                        <div className='flex flex-row justify-start items-center mx-2'>
                            <div className=''>
                                <h3></h3>
                            </div>

                        </div>
                    </div>
                </div>

                <footer className="text-center text-sm text-custom3.2 mt-4">
                    Since 2025© Creators: Pavlo Satsyk & Orest Muzyka<br/>
                    <a href="mailto:Appointly.support.team@gmail.com" className="underline hover:text-custom3.1">
                        Appointly.support.team@gmail.com
                    </a>
                </footer>
            </section>
        </main>
    );
}