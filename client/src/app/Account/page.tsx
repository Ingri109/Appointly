"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useApolloClient } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Pencil,
  Clock,
  X,
  Check,
} from "lucide-react";

// Імпорти запитів
import { GET_USER_BY_ID, GET_MY_APPOINTMENTS_QUERY } from "@/graphql/queries"; 
import { LOGOUT_MUTATION, UPDATE_USER_MUTATION } from "@/graphql/mutations"; 

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCard1 from "@/imgs/ImageCard1.png";

// --- ТИПИ ---

interface UserData {
  id: string;
  name: string;
  email: string;
  dateOfBirth?: string;
  phone?: string;
  address?: string;
}

// Тип для візиту з бекенду
interface Appointment {
  id: string;
  date: string;
  time: string;
  status: string;
  staff: {
    fullName: string;
    specialty: string;
  };
}

interface GetUserData {
  user: UserData;
}

interface GetAppointmentsData {
  myAppointments: Appointment[];
}

interface GetUserVars {
  id: string;
}

const Account: React.FC = () => {
  const router = useRouter();
  const client = useApolloClient();

  // Стани
  const [activeTab, setActiveTab] = useState<"dashboard" | "profile">("dashboard");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<UserData>>({});

  // 1. Отримуємо ID
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/Login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.id) {
        setUserId(parsedUser.id);
      }
    } catch (e) {
      console.error("Failed to parse user");
      router.push("/Login");
    }
  }, [router]);

  // 2. Запит користувача
  const { data: userDataResponse, loading: userLoading, error: userError } = useQuery<GetUserData, GetUserVars>(
    GET_USER_BY_ID,
    {
      variables: { id: userId || "" },
      skip: !userId,
      fetchPolicy: "network-only",
    }
  );

  // 3. Запит візитів
  const { data: appointmentsResponse } = useQuery<GetAppointmentsData>(
    GET_MY_APPOINTMENTS_QUERY,
    {
      skip: !userId,
      fetchPolicy: "network-only",
    }
  );

  // Мутації
  const [logout] = useMutation(LOGOUT_MUTATION);
  const [updateUser, { loading: saving }] = useMutation(UPDATE_USER_MUTATION);

  const userData: UserData | null = userDataResponse?.user
    ? {
        ...userDataResponse.user,
        phone: userDataResponse.user.phone || "Numer telefonu",
        address: userDataResponse.user.address || "Nie podano", 
        dateOfBirth: userDataResponse.user.dateOfBirth || "Nie podano"
      }
    : null;

  // Беремо останні візити (наприклад, 3 штуки)
  const recentAppointments = appointmentsResponse?.myAppointments.slice(0, 3) || [];

  // Форматувальник дати (щоб було як у дизайні: "5 Gru, 2025")
  const formatDesignDate = (dateStr: string) => {
    const date = new Date(dateStr);
    // Отримуємо "5 gru"
    const dayMonth = date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' });
    // Робимо місяць з великої літери "5 Gru"
    const capitalized = dayMonth.replace(/([a-zşżźcw]+)/, (match) => match.charAt(0).toUpperCase() + match.slice(1));
    const year = date.getFullYear();
    return `${capitalized}, ${year}`;
  };

  // --- HANDLERS ---

  const handleLogout = async () => {
    try {
      if (userData?.id) {
        await logout({ variables: { userId: userData.id } });
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      await client.resetStore();
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      router.push("/");
    }
  };

  const handleEditStart = () => {
    if (userData) {
      setEditForm({
        name: userData.name,
        email: userData.email,
        phone: userData.phone === "Numer telefonu" ? "" : userData.phone,
        dateOfBirth: userData.dateOfBirth === "Nie podano" ? "" : userData.dateOfBirth,
        address: userData.address === "Nie podano" ? "" : userData.address,
      });
      setIsEditing(true);
    }
  };

  const handleEditSave = async () => {
    if (!userData || !editForm.name) return;
    try {
      await updateUser({
        variables: {
          updateUserInput: {
            id: userData.id,
            name: editForm.name,
            email: editForm.email,
            dateOfBirth: editForm.dateOfBirth,
            phone: editForm.phone,
            address: editForm.address
          },
        },
      });
      const updatedLocalStorageUser = { ...userData, ...editForm };
      localStorage.setItem("user", JSON.stringify(updatedLocalStorageUser));
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      alert("Не вдалося оновити дані.");
    }
  };

  if (userLoading || !userId) {
    return (
      <div className="flex flex-col min-h-screen bg-custom1">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (userError || !userData) {
    return (
      <div className="flex flex-col min-h-screen bg-custom1">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
            <p className="text-red-500 mb-4">Błąd pobierania danych.</p>
            <button onClick={() => { localStorage.clear(); router.push("/Login"); }} className="bg-teal-600 text-white px-4 py-2 rounded">Wróć do logowania</button>
        </main>
        <Footer />
      </div>
    );
  }

  // --- DASHBOARD CONTENT (ТВІЙ ДИЗАЙН) ---
  const DashboardContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-800 font-bold text-lg">
            Nadchodzące wizyty
          </h3>
          <Link
            href="/Visits"
            className="text-teal-600 text-sm font-medium hover:text-teal-700"
          >
            Zobacz wszystkie
          </Link>
        </div>
        <div className="space-y-4">
          {/* Якщо немає візитів, можна показати заглушку, або пустий список */}
          {recentAppointments.length === 0 && (
             <p className="text-sm text-slate-500 text-center py-4">Brak zaplanowanych wizyt</p>
          )}

          {/* Використовуємо реальні дані (recentAppointments) замість mockAppointments */}
          {recentAppointments.map((apt) => (
            <div
              key={apt.id}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
            >
              <Image
                src={ImageCard1} // Поки заглушка, бо у юзера немає фото лікаря в API
                alt={apt.staff.fullName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-800 truncate">
                  {apt.staff.fullName}
                </h4>
                <p className="text-sm text-slate-500">{apt.staff.specialty}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {formatDesignDate(apt.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {apt.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- PROFILE CONTENT ---
  const ProfileContent = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-800 font-bold text-lg">Dane osobowe</h3>
          {isEditing ? (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="p-2 text-slate-400 hover:text-red-600 bg-red-50 rounded-lg"><X size={18} /></button>
              <button onClick={handleEditSave} disabled={saving} className="p-2 text-slate-400 hover:text-teal-600 bg-teal-50 rounded-lg"><Check size={18} /></button>
            </div>
          ) : (
            <button onClick={handleEditStart} className="p-2 text-slate-400 hover:text-teal-600 bg-teal-50 rounded-lg"><Pencil size={18} /></button>
          )}
        </div>

        <div className="space-y-4">
          {/* Name */}
          {isEditing && (
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-teal-600 text-sm mb-1">Imię i Nazwisko</p>
                <input type="text" value={editForm.name || ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="text-teal-600 mt-2" size={20} />
            <div className="flex-1">
              <p className="text-teal-600 text-sm mb-1">E-mail</p>
              {isEditing ? (
                <input type="email" value={editForm.email || ""} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              ) : (
                <p className="text-slate-800">{userData?.email}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <Phone className="text-teal-600 mt-2" size={20} />
            <div className="flex-1">
              <p className="text-teal-600 text-sm mb-1">Telefon</p>
              {isEditing ? (
                <input type="tel" value={editForm.phone || ""} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="+48..." />
              ) : (
                <p className="text-slate-800">{userData?.phone}</p>
              )}
            </div>
          </div>
          
           {/* Address */}
           <div className="flex items-start gap-3">
            <MapPin className="text-teal-600 mt-2" size={20} />
            <div className="flex-1">
              <p className="text-teal-600 text-sm mb-1">Adres</p>
              {isEditing ? (
                <input type="text" value={editForm.address || ""} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="ul. ..." />
              ) : (
                <p className="text-slate-800">{userData?.address}</p>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex items-start gap-3">
            <Calendar className="text-teal-600 mt-2" size={20} />
            <div className="flex-1">
              <p className="text-teal-600 text-sm mb-1">Data urodzenia</p>
              {isEditing ? (
                <input type="date" value={editForm.dateOfBirth || ""} onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              ) : (
                <p className="text-slate-800">{userData?.dateOfBirth}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleLogout} className="w-full py-3 text-red-600 font-medium bg-white rounded-xl shadow-sm hover:bg-red-50 transition-colors">Wyloguj się</button>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-custom1">
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <Header />
        <div className="bg-teal-700 pt-2 px-4">
          <Link href="/" className="inline-flex items-center text-white">
            <ArrowLeft size={24} />
          </Link>
        </div>
        <div className="bg-teal-700 pb-6 pt-2 flex flex-col items-center">
          <div className="relative mb-3">
            <Image
              src={ImageCard1}
              alt={userData?.name || "User"}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full border-4 border-white object-cover"
            />
          </div>
          <h2 className="text-white text-lg font-bold">{userData?.name}</h2>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto bg-slate-100">
        {/* Mobile Tabs */}
        <div className="md:hidden px-4 py-4">
          <div className="flex bg-white rounded-xl shadow-lg p-1.5 mb-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg ${
                activeTab === "dashboard" ? "bg-teal-600 text-white" : "text-slate-600"
              }`}
            >
              Pulpit
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg ${
                activeTab === "profile" ? "bg-teal-600 text-white" : "text-slate-600"
              }`}
            >
              Profil
            </button>
          </div>
          {activeTab === "dashboard" ? <DashboardContent /> : <ProfileContent />}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block max-w-7xl mx-auto px-6 py-8">
          <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 rounded-3xl shadow-xl overflow-hidden mb-8">
            <div className="p-8 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Image
                  src={ImageCard1}
                  alt={userData?.name || "User"}
                  width={120}
                  height={120}
                  className="w-28 h-28 rounded-full border-4 border-white/30 object-cover shadow-lg"
                />
                <div>
                  <h2 className="text-white text-3xl font-bold mb-1">
                    {userData?.name}
                  </h2>
                  <p className="text-teal-100 mt-2">{userData?.email}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/Booking"
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium backdrop-blur-sm"
                >
                  Umów wizytę
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/80 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-medium"
                >
                  Wyloguj się
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <DashboardContent />
            </div>
            <div className="space-y-6">
              <ProfileContent />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;