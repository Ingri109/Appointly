import Discord from "@/icons/Discord.svg";
import Github from "@/icons/GitHub.svg";
import Facebook from "@/icons/facebook.svg";
import Instagram from "@/icons/Instagram.svg";
import Image, {type StaticImageData} from "next/image";
import Link from "next/link";

interface IconsSocialMediaType {
    id: number;
    link: string;
    image: string | StaticImageData;
    alt: string;
}

const IconsSocialMedia: IconsSocialMediaType[] = [
    {id: 1, link: '/', image: Discord, alt: 'Go to our Discord',},
    {id: 2, link: '/', image: Github, alt: 'Go to our Github', },
    {id: 3, link: '/', image: Facebook, alt: 'Go to our Facebook',},
    {id: 4, link: '/', image: Instagram, alt: 'Go to our Instagram',},
];

const SocialMedia= () => {
    return (
        <div className={'flex flex-row justify-start items-center space-x-4'}>
            {IconsSocialMedia.map((iconSM) => (
                <Link key={iconSM.id} href={iconSM.link} className={'flex justify-center items-center bg-custom1 rounded-lg p-1 cursor-pointer transform-all shadow-[0_0px_10px_-1px_rgba(0,0,0,0.25)] shadow-black hover:scale-105 hover:shadow-[0_2px_12px_1px_rgba(0,0,0,0.35)] focus:shadow-[0_0px_10px_2px_rgba(0,0,0,0.25)] focus:shadow-custom1'}>
                    <Image className={'h-[30px] w-[30px]'} src={iconSM.image} alt={iconSM.alt}></Image>
                </Link>
            ))}
        </div>
    )
}
export default SocialMedia