'use client'

import Image from "next/image";
import Human from "@/icons/Human.svg";
import Pen from "@/icons/Pen.svg";
import Calender from "@/icons/Calender.svg";
import SocialMedia from "@/components/SocialMedia";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
    {id: 1, link: '/Account', image: Human, alt: 'Przejdź do konta', title: 'Konto'},
    {id: 2, link: '/Visits', image: Calender, alt: 'Przejdź do wizyt', title: 'Wizyty'},
    {id: 3, link: '/Booking', image: Pen, alt: 'Przejdź do rezerwacji', title: 'Rezerwacja'},
    {id: 4, link: '/Consult', image: Calender, alt: 'Konsultacja online', title: 'Konsultacja Online'},
    {id: 5, link: '/ManageVisits', image: Calender, alt: 'Zarządzaj wizytami', title: 'Zarządzaj Wizytami'},
    {id: 6, link: '/UploadTests', image: Calender, alt: 'Prześlij wyniki badań', title: 'Wyniki Badań'},
    {id: 7, link: '/Plans', image: Calender, alt: 'Plany ubezpieczeniowe', title: 'Plany'},
    {id: 8, link: '/SkypeLine', image: Calender, alt: 'Konsultacje Skype/Line', title: 'Skype/LINE'},
];

const Menu = () => {
    const router = useRouter();
    const pathname = usePathname();

    // Normalize path for comparison (trim trailing slash, lowercase)
    const normalizePath = (path: string) => path.replace(/\/+$/g, '').toLowerCase();

    return (
        <aside className="hidden md:flex md:flex-col w-[220px] lg:w-[260px] h-screen sticky top-0 bg-custom2">
            {/* Title */}
            <div className="pt-6 pb-6">
                <h1 className="text-custom5 text-3xl lg:text-4xl font-bold text-center">Menu</h1>
            </div>

            {/* Navigation Items - fills remaining space */}
            <nav className="flex-1 flex flex-col justify-evenly px-4 lg:px-5">
                {navItems.map((item) => {
                    const isActive = normalizePath(pathname || '') === normalizePath(item.link);
                    
                    // Match SocialMedia button styling: base shadow, stronger hover shadow, persistent active glow
                    const buttonClasses = isActive 
                        ? "bg-teal-50 rounded-full p-2 flex items-center justify-center shadow-black flex-shrink-0 shadow-[0_0px_10px_2px_rgba(0,0,0,0.25)] ring-4 ring-teal-300"
                        : "bg-custom1 rounded-full p-2 flex items-center justify-center shadow-black flex-shrink-0 shadow-[0_0px_10px_-1px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_12px_1px_rgba(0,0,0,0.35)] transition-shadow";

                    const labelClasses = isActive 
                        ? "text-custom5 text-lg font-semibold whitespace-nowrap"
                        : "text-custom5 text-lg font-medium whitespace-nowrap";

                    return (
                        <div
                            key={item.id}
                            onClick={() => router.push(item.link)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push(item.link); }}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <button className={buttonClasses}>
                                <Image className="w-6 h-6 lg:w-7 lg:h-7" src={item.image} alt={item.alt} />
                            </button>
                            <span className={labelClasses}>{item.title}</span>
                        </div>
                    );
                })}
            </nav>

            {/* Social Media - fixed at bottom */}
            <div className="pb-6 flex justify-center">
                <SocialMedia/>
            </div>
        </aside>
    )
}

export default Menu;