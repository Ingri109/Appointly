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
        <div className="bg-white md:bg-custom2_1 rounded-2xl md:rounded-lg p-4 md:pr-2 md:pl-2 md:py-2 shadow-sm md:shadow-none hover:shadow-md transition-shadow">
            <div className="flex gap-4">
                <div className="flex flex-col justify-start items-center md:w-[30%]">
                    <Image className="w-16 h-16 md:w-[116px] md:h-[106px] rounded-lg md:rounded-none object-cover" src={ImageCard1} alt={"Doctor"}></Image>
                    <div className="hidden md:flex flex-row justify-start items-center space-x-2 mt-2">
                        <span className="text-[15px] text-custom5 font-bold">5.0</span>
                        <Stars stylesStar="w-3 h-3"/>
                    </div>
                </div>
                
                <div className="flex-1 min-w-0 md:mt-2">
                    <h4 className="text-slate-900 md:text-custom5 font-bold text-base md:text-[18px] mb-1 truncate">{worker.fullName}</h4>
                    <p className="text-sm text-slate-500 md:text-custom5 md:font-light mb-2 line-clamp-2">{worker.description}</p>
                    
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end space-y-2 md:space-y-0 md:space-x-1">
                        <div className="flex flex-col justify-start">
                            <div className="flex flex-row items-center space-x-1 text-sm">
                                <h2 className="text-slate-600 md:text-custom5 font-semibold">Lokalizacja:</h2>
                                <span className="text-teal-700 md:text-custom3 font-bold">{worker.location}</span>
                            </div>
                            <div className="flex flex-row items-center space-x-1 text-sm">
                                <h2 className="text-slate-600 md:text-custom5 font-semibold">Kategoria:</h2>
                                <span className="text-teal-700 md:text-custom3 font-bold">{worker.category}</span>
                            </div>
                            <div className="flex md:hidden items-center gap-1 mt-1">
                                <span className="text-sm text-slate-600 font-bold">5.0</span>
                                <Stars stylesStar="w-3 h-3"/>
                            </div>
                        </div>
                        <Link 
                            href={`/Booking/${worker.id}`} 
                            className="text-sm md:text-[14px] font-medium text-white md:text-custom1 bg-teal-600 md:bg-custom3 py-2 md:py-1 px-4 rounded-xl transition-all shadow-md md:shadow-[0_0_14px_4px_rgba(0,0,0,0.35)] hover:bg-teal-700 md:hover:bg-custom3_2 hover:scale-105 md:hover:scale-110 text-center"
                        >
                            Rezerwacja
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardForBooking;