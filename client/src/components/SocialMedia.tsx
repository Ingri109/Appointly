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
    {id: 1, link: 'https://discord.gg/appointly', image: Discord, alt: 'Dołącz do naszego Discord'},
    {id: 2, link: 'https://github.com/Ingri109/Appointly', image: Github, alt: 'Zobacz na Github'},
    {id: 3, link: 'https://facebook.com/appointly', image: Facebook, alt: 'Odwiedź nasz Facebook'},
    {id: 4, link: 'https://instagram.com/appointly', image: Instagram, alt: 'Śledź nas na Instagram'},
];

const SocialMedia = () => {
    return (
        <div className="flex flex-row justify-start items-center space-x-3">
            {IconsSocialMedia.map((iconSM) => (
                <Link 
                    key={iconSM.id} 
                    href={iconSM.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={iconSM.alt}
                    className="flex justify-center items-center bg-teal-500 hover:bg-teal-400 rounded-lg p-2 cursor-pointer transition-all hover:scale-110 shadow-md"
                >
                    <Image className="h-6 w-6 brightness-0 invert" src={iconSM.image} alt={iconSM.alt} />
                </Link>
            ))}
        </div>
    );
};

export default SocialMedia;