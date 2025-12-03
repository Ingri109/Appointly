

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-custom3 md:bg-teal-800 text-custom2 md:text-white shrink-0">
            {/* Mobile Footer */}
            <div className="md:hidden py-4 px-6 text-center">
                <p className="text-sm mb-3">Od 2025 © Appointly</p>
                <div className="flex justify-center gap-4">
                    <button className="hover:text-teal-300 transition-colors">
                        <Facebook size={18} />
                    </button>
                    <button className="hover:text-teal-300 transition-colors">
                        <Instagram size={18} />
                    </button>
                    <button className="hover:text-teal-300 transition-colors">
                        <Twitter size={18} />
                    </button>
                    <button className="hover:text-teal-300 transition-colors">
                        <Youtube size={18} />
                    </button>
                </div>
            </div>
            
            {/* Desktop Footer */}
            <div className="hidden md:flex flex-col justify-center items-center h-[50px] text-center">
                <label className="text-center text-[12px]">
                    Od 2025 © Twórcy: Pavlo Satsyk & Orest Muzyka
                </label>
                <label className="text-center text-[12px]">
                    Appointly.support.team@gmail.com
                </label>
            </div>
        </footer>
    )
}

export default Footer;