import Dark from "@/icons/Dark.svg";
import Discord from "@/icons/Discord.svg";
import Github from "@/icons/GitHub.svg";
import Facebook from "@/icons/facebook.svg";
import Instagram from "@/icons/Instagram.svg";
import Translate from "@/icons/Translate.svg";
import Image from "next/image";


const SocialMedia= () => {
    return (
        <div className={'flex flex-row justify-start items-center space-x-4'}>
            <button className={'flex justify-center items-center bg-custom1 rounded-lg p-1 cursor-pointer shadow-[0_0px_10px_-1px_rgba(0,0,0,0.25)] shadow-black hover:shadow-[0_2px_12px_1px_rgba(0,0,0,0.35)] focus:shadow-[0_0px_10px_2px_rgba(0,0,0,0.25)] focus:shadow-custom1'}>
                <Image className={'h-[30px] w-[30px]'} src={Github} alt={'Github'}></Image>
            </button>
            <button className={'flex justify-center items-center bg-custom1 rounded-lg p-1 cursor-pointer shadow-[0_0px_10px_-1px_rgba(0,0,0,0.25)] shadow-black hover:shadow-[0_2px_12px_1px_rgba(0,0,0,0.35)] focus:shadow-[0_0px_10px_2px_rgba(0,0,0,0.25)] focus:shadow-custom1'}>
                <Image className={'h-[30px] w-[30px]'} src={Facebook} alt={'Facebook'}></Image>
            </button>
            <button className={'flex justify-center items-center bg-custom1 rounded-lg p-1 cursor-pointer shadow-[0_0px_10px_-1px_rgba(0,0,0,0.25)] shadow-black hover:shadow-[0_2px_12px_1px_rgba(0,0,0,0.35)] focus:shadow-[0_0px_10px_2px_rgba(0,0,0,0.25)] focus:shadow-custom1'}>
                <Image className={'h-[30px] w-[30px]'} src={Instagram} alt={'Instagram'}></Image>
            </button>
            <button className={'flex justify-center items-center bg-custom1 rounded-lg p-1 cursor-pointer shadow-[0_0px_10px_-1px_rgba(0,0,0,0.25)] shadow-black hover:shadow-[0_2px_12px_1px_rgba(0,0,0,0.35)] focus:shadow-[0_0px_10px_2px_rgba(0,0,0,0.25)] focus:shadow-custom1'}>
                <Image className={'h-[30px] w-[30px]'} src={Discord} alt={'Discord'}></Image>
            </button>
        </div>
    )
}
export default SocialMedia