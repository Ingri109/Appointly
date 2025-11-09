import Image from "next/image";
import Translate from "@/icons/Translate.svg";
import Dark from "@/icons/Dark.svg";

const OtherButtons = () => {
    return (
        <div className="flex flex-row justify-start items-center space-x-4">
            <button className={'flex justify-center items-center bg-custom1 rounded-lg p-1.5 cursor-pointer shadow-[0_0px_10px_-1px_rgba(0,0,0,0.25)] shadow-black hover:shadow-[0_2px_12px_1px_rgba(0,0,0,0.35)] focus:shadow-[0_0px_10px_2px_rgba(0,0,0,0.25)] focus:shadow-custom1'}>
                <Image className={'h-[26px] w-[40px]'} src={Translate} alt={'Translate'}></Image>
            </button>
            <button className={'flex justify-center items-center bg-custom1 rounded-lg p-1.5 cursor-pointer shadow-[0_0px_10px_-1px_rgba(0,0,0,0.25)] shadow-black hover:shadow-[0_2px_12px_1px_rgba(0,0,0,0.35)] focus:shadow-[0_0px_10px_2px_rgba(0,0,0,0.25)] focus:shadow-custom1'}>
                <Image className={'h-[26px] w-[26px]'} src={Dark} alt={'Translate'}></Image>
            </button>
        </div>
    )
}

export default OtherButtons;