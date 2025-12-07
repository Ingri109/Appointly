import Link from "next/link";
import Image from "next/image";
import { Users, Video, Upload, Shield, Calendar, Stethoscope, CreditCard } from "lucide-react";
import DesktopLogoGif from "@/imgs/Desktop_logovideo.gif";

const howItWorks = [
  { icon: Users, label: "Popularni Specjaliści", href: "/Booking", highlight: false },
  { icon: Stethoscope, label: "Konsultacja Online", href: "/Consult", highlight: true },
  { icon: Upload, label: "Prześlij Badania", href: "/UploadTests", highlight: false },
  { icon: Shield, label: "Plany (Ubezpieczenie)", href: "/Plans", highlight: true },
  { icon: CreditCard, label: "Płatności", href: "/Payment", highlight: false },
  { icon: Calendar, label: "Zarządzaj Wizytami", href: "/ManageVisits", highlight: true },
];

const Main = () => {
  return (
    <div className="flex flex-col items-center px-4 md:px-8 py-6 md:py-12 flex-1 w-full max-w-7xl mx-auto">
      
      {/* --- HEADER / LOGO SECTION --- */}
      <div className="mb-6 md:mb-10 text-center">
        {/* Mobile Logo (Simplified) */}
        <div className="md:hidden mb-4">
             <h1 className="text-2xl font-bold text-teal-900">Appointly</h1>
        </div>
        
        {/* Desktop Logo */}
        <div className="hidden md:flex justify-center">
          <Image
            src={DesktopLogoGif}
            alt="Appointly"
            width={500}
            height={300}
            className="w-[300px] lg:w-[500px] h-auto object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* --- HERO SECTION (Text + Mockup) --- */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8 md:mb-16 w-full">
        
        {/* Mobile: Phone Mockup (Slightly smaller to save space) */}
        <div className="md:hidden w-[200px] sm:w-[240px]">
          <div className="bg-slate-800 rounded-[2rem] p-1.5 shadow-xl">
            <div className="bg-sky-100 rounded-[1.7rem] overflow-hidden">
              <Image
                src={DesktopLogoGif}
                alt="Appointly Mobile"
                width={250}
                height={150}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Content: Text & CTA */}
        <div className="flex-1 text-center md:text-left max-w-xl">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-3 md:mb-4 leading-tight">
            Znajdź najlepszych <br className="hidden md:block"/>specjalistów
          </h2>
          <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">
            Przeglądaj profile lekarzy, sprawdzaj opinie i umawiaj wizyty online w kilka sekund.
          </p>
          
          <Link
            href="/Booking"
            className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-teal-200 w-full md:w-auto"
          >
            Znajdź i Umów Wizytę
          </Link>
        </div>

        {/* Desktop: Decorative Grid (Only visible on large screens) */}
        <div className="hidden md:flex flex-1 justify-center">
           <div className="bg-gradient-to-br from-teal-100 to-teal-50 rounded-3xl p-6 shadow-lg rotate-3 hover:rotate-0 transition-all duration-500">
             <div className="grid grid-cols-3 gap-3">
               {[1, 2, 3, 4, 5, 6].map((i) => (
                 <div key={i} className="w-14 h-14 bg-white/80 backdrop-blur rounded-xl shadow-sm flex items-center justify-center">
                   <Users className="w-6 h-6 text-teal-600" />
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>

      {/* --- NAVIGATION GRID (Unified Logic) --- */}
      <div className="w-full max-w-5xl flex flex-col items-center">
        <h3 className="text-slate-800 text-lg md:text-2xl font-bold mb-4 md:mb-8 self-start md:self-center">
          Jak to działa
        </h3>

        {/* Mobile: 3x2 grid, Desktop: 6 columns */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 w-full">
          {howItWorks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`
                relative flex flex-col items-center justify-center 
                p-3 md:p-5 rounded-2xl 
                transition-all duration-200 
                hover:scale-[1.02] active:scale-95
                shadow-sm hover:shadow-md
                min-h-[90px] md:min-h-[130px]
                ${item.highlight ? "bg-teal-600" : "bg-slate-100"}
              `}
            >
              <item.icon className={`w-6 h-6 md:w-8 md:h-8 mb-2 ${item.highlight ? 'text-white' : 'text-slate-700'}`} />
              <span className={`text-[10px] md:text-xs text-center font-medium leading-tight ${item.highlight ? 'text-white' : 'text-slate-700'}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Main;