'use client';
import Menu from "@/components/Menu";
import { useEffect, useState } from 'react';


type Worker = {
    id: string;
    fullName: string;
    location: string;
    description: string;
};

type Appointment = {
    id: string;
    appointment_time: string; // ISO string
    duration_minutes: number;
    worker: Worker;
};

const VisitsPage = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch('/api/visits');
                const data = await res.json();
                setAppointments(data.appointments || []);
            } catch (err) {
                console.error('Failed to fetch appointments', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);



    if (loading) {
        return (
            <main className="flex">
                <Menu />
                <section className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-[#3CA6A6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p>Loading user data...</p>
                    </div>
                </section>
            </main>
        );
    }
    if (appointments.length === 0)
    return (
        <main className="flex">
            <Menu />
            <section className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <p>Not fount appointments</p>
                </div>
            </section>
        </main>
    );

    return (
        <main className={'flex'}>
            <Menu></Menu>
            <section className={'flex-1 col-start-1 row-start-1 grid grid-cols-3 grid-rows-5 gap-2 px-2 py-2 overflow-auto'}>
               
            </section>
        </main>
    )
}

export default VisitsPage;