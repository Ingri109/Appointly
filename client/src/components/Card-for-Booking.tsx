import Image from "next/image";
import ImageCard1 from "@/imgs/ImageCard1.png";
import Stars from "@/components/Stars";
import Link from "next/link";
import { Worker } from "@/types/worker"

type CardForBookingProps = {
    worker: Worker;
};

const CardForBooking = ( {worker}: CardForBookingProps) =>{
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <Image 
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-slate-100" 
                        src={ImageCard1} 
                        alt={worker.fullName || "Lekarz"}
                        width={64}
                        height={64}
                    />
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <div className="min-w-0">
                        <h4 className="text-slate-900 font-bold text-base truncate">{worker.fullName}</h4>
                        <div className="text-sm text-slate-500 space-y-0.5">
                            <p>Lokalizacja: <span className="text-slate-700">{worker.location}</span></p>
                            <p>Specjalizacja: <span className="text-slate-700">{worker.category}</span></p>
                        </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                            <Stars stylesStar="w-4 h-4"/>
                            <span className="text-sm text-slate-600 font-medium ml-1">5</span>
                        </div>
                        <Link 
                            href={`/Booking/${worker.id}`} 
                            className="text-sm font-medium text-white bg-teal-600 py-2 px-4 rounded-full hover:bg-teal-700 transition-all hover:scale-105"
                        >
                            Umów wizytę
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardForBooking;