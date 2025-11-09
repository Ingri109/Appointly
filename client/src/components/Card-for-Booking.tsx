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
        <div className={'flex flex-row justify-start items-start bg-custom2.1 pr-2 pl-2 py-2 rounded-lg'}>
            <div className={'flex flex-col justify-start items-center w-[30%]'}>
                <Image className={'w-[116px] h-[106px]'} src={ImageCard1} alt={"Doctor"}></Image>
                <div className={"flex flex-row justify-start items-center space-x-2"}>
                    <span className={'text-[15px] text-custom5 font-bold'}>5.0</span>
                    <Stars stylesStar={'w-3 h-3'}/>
                </div>
            </div>
            <div className={'flex flex-col justify-start mt-2 ml-2 w-[70%]'}>
                <h1 className={'text-custom5 font-bold text-[18px]'}>{worker.fullName}</h1>
                <p className={' text-custom5 font-light text-[14px] line-clamp-2'}>{worker.description}</p>
                <div className={'flex flex-row justify-between items-end space-x-1 '}>
                    <div className={'flex flex-col justify-start mt-3'}>
                        <div className={'flex flex-row justify-start space-x-1'}>
                            <h2 className={'text-custom5 font-semibold text-[14px]'}>Lokalizacja:</h2>
                            <span className={'text-custom3 font-bold text-[14px]'}>{worker.location}</span>
                        </div>
                        <div className={'flex flex-row justify-start space-x-1'}>
                            <h2 className={'text-custom5 font-semibold text-[14px]'}>Kategoria:</h2>
                            <span className={'text-custom3 font-bold text-[14px]'}>{worker.category}</span>
                        </div>
                    </div>
                    <Link href={`/Booking/${worker.id}`} className={ 'text-[14px] font-medium text-custom1 bg-custom3 py-1 px-4 rounded-xl transition-all shadow-[0_0_14px_4px_rgba(0,0,0,0.35)] hover:bg-custom3.1 hover:scale-110 '}>
                        Rezerwacja
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CardForBooking;