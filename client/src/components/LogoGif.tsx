import Gif from '@/imgs/Appointly.gif'
import Image from "next/image";
export default function  LogoGif()  {
    return(
        <Image src={Gif} alt="LogoGif" className={'w-full h-full aspect-video border-x-2 border-custom3'} />
    )
}