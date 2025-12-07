'use client';

import { User, Home, Calendar, Users, Video, Upload, Shield, Settings, CreditCard } from "lucide-react";
import { MobileSideMenu } from "./MobileSideMenu";
import LogoImg from "@/imgs/LogoIMG.png";
import Image from "next/image";
import SocialMedia from "@/components/SocialMedia";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: '/', label: 'Start', icon: Home },
    { href: '/Booking', label: 'Specjaliści', icon: Users },
    { href: '/Visits', label: 'Wizyty', icon: Calendar },
    { href: '/Consult', label: 'Konsultacja', icon: Video },
    { href: '/Plans', label: 'Plany', icon: Shield },
    { href: '/Payment', label: 'Płatności', icon: CreditCard },
];

const Header = () => {
    const pathname = usePathname();
    
    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname?.startsWith(href);
    };

    return (
        <header className="bg-teal-700 sticky top-0 z-50 shadow-lg">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between px-4 h-14 text-white">
                <MobileSideMenu />
                <Link href="/" className="text-xl font-bold">Appointly</Link>
                <Link href="/Account" className="p-2 hover:bg-teal-600 rounded-full transition-colors">
                    <User size={24} />
                </Link>
            </div>
            
            {/* Desktop Header - Single Row */}
            <div className="hidden md:flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <Link href="/">
                    <Image className="h-10 w-auto" src={LogoImg} alt="Appointly Logo" />
                </Link>
                
                {/* Navigation */}
                <nav className="flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                isActive(item.href)
                                    ? 'bg-white text-teal-800 shadow-md'
                                    : 'text-white hover:bg-teal-600'
                            }`}
                        >
                            <item.icon size={16} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                
                {/* Social & Account */}
                <div className="flex items-center gap-4">
                    <SocialMedia />
                    <Link 
                        href="/Account" 
                        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-full transition-colors"
                    >
                        <User size={18} />
                        <span className="text-sm font-medium">Konto</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;