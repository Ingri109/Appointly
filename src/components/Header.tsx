import LogoImg from "@/imgs/LogoIMG.png";
import Image from "next/image";
import SotionImage from "@/components/SotionMedia";
import OtherButtons from "@/components/OtherButtons";

const Header = () => {
    return (
        <header className="bg-custom2 flex flex-row justify-between items-center shrink-0 h-[60px]">
            <Image className={"h-[60px] w-[250px] ml-5 drop-shadow-lg"} src={LogoImg} alt={"Logo Image Appointly"}></Image>
            <div className="flex flex-row justify-start items-center mx-4 space-x-4 ">
                <OtherButtons/>
                <SotionImage/>
            </div>
        </header>
    )
}

export default Header;