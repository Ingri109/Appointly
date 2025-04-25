import Image from "next/image";
import ImageCard1 from "@/imgs/ImageCard1.png";
import Stars from "@/components/Stars";
import Link from "next/link";

const CardForBooking = () =>{
    return (
        <div className={'flex flex-row justify-start items-start bg-custom2.1 pr-4 pl-2 py-2 rounded-lg'}>
            <div className={'flex flex-col justify-start items-center '}>
                <Image className={'w-[116px] h-[106px]'} src={ImageCard1} alt={"Doctor"}></Image>
                <div className={"flex flex-row justify-start items-center space-x-2"}>
                    <span className={'text-[15px] text-custom5 font-bold'}>5.0</span>
                    <Stars/>
                </div>
            </div>
            <div className={'flex flex-col justify-start mt-2 ml-2'}>
                <h1 className={'text-custom5 font-bold text-[18px]'}>Doctor Mr Jhonson
                    de Medica</h1>
                <p className={' text-custom5 font-light text-[14px]'}>Opis Opis Opis Opis Opis Opis Opis Opis Opis </p>
                <div className={'flex flex-row justify-between items-end space-x-1 '}>
                    <div className={'flex flex-col justify-start mt-3'}>
                        <div className={'flex flex-row justify-start space-x-1'}>
                            <h2 className={'text-custom5 font-semibold text-[14px]'}>Location:</h2>
                            <span className={'text-custom3 font-bold text-[14px]'}>Lublin</span>
                        </div>
                        <div className={'flex flex-row justify-start space-x-1'}>
                            <h2 className={'text-custom5 font-semibold text-[14px]'}>Category:</h2>
                            <span className={'text-custom3 font-bold text-[14px]'}>Surgeon</span>
                        </div>
                    </div>
                    <Link href={'/'} className={'text-[14px] font-medium text-custom1 bg-custom3 py-1 px-4 rounded-xl transition-all shadow-[0_0_14px_4px_rgba(0,0,0,0.35)] hover:bg-custom3.1 hover:scale-110 '}>
                        Appointment
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CardForBooking;