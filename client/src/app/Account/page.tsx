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
  Camera,
  Clock,
  Heart,
  ChevronRight,
  X,
  Check,
} from "lucide-react";

// Імпорт ваших запитів та мутацій
import { GET_USER_BY_EMAIL } from "@/graphql/queries"; 
import { LOGOUT_MUTATION, UPDATE_USER_MUTATION } from "@/graphql/mutations"; 

// Компоненти
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCard1 from "@/imgs/ImageCard1.png";

// Типи даних
interface UserData {
  id: string;
  name: string;
  email: string;
  dateOfBirth?: string;
  phone?: string;
  address?: string;
}

interface GetUserData {
  user: UserData;
}

// ✅ ДОДАНО: Тип змінних, які ми відправляємо
interface GetUserVars {
  email: string;
}

// Mock data (залишаємо як є, поки немає бекенду для цього)
const mockAppointments = [
  {
    id: "1",
    doctorName: "Dr. Anna Kowalska",
    specialty: "Kardiolog",
    date: "5 Gru, 2025",
    time: "10:00",
    status: "Potwierdzona",
  },
  {
    id: "2",
    doctorName: "Dr. Michał Nowak",
    specialty: "Dermatolog",
    date: "12 Gru, 2025",
    time: "14:30",
    status: "Oczekująca",
  },
];

const Account: React.FC = () => {
  const router = useRouter();
  const client = useApolloClient(); // Для очищення кешу при виході

  // Стани для UI
  const [activeTab, setActiveTab] = useState<"dashboard" | "profile">(
    "dashboard"
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Форма редагування
  const [editForm, setEditForm] = useState<Partial<UserData>>({});

  // 1. Отримуємо email з localStorage лише для ініціалізації запиту
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/Login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.email) {
        setUserEmail(parsedUser.email);
      }
    } catch (e) {
      console.error("Failed to parse user from local storage");
      router.push("/Login");
    }
  }, [router]);

  // 2. Використовуємо useQuery замість useEffect для завантаження даних
  // skip: !userEmail означає, що запит не піде, поки ми не дістанемо email з localStorage
  const { data, loading, error } = useQuery<GetUserData, GetUserVars>(
    GET_USER_BY_EMAIL,
    {
      variables: { email: userEmail || "" },
      skip: !userEmail,
      fetchPolicy: "network-only", // Завжди брати свіжі дані
    }
  );

  // Мутації
  const [logout] = useMutation(LOGOUT_MUTATION);
  const [updateUser, { loading: saving }] = useMutation(UPDATE_USER_MUTATION);

  // Формуємо об'єкт користувача, об'єднуючи дані з сервера та дефолтні значення
  // (оскільки у queries.ts немає phone та address)
  const userData: UserData | null = data?.user
    ? {
        ...data.user,
        phone: data.user.phone || "Numer telefonu", // Mock fallback
        address: data.user.address || "Nie podano", 
        dateOfBirth: data.user.dateOfBirth || "Nie podano"
      }
    : null;

  // --- HANDLERS ---

  const handleLogout = async () => {
    try {
      if (userData?.id) {
        await logout({ variables: { userId: userData.id } }); //
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Очищення всього
      await client.resetStore(); // Важливо! Очищає кеш Apollo
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken"); // На всяк випадок, якщо ви використовуєте це ім'я
      router.push("/");
    }
  };

  const handleEditStart = () => {
    if (userData) {
      setEditForm({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        dateOfBirth: userData.dateOfBirth,
        address: userData.address,
      });
      setIsEditing(true);
    }
  };

  const handleEditSave = async () => {
    if (!userData || !editForm.name) return;

    try {
      console.log(userData.id);
      await updateUser({
        variables: {
          updateUserInput: {
            id: userData.id,
            name: editForm.name,
            email: editForm.email,
            dateOfBirth: editForm.dateOfBirth,
          },
        },
      });

      // Оновлюємо localStorage, щоб при перезавантаженні email не зник
      const updatedLocalStorageUser = { ...userData, ...editForm };
      localStorage.setItem("user", JSON.stringify(updatedLocalStorageUser));

      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      alert("Не вдалося оновити дані. Спробуйте ще раз.");
    }
  };

  // --- RENDERING ---

  if (loading || !userEmail) {
    return (
      <div className="flex flex-col min-h-screen bg-custom1">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Ładowanie danych...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex flex-col min-h-screen bg-custom1">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center text-red-500">
            <p>
              Błąd pobierania danych:{" "}
              {error?.message || "Użytkownik nie znaleziony"}
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                router.push("/Login");
              }}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Wróć do logowania
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const patientId = `#PT-${new Date().getFullYear()}-${userData.id
    .slice(0, 4)
    .padStart(4, "0")}`;

  // --- SUB-COMPONENTS (Dashboard & Profile) ---
  // (Залишаються майже без змін, але використовують userData з query)

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* ... (Ваш код для DashboardContent без змін) ... */}
      {/* Я скоротив цю частину для читабельності, оскільки логіка відображення не змінилася */}
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
          {mockAppointments.map((apt) => (
            // ... rendering appointments
            <div
              key={apt.id}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
            >
              <Image
                src={ImageCard1}
                alt={apt.doctorName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-800 truncate">
                  {apt.doctorName}
                </h4>
                <p className="text-sm text-slate-500">{apt.specialty}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {apt.date}
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
      {/* ... Інші частини Dashboard (Ulubieni lekarze, Quick Actions) ... */}
    </div>
  );

  const ProfileContent = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-800 font-bold text-lg">Dane osobowe</h3>
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 text-slate-400 hover:text-red-600 bg-red-50 rounded-lg"
              >
                <X size={18} />
              </button>
              <button
                onClick={handleEditSave}
                disabled={saving}
                className="p-2 text-slate-400 hover:text-teal-600 bg-teal-50 rounded-lg"
              >
                <Check size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditStart}
              className="p-2 text-slate-400 hover:text-teal-600 bg-teal-50 rounded-lg"
            >
              <Pencil size={18} />
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Name Input (Якщо редагуємо) */}
          {isEditing && (
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-teal-600 text-sm mb-1">Imię i Nazwisko</p>
                <input
                  type="text"
                  value={editForm.name || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="text-teal-600 mt-2" size={20} />
            <div className="flex-1">
              <p className="text-teal-600 text-sm mb-1">E-mail</p>
              {isEditing ? (
                <input
                  type="email"
                  value={editForm.email || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              ) : (
                <p className="text-slate-800">{userData?.email}</p>
              )}
            </div>
          </div>

          {/* Phone (Mocked data handling) */}
          <div className="flex items-start gap-3">
            <Phone className="text-teal-600 mt-2" size={20} />
            <div className="flex-1">
              <p className="text-teal-600 text-sm mb-1">Telefon</p>
              {isEditing ? (
                <input
                  type="tel"
                  value={editForm.phone || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              ) : (
                <p className="text-slate-800">{userData?.phone}</p>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex items-start gap-3">
            <Calendar className="text-teal-600 mt-2" size={20} />
            <div className="flex-1">
              <p className="text-teal-600 text-sm mb-1">Data urodzenia</p>
              {isEditing ? (
                <input
                  type="date" // Змінив на date input для зручності
                  value={editForm.dateOfBirth || "Nie podano"}
                  onChange={(e) =>
                    setEditForm({ ...editForm, dateOfBirth: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              ) : (
                <p className="text-slate-800">{userData?.dateOfBirth}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Medical Info & Logout Button */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="text-slate-800 font-bold text-lg mb-4">
          Informacje medyczne
        </h3>
        <div className="mb-4">
          <p className="text-slate-500 text-sm mb-2">Grupa krwi</p>
          <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
            A+
          </span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full py-3 text-red-600 font-medium bg-white rounded-xl shadow-sm hover:bg-red-50 transition-colors"
      >
        Wyloguj się
      </button>
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
                activeTab === "dashboard"
                  ? "bg-teal-600 text-white"
                  : "text-slate-600"
              }`}
            >
              Pulpit
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg ${
                activeTab === "profile"
                  ? "bg-teal-600 text-white"
                  : "text-slate-600"
              }`}
            >
              Profil
            </button>
          </div>
          {activeTab === "dashboard" ? (
            <DashboardContent />
          ) : (
            <ProfileContent />
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block max-w-7xl mx-auto px-6 py-8">
          {/* Верхня картка профілю для десктопу */}
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
              <DashboardContent />{" "}
              {/* Спрощено, щоб не дублювати код, але тут буде контент дешборду */}
            </div>
            <div className="space-y-6">
              <ProfileContent /> {/* Тут буде сайдбар з даними */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
