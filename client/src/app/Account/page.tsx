'use client'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGOUT_MUTATION, UPDATE_USER_MUTATION } from "@/graphql/mutations";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Pencil, Camera, Clock, Heart, ChevronRight, X, Check } from "lucide-react";
import Link from "next/link";
import ImageCard1 from "@/imgs/ImageCard1.png";

interface UserData {
    id: string
    name: string
    email: string
    dateOfBirth?: string
    phone?: string
    address?: string
}

// Mock data for upcoming appointments (server doesn't have appointments yet Orest TODO)
const mockAppointments = [
    { id: '1', doctorName: 'Dr. Anna Kowalska', specialty: 'Kardiolog', date: '5 Gru, 2025', time: '10:00', status: 'Potwierdzona' },
    { id: '2', doctorName: 'Dr. Michał Nowak', specialty: 'Dermatolog', date: '12 Gru, 2025', time: '14:30', status: 'Oczekująca' },
];

// Mock data for favorite doctors
const mockFavoriteDoctors = [
    { id: '1', name: 'Dr. Anna Kowalska', specialty: 'Kardiolog' },
    { id: '2', name: 'Dr. Ewa Wiśniewska', specialty: 'Pediatra' },
];

const Account: React.FC = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'profile'>('dashboard');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editForm, setEditForm] = useState<Partial<UserData>>({});
    const [saving, setSaving] = useState<boolean>(false);

    // GraphQL mutations
    const [logout] = useMutation(LOGOUT_MUTATION);
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);

    // Load user data from localStorage
    useEffect(() => {
        const loadUserData = () => {
            try {
                setLoading(true);
                const storedUser = localStorage.getItem('user');
                const token = localStorage.getItem('token');

                if (!storedUser || !token) {
                    router.push('/Login');
                    return;
                }

                const user = JSON.parse(storedUser);
                setUserData({
                    ...user,
                    phone: user.phone || '+1 (555) 123-4567',
                    dateOfBirth: user.dateOfBirth || 'January 15, 1990',
                    address: user.address || '123 Main Street, New York, NY 10001'
                });
            } catch (err) {
                console.error("Error loading user data:", err);
                setError("Błąd podczas ładowania danych");
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [router]);

    const handleLogout = async () => {
        try {
            if (userData?.id) {
                await logout({ variables: { userId: userData.id } });
            }
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/');
        }
    };

    const handleEditStart = () => {
        if (userData) {
            setEditForm({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                dateOfBirth: userData.dateOfBirth,
                address: userData.address
            });
            setIsEditing(true);
        }
    };

    const handleEditCancel = () => {
        setIsEditing(false);
        setEditForm({});
    };

    const handleEditSave = async () => {
        if (!userData || !editForm.name) return;
        
        setSaving(true);
        try {
            const result = await updateUser({
                variables: {
                    updateUserInput: {
                        id: userData.id,
                        name: editForm.name,
                        email: editForm.email,
                        dateOfBirth: editForm.dateOfBirth
                    }
                }
            });
            
            const data = result.data as { updateUser?: UserData } | null;
            if (data?.updateUser) {
                const updatedUser = {
                    ...userData,
                    ...editForm,
                    ...data.updateUser
                };
                setUserData(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Update error:", err);
            setError("Błąd podczas aktualizacji danych");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
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
                        <p>{error || "Nie zalogowano"}</p>
                        <button 
                            onClick={() => router.push('/Login')}
                            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg"
                        >
                            Zaloguj się
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const patientId = `#PT-${new Date().getFullYear()}-${userData.id.slice(0, 4).padStart(4, '0')}`;

    // Dashboard Tab Content (Appointments & Favorites)
    const DashboardContent = () => (
        <div className="space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-800 font-bold text-lg">Nadchodzące wizyty</h3>
                    <Link href="/Visits" className="text-teal-600 text-sm font-medium hover:text-teal-700">Zobacz wszystkie</Link>
                </div>
                
                <div className="space-y-4">
                    {mockAppointments.map((apt) => (
                        <div key={apt.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                            <Image src={ImageCard1} alt={apt.doctorName} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-semibold text-slate-800 truncate">{apt.doctorName}</h4>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        apt.status === 'Potwierdzona' ? 'bg-teal-100 text-teal-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {apt.status}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500">{apt.specialty}</p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {apt.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {apt.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Favorite Doctors */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-800 font-bold text-lg">Ulubieni lekarze</h3>
                    <Link href="/Booking" className="text-teal-600 text-sm font-medium hover:text-teal-700">Znajdź więcej</Link>
                </div>
                
                <div className="space-y-3">
                    {mockFavoriteDoctors.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Image src={ImageCard1} alt={doc.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <h4 className="font-medium text-slate-800">{doc.name}</h4>
                                    <p className="text-sm text-slate-500">{doc.specialty}</p>
                                </div>
                            </div>
                            <Heart className="text-red-500 fill-red-500" size={20} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
                <Link href="/Plans" className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
                    <span className="text-slate-700 font-medium">Plany ubezpieczeniowe</span>
                    <ChevronRight size={20} className="text-slate-400" />
                </Link>
                <Link href="/UploadTests" className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
                    <span className="text-slate-700 font-medium">Dokumentacja medyczna</span>
                    <ChevronRight size={20} className="text-slate-400" />
                </Link>
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-red-50 transition-colors"
                >
                    <span className="text-red-600 font-medium">Wyloguj się</span>
                    <ChevronRight size={20} className="text-red-400" />
                </button>
            </div>
        </div>
    );

    // Profile Tab Content (Personal Info)
    const ProfileContent = () => (
        <div className="space-y-4">
            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-800 font-bold text-lg">Dane osobowe</h3>
                    {isEditing ? (
                        <div className="flex gap-2">
                            <button 
                                onClick={handleEditCancel}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <X size={18} />
                            </button>
                            <button 
                                onClick={handleEditSave}
                                disabled={saving}
                                className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors disabled:opacity-50"
                            >
                                <Check size={18} />
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={handleEditStart}
                            className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                        >
                            <Pencil size={18} />
                        </button>
                    )}
                </div>
                
                <div className="space-y-4">
                    {isEditing ? (
                        <>
                            <div className="flex items-start gap-3">
                                <Mail className="text-teal-600 mt-3" size={20} />
                                <div className="flex-1">
                                    <p className="text-teal-600 text-sm mb-1">E-mail</p>
                                    <input
                                        type="email"
                                        value={editForm.email || ''}
                                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <Phone className="text-teal-600 mt-3" size={20} />
                                <div className="flex-1">
                                    <p className="text-teal-600 text-sm mb-1">Telefon</p>
                                    <input
                                        type="tel"
                                        value={editForm.phone || ''}
                                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <Calendar className="text-teal-600 mt-3" size={20} />
                                <div className="flex-1">
                                    <p className="text-teal-600 text-sm mb-1">Data urodzenia</p>
                                    <input
                                        type="text"
                                        value={editForm.dateOfBirth || ''}
                                        onChange={(e) => setEditForm({...editForm, dateOfBirth: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <MapPin className="text-teal-600 mt-3" size={20} />
                                <div className="flex-1">
                                    <p className="text-teal-600 text-sm mb-1">Adres</p>
                                    <input
                                        type="text"
                                        value={editForm.address || ''}
                                        onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-start gap-3">
                                <Mail className="text-teal-600 mt-0.5" size={20} />
                                <div>
                                    <p className="text-teal-600 text-sm">E-mail</p>
                                    <p className="text-slate-800">{userData.email}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <Phone className="text-teal-600 mt-0.5" size={20} />
                                <div>
                                    <p className="text-teal-600 text-sm">Telefon</p>
                                    <p className="text-slate-800">{userData.phone}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <Calendar className="text-teal-600 mt-0.5" size={20} />
                                <div>
                                    <p className="text-teal-600 text-sm">Data urodzenia</p>
                                    <p className="text-slate-800">{userData.dateOfBirth}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <MapPin className="text-teal-600 mt-0.5" size={20} />
                                <div>
                                    <p className="text-teal-600 text-sm">Adres</p>
                                    <p className="text-slate-800">{userData.address}</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            
            {/* Medical Information Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="text-slate-800 font-bold text-lg mb-4">Informacje medyczne</h3>
                
                <div className="mb-4">
                    <p className="text-slate-500 text-sm mb-2">Grupa krwi</p>
                    <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">A+</span>
                </div>
                
                <div className="mb-4">
                    <p className="text-slate-500 text-sm mb-2">Alergie</p>
                    <div className="flex gap-2 flex-wrap">
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Penicylina</span>
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Orzechy</span>
                    </div>
                </div>
                
                <div>
                    <p className="text-slate-500 text-sm mb-2">Choroby przewlekłe</p>
                    <div className="flex gap-2 flex-wrap">
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">Nadciśnienie</span>
                    </div>
                </div>
            </div>
            
            {/* Logout Button */}
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
            {/* Desktop Header */}
            <div className="hidden md:block">
                <Header />
            </div>
            
            {/* Mobile Header with Profile */}
            <div className="md:hidden">
                <Header />
                {/* Back Arrow */}
                <div className="bg-teal-700 pt-2 px-4">
                    <Link href="/" className="inline-flex items-center text-white">
                        <ArrowLeft size={24} />
                    </Link>
                </div>
                
                {/* Profile Section */}
                <div className="bg-teal-700 pb-6 pt-2 flex flex-col items-center">
                    <div className="relative mb-3">
                        <Image 
                            src={ImageCard1} 
                            alt={userData.name || "User profile"}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-full border-4 border-white object-cover"
                        />
                        <button className="absolute bottom-0 right-0 bg-slate-700 p-1.5 rounded-full">
                            <Camera size={12} className="text-white" />
                        </button>
                    </div>
                    <h2 className="text-white text-lg font-bold">{userData.name}</h2>
                    <p className="text-teal-200 text-sm">ID pacjenta: {patientId}</p>
                </div>
            </div>
            
            <main className="flex-1 overflow-y-auto bg-slate-100">
                {/* Mobile Layout */}
                <div className="md:hidden px-4 py-4">
                    {/* Tabs */}
                    <div className="flex bg-white rounded-xl shadow-lg p-1.5 mb-4">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                activeTab === 'dashboard' ? 'bg-teal-600 text-white' : 'text-slate-600'
                            }`}
                        >
                            Pulpit
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                activeTab === 'profile' ? 'bg-teal-600 text-white' : 'text-slate-600'
                            }`}
                        >
                            Profil
                        </button>
                    </div>
                    
                    {activeTab === 'dashboard' ? <DashboardContent /> : <ProfileContent />}
                </div>
                
                {/* Desktop Layout */}
                <div className="hidden md:block max-w-7xl mx-auto px-6 py-8">
                    {/* Profile Header Card - Full Width */}
                    <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 rounded-3xl shadow-xl overflow-hidden mb-8">
                        <div className="p-8 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <Image 
                                        src={ImageCard1} 
                                        alt={userData.name || "User profile"}
                                        width={120}
                                        height={120}
                                        className="w-28 h-28 rounded-full border-4 border-white/30 object-cover shadow-lg"
                                    />
                                    <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full hover:bg-slate-100 transition-colors shadow-md">
                                        <Camera size={16} className="text-teal-600" />
                                    </button>
                                </div>
                                <div>
                                    <h2 className="text-white text-3xl font-bold mb-1">{userData.name}</h2>
                                    <p className="text-teal-200 text-lg">ID pacjenta: {patientId}</p>
                                    <p className="text-teal-100 mt-2">{userData.email}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link href="/Booking" className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-colors backdrop-blur-sm">
                                    Umów wizytę
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-red-500/80 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                                >
                                    Wyloguj się
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Three Column Layout */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Appointments & Favorites */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Upcoming Appointments - Horizontal Cards */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-slate-800 font-bold text-xl">Nadchodzące wizyty</h3>
                                    <Link href="/Visits" className="text-teal-600 text-sm font-medium hover:text-teal-700 flex items-center gap-1">
                                        Zobacz wszystkie <ChevronRight size={16} />
                                    </Link>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    {mockAppointments.map((apt) => (
                                        <div key={apt.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl hover:shadow-md transition-all border border-slate-100">
                                            <Image src={ImageCard1} alt={apt.doctorName} width={56} height={56} className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-slate-800 truncate">{apt.doctorName}</h4>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                        apt.status === 'Potwierdzona' ? 'bg-teal-100 text-teal-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {apt.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-500 mb-2">{apt.specialty}</p>
                                                <div className="flex items-center gap-4 text-sm text-slate-600">
                                                    <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg">
                                                        <Calendar size={14} className="text-teal-600" />
                                                        {apt.date}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg">
                                                        <Clock size={14} className="text-teal-600" />
                                                        {apt.time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Two Sub-columns: Favorites & Medical Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Favorite Doctors */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-slate-800 font-bold text-lg">Ulubieni lekarze</h3>
                                        <Link href="/Booking" className="text-teal-600 text-sm font-medium hover:text-teal-700">Znajdź więcej</Link>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {mockFavoriteDoctors.map((doc) => (
                                            <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <Image src={ImageCard1} alt={doc.name} width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
                                                    <div>
                                                        <h4 className="font-medium text-slate-800">{doc.name}</h4>
                                                        <p className="text-sm text-slate-500">{doc.specialty}</p>
                                                    </div>
                                                </div>
                                                <Heart className="text-red-500 fill-red-500 cursor-pointer hover:scale-110 transition-transform" size={20} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Medical Information */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h3 className="text-slate-800 font-bold text-lg mb-4">Informacje medyczne</h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-slate-500 text-sm mb-2">Grupa krwi</p>
                                            <span className="inline-block bg-teal-100 text-teal-800 px-4 py-1.5 rounded-full text-sm font-semibold">A+</span>
                                        </div>
                                        
                                        <div>
                                            <p className="text-slate-500 text-sm mb-2">Alergie</p>
                                            <div className="flex gap-2 flex-wrap">
                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Penicylina</span>
                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Orzechy</span>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <p className="text-slate-500 text-sm mb-2">Choroby przewlekłe</p>
                                            <div className="flex gap-2 flex-wrap">
                                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">Nadciśnienie</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Column - Personal Info & Quick Actions */}
                        <div className="space-y-6">
                            {/* Personal Information */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-slate-800 font-bold text-lg">Dane osobowe</h3>
                                    {isEditing ? (
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={handleEditCancel}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <X size={18} />
                                            </button>
                                            <button 
                                                onClick={handleEditSave}
                                                disabled={saving}
                                                className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                <Check size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={handleEditStart}
                                            className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                    )}
                                </div>
                                
                                <div className="space-y-4">
                                    {isEditing ? (
                                        <>
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-teal-50 rounded-lg">
                                                    <Mail className="text-teal-600" size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-slate-500 text-xs mb-1">E-mail</p>
                                                    <input
                                                        type="email"
                                                        value={editForm.email || ''}
                                                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-teal-50 rounded-lg">
                                                    <Phone className="text-teal-600" size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-slate-500 text-xs mb-1">Telefon</p>
                                                    <input
                                                        type="tel"
                                                        value={editForm.phone || ''}
                                                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-teal-50 rounded-lg">
                                                    <Calendar className="text-teal-600" size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-slate-500 text-xs mb-1">Data urodzenia</p>
                                                    <input
                                                        type="text"
                                                        value={editForm.dateOfBirth || ''}
                                                        onChange={(e) => setEditForm({...editForm, dateOfBirth: e.target.value})}
                                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-teal-50 rounded-lg">
                                                    <MapPin className="text-teal-600" size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-slate-500 text-xs mb-1">Adres</p>
                                                    <input
                                                        type="text"
                                                        value={editForm.address || ''}
                                                        onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-teal-50 rounded-lg">
                                                    <Mail className="text-teal-600" size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 text-xs">E-mail</p>
                                                    <p className="text-slate-800 font-medium">{userData.email}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-teal-50 rounded-lg">
                                                    <Phone className="text-teal-600" size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 text-xs">Telefon</p>
                                                    <p className="text-slate-800 font-medium">{userData.phone}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-teal-50 rounded-lg">
                                                    <Calendar className="text-teal-600" size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 text-xs">Data urodzenia</p>
                                                    <p className="text-slate-800 font-medium">{userData.dateOfBirth}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-teal-50 rounded-lg">
                                                    <MapPin className="text-teal-600" size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 text-xs">Adres</p>
                                                    <p className="text-slate-800 font-medium">{userData.address}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            
                            {/* Quick Actions */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h3 className="text-slate-800 font-bold text-lg mb-4">Szybkie akcje</h3>
                                <div className="space-y-2">
                                    <Link href="/Plans" className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl hover:from-teal-50 hover:to-teal-100 transition-all group">
                                        <span className="text-slate-700 font-medium group-hover:text-teal-700">Plany ubezpieczenia</span>
                                        <ChevronRight size={20} className="text-slate-400 group-hover:text-teal-600" />
                                    </Link>
                                    <Link href="/UploadTests" className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl hover:from-teal-50 hover:to-teal-100 transition-all group">
                                        <span className="text-slate-700 font-medium group-hover:text-teal-700">Dokumentacja medyczna</span>
                                        <ChevronRight size={20} className="text-slate-400 group-hover:text-teal-600" />
                                    </Link>
                                    <Link href="/Visits" className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl hover:from-teal-50 hover:to-teal-100 transition-all group">
                                        <span className="text-slate-700 font-medium group-hover:text-teal-700">Historia wizyt</span>
                                        <ChevronRight size={20} className="text-slate-400 group-hover:text-teal-600" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default Account;
