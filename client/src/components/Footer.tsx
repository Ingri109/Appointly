

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/appointly", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/appointly", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/appointly", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/@appointly", label: "Youtube" },
];

const Footer = () => {
    return (
        <footer className="bg-custom3 md:bg-teal-800 text-custom2 md:text-white shrink-0">
            {/* Mobile Footer */}
            <div className="md:hidden py-4 px-6 text-center">
                <p className="text-sm mb-3">Od 2025 © Appointly</p>
                <div className="flex justify-center gap-4">
                    {socialLinks.map((social) => (
                        <Link 
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="hover:text-teal-300 transition-colors"
                        >
                            <social.icon size={18} />
                        </Link>
                    ))}
                </div>
            </div>
            
            {/* Desktop Footer */}
            <div className="hidden md:flex justify-between items-center h-[60px] px-8 max-w-7xl mx-auto">
                <div className="text-sm">
                    <span>Od 2025 © Twórcy: Pavlo Satsyk & Orest Muzyka</span>
                </div>
                <div className="flex items-center gap-6">
                    <a href="mailto:Appointly.support.team@gmail.com" className="text-sm hover:text-teal-200 transition-colors">
                        Appointly.support.team@gmail.com
                    </a>
                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <Link 
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="hover:text-teal-300 transition-colors"
                            >
                                <social.icon size={18} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;