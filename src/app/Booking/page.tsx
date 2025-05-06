'use client';

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

    useEffect(() => {
        const fetchWorkers = async () => {
            const res = await fetch('/api/workers');
            const data = await res.json();
            setWorkers(data);
        };

        fetchWorkers();
    }, []);

    return (
        <main className={'flex'}>
            <Menu></Menu>
            <section className={'flex-1 col-start-1 row-start-1 grid grid-cols-3 grid-rows-5 gap-2 px-2 py-2 overflow-auto'}>
                {workers.map((worker) => (
                    <CardForBooking worker={worker} key={worker.id} />
                ))}
            </section>
        </main>
    )
}
export default Booking;