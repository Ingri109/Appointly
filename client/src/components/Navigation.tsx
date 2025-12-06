'use client'

import Image from "next/image";
import Human from "@/icons/Human.svg";
import Pen from "@/icons/Pen.svg";
import Calender from "@/icons/Calender.svg";
import type { StaticImageData } from "next/image";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {useState} from "react";

interface NavLinkType {
    id: number;
    link: string;
    image: string | StaticImageData;
    alt: string;
    title: string;
}

const navLinks: NavLinkType[] = [
    {id: 1, link: '/Account', image: Human, alt: 'Go to your account',  title: 'Konto'},
    {id: 2, link: '/Visits', image: Calender, alt: 'Go to your visits', title: 'Odwiedziny'},
    {id: 3, link: '/Booking', image: Pen, alt: 'Go to Booking', title: 'Rezerwacja'},
    {id: 4, link: '/Consult', image: Calender, alt: 'Consult Online', title: 'Consult Online'},
    {id: 5, link: '/Popular', image: Calender, alt: 'Popular', title: 'Popular'},
    {id: 6, link: '/ManageVisits', image: Calender, alt: 'Manage Visits', title: 'Manage Visits'},
    {id: 7, link: '/UploadTests', image: Calender, alt: 'Upload medical tests', title: 'Testy'},
    {id: 8, link: '/Plans', image: Calender, alt: 'Plans', title: 'Plans'},
    {id: 9, link: '/SkypeLine', image: Calender, alt: 'Skype/Line consults', title: 'Skype/Line'},
];


export const NavItem = ({ navLink, isHovered, onHover, onLeave, onClick }: { navLink: NavLinkType, isHovered: boolean, onHover: () => void, onLeave: () => void, onClick: () => void }) => {
    return (
        <div
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { onClick(); } }}
            className={'flex flex-row justify-start items-center gap-2 lg:gap-3 cursor-pointer transition hover:scale-105'}>
            <button className={`bg-custom1 rounded-full p-2 flex flex-col justify-center items-center cursor-pointer shadow-black flex-shrink-0 ${isHovered ? 'shadow-[0_0_16px_2px_rgba(0,0,0,0.25)]': 'shadow-[0_0_12px_1px_rgba(0,0,0,0.25)]  hover:shadow-[0_0_18px_2px_rgba(0,0,0,0.25)]'} focus:shadow-[0_0px_10px_2px_rgba(0,0,0,0.25)] focus:shadow-custom1`}>
                <Image className={'w-6 h-6 lg:w-7 lg:h-7'} src={navLink.image} alt={navLink.alt} />
            </button>
            <label className={'text-custom5 text-lg font-medium cursor-pointer whitespace-nowrap'}>{navLink.title}</label>
        </div>
    );
};

const Navigation = () => {
    const [, setHovered] = useState<number | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="flex flex-col justify-start items-start w-full space-y-4">
            {navLinks.map((navLink) => {
                const clean = (s: string) => s.replace(/\/+$/g, '').toLowerCase();
                const isActive = clean(pathname || '') === clean(navLink.link);

                const containerClasses = "flex items-center gap-3 cursor-pointer select-none";
                // Match SocialMedia glow/shadow behavior (no hover scale) and make active clearly visible
                const buttonBase = "rounded-full p-2 flex items-center justify-center shadow-black flex-shrink-0 transform-all";
                const buttonState = isActive
                    ? " bg-teal-50 shadow-[0_0px_12px_2px_rgba(0,0,0,0.28)] ring-4 ring-teal-300"
                    : " bg-custom1 shadow-[0_0px_10px_-1px_rgba(0,0,0,0.25)]";

                return (
                    <div
                        key={navLink.id}
                        onMouseEnter={() => setHovered(navLink.id)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => router.push(navLink.link)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push(navLink.link); }}
                        className={containerClasses}
                    >
                        <button className={`${buttonBase}${buttonState}`}>
                            <Image className="w-6 h-6 lg:w-7 lg:h-7" src={navLink.image} alt={navLink.alt} />
                        </button>
                        <span className={`text-custom5 ${isActive ? 'font-semibold' : 'font-medium'} text-lg whitespace-nowrap`}>{navLink.title}</span>
                    </div>
                );
            })}
        </div>
    )
}

export { navLinks };
export type { NavLinkType };
export default Navigation