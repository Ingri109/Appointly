'use client'

import Image from "next/image";
import Human from "@/icons/Human.svg";
import Pen from "@/icons/Pen.svg";
import Calender from "@/icons/Calender.svg";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import {useState} from "react";

interface NavLinkType {
    id: number;
    link: string;
    image: string | StaticImageData;
    alt: string;
    title: string;
}

const navLinks: NavLinkType[] = [
    {id: 1, link: '/Account', image: Human, alt: 'Go to your account',  title: 'Account'},
    {id: 2, link: '/Visiting', image: Calender, alt: 'Go to your visits', title: 'Visits'},
    {id: 3, link: '/Booking', image: Pen, alt: 'Go to Booking', title: 'Booking'},
];


const Navigation = () => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div  className={'flex flex-col justify-start items-start w-full ml-8'}>
            {navLinks.map((navLink) => {
                const isHovered = hovered === navLink.id;

                return (
                    <Link
                        onMouseEnter={() => setHovered(navLink.id)}
                        onMouseLeave={() => setHovered(null)}
                        key={navLink.id} href={navLink.link} className={'flex flex-row justify-start items-center space-x-3 my-5 cursor-pointer transition hover:scale-105 '}>
                        <button className={`bg-custom1 rounded-full p-2 flex flex-col justify-center items-center cursor-pointer shadow-black  ${isHovered ? 'shadow-[0_0_16px_2px_rgba(0,0,0,0.25)]': 'shadow-[0_0_12px_1px_rgba(0,0,0,0.25)]  hover:shadow-[0_0_18px_2px_rgba(0,0,0,0.25)]'} focus:shadow-[0_0px_10px_2px_rgba(0,0,0,0.25)] focus:shadow-custom1`}>
                            <Image className={'w-7 h-7'} src={navLink.image} alt={navLink.alt} />
                        </button>
                        <label className={'text-custom5 text-[26px] font-medium cursor-pointer'}>{navLink.title}</label>
                    </Link>
                );
            })}

        </div>
    )
}

export default Navigation