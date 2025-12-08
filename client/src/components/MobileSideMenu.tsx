"use client";
import { Menu, User, X, Calendar, BookOpen, LogOut, Stethoscope, Upload, Shield, CreditCard, Settings } from "lucide-react";
import Link from 'next/link';
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const menuItems = [
  { icon: User, label: "Konto", href: "/Account" },
  { icon: Calendar, label: "Wizyty", href: "/Visits" },
  { icon: BookOpen, label: "Rezerwacja", href: "/Booking" },
  { icon: Stethoscope, label: "Konsultacja Online", href: "/Consult" },
  { icon: Upload, label: "Wyniki Badań", href: "/UploadTests" },
  { icon: Shield, label: "Plany Ubezpieczeniowe", href: "/Plans" },
  { icon: CreditCard, label: "Płatności", href: "/Payment" },
  { icon: Settings, label: "Zarządzaj Wizytami", href: "/ManageVisits" },
];

interface UserData {
  name?: string;
  email?: string;
}

export function MobileSideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setIsOpen(false);
    router.push('/');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="p-2 hover:bg-teal-600 rounded-lg transition-colors"
        aria-label="Otwórz menu"
      >
        <Menu size={24} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-teal-700 text-white p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-teal-600 rounded-lg transition-colors"
              aria-label="Zamknij menu"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-4 mt-8">
              <Avatar className="w-16 h-16 border-2 border-white">
                <AvatarFallback className="bg-teal-100 text-teal-700 text-xl">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white font-medium">{user?.name || 'Gość'}</h3>
                <p className="text-teal-100 text-sm truncate max-w-[140px]">{user?.email || 'Zaloguj się'}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-teal-50 text-slate-700 hover:text-teal-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <Separator className="my-4" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-slate-700 hover:text-red-600 transition-colors w-full"
            >
              <LogOut size={20} />
              <span>Wyloguj się</span>
            </button>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">Appointly © 2025</p>
          </div>
        </div>
      </div>
    </>
  );
}
