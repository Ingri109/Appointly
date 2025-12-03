import { User } from "lucide-react";
import { MobileSideMenu } from "./MobileSideMenu";
import LogoImg from "@/imgs/LogoIMG.png";
import Image from "next/image";
import SotionImage from "@/components/SocialMedia";
import OtherButtons from "@/components/OtherButtons";

const Header = () => {
    return (
        <header className="bg-custom2 md:bg-teal-700 flex flex-row justify-between items-center shrink-0 h-[60px] md:px-6 md:py-4">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between w-full px-4 text-white">
                <MobileSideMenu />
                <h1 className="text-xl font-semibold">Appointly</h1>
                <button className="p-2 hover:bg-teal-600 rounded-full transition-colors">
                    <User size={24} />
                </button>
            </div>
            
            {/* Desktop Header */}
            <div className="hidden md:flex flex-row justify-between items-center w-full">
                <Image className={"h-[60px] w-[250px] drop-shadow-lg"} src={LogoImg} alt={"Logo Image Appointly"}></Image>
                <div className="flex flex-row justify-start items-center space-x-4">
                    <OtherButtons/>
                    <SotionImage/>
                </div>
            </div>
        </header>
    )
}

export default Header;