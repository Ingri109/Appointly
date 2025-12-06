'use client'
import Menu from "@/components/Menu"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState, useEffect, FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_USER_MUTATION, LOGOUT_MUTATION } from "@/graphql/mutations";
import Logout from "@/icons/Logout.svg"
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserData {
    id: string
    name: string
    email: string
    dateOfBirth?: string
}

interface UpdateUserResponse {
    updateUser: UserData;
}

const Account: React.FC = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [updateStatus, setUpdateStatus] = useState<{ success: boolean, message: string } | null>(null);

    // Edit states
    const [activeEditSection, setActiveEditSection] = useState<string | null>(null);
    const [nameInput, setNameInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");

    // GraphQL mutations
    const [updateUser] = useMutation<UpdateUserResponse>(UPDATE_USER_MUTATION);
    const [logout] = useMutation(LOGOUT_MUTATION);

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
                setUserData(user);
                setNameInput(user.name || "");
                setEmailInput(user.email || "");
            } catch (err) {
                console.error("Error loading user data:", err);
                setError("Błąd podczas ładowania danych");
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [router]);

    const handleStartEditing = (section: string) => {
        setActiveEditSection(section);
        setUpdateStatus(null);

        if (section === 'name') {
            setNameInput(userData?.name || "");
        } else if (section === 'email') {
            setEmailInput(userData?.email || "");
        } else if (section === 'password') {
            setPasswordInput("");
            setConfirmPasswordInput("");
        }
    };

    const handleCancelEdit = () => {
        setActiveEditSection(null);
        setUpdateStatus(null);
    };

    const handleUpdateName = async (e: FormEvent) => {
        e.preventDefault();
        if (!userData) return;

        try {
            setUpdateStatus(null);
            const result = await updateUser({
                variables: {
                    updateUserInput: {
                        id: userData.id,
                        name: nameInput
                    }
                }
            });

            if (result.data?.updateUser) {
                const updatedUser = { ...userData, name: result.data.updateUser.name };
                setUserData(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUpdateStatus({ success: true, message: 'Imię zaktualizowane!' });
                setTimeout(() => {
                    setActiveEditSection(null);
                    setUpdateStatus(null);
                }, 2000);
            }
        } catch (err) {
            console.error("Error updating name:", err);
            setUpdateStatus({ success: false, message: 'Błąd podczas aktualizacji' });
        }
    };

    const handleUpdateEmail = async (e: FormEvent) => {
        e.preventDefault();
        if (!userData) return;

        try {
            setUpdateStatus(null);
            const result = await updateUser({
                variables: {
                    updateUserInput: {
                        id: userData.id,
                        email: emailInput
                    }
                }
            });

            if (result.data?.updateUser) {
                const updatedUser = { ...userData, email: result.data.updateUser.email };
                setUserData(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUpdateStatus({ success: true, message: 'E-mail zaktualizowany!' });
                setTimeout(() => {
                    setActiveEditSection(null);
                    setUpdateStatus(null);
                }, 2000);
            }
        } catch (err) {
            console.error("Error updating email:", err);
            setUpdateStatus({ success: false, message: 'Błąd podczas aktualizacji' });
        }
    };

    const handleUpdatePassword = async (e: FormEvent) => {
        e.preventDefault();
        if (!userData) return;

        if (passwordInput !== confirmPasswordInput) {
            setUpdateStatus({ success: false, message: "Hasła nie są takie same!" });
            return;
        }

        if (passwordInput.length < 6) {
            setUpdateStatus({ success: false, message: "Hasło musi mieć co najmniej 6 znaków" });
            return;
        }

        try {
            setUpdateStatus(null);
            await updateUser({
                variables: {
                    updateUserInput: {
                        id: userData.id,
                        password: passwordInput
                    }
                }
            });

            setUpdateStatus({ success: true, message: 'Hasło zaktualizowane!' });
            setPasswordInput("");
            setConfirmPasswordInput("");
            setTimeout(() => {
                setActiveEditSection(null);
                setUpdateStatus(null);
            }, 2000);
        } catch (err) {
            console.error("Error updating password:", err);
            setUpdateStatus({ success: false, message: 'Błąd podczas aktualizacji hasła' });
        }
    };

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

    if (loading) {
        return (
            <div className="flex min-h-screen bg-custom1">
                <Menu />
                <div className="flex-1 flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-[#3CA6A6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-600">Ładowanie danych...</p>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="flex min-h-screen bg-custom1">
                <Menu />
                <div className="flex-1 flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 flex items-center justify-center">
                        <div className="text-center text-red-500">
                            <p>{error || "Nie zalogowano"}</p>
                            <button 
                                onClick={() => router.push('/Login')}
                                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded"
                            >
                                Zaloguj się
                            </button>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }

    return (
        <main className="flex min-h-screen bg-custom1">
            <Menu />
            <section className="flex-1 px-4 md:px-10 py-6 overflow-y-auto">
                <Header />
                
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-[#264653] mb-8">Moje Konto</h1>

                    <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
                        {/* Name Section */}
                        <div>
                            <h3 className="text-[#264653] font-bold text-xl mb-3">Imię</h3>
                            <div className="border-t border-b border-gray-200 py-4">
                                {activeEditSection !== 'name' ? (
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-semibold text-[#003049]">{userData.name}</p>
                                        <button
                                            onClick={() => handleStartEditing('name')}
                                            disabled={!!activeEditSection}
                                            className="px-4 py-2 bg-[#003049] text-white rounded-lg hover:scale-105 transition disabled:opacity-50"
                                        >
                                            Zmień
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleUpdateName}>
                                        <input
                                            type="text"
                                            value={nameInput}
                                            onChange={(e) => setNameInput(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded mb-3"
                                            placeholder="Nowe imię"
                                            required
                                        />
                                        {updateStatus && (
                                            <p className={`text-sm mb-2 ${updateStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                                                {updateStatus.message}
                                            </p>
                                        )}
                                        <div className="flex gap-2 justify-end">
                                            <button type="button" onClick={handleCancelEdit} className="px-3 py-1 bg-gray-300 rounded">
                                                Anuluj
                                            </button>
                                            <button type="submit" className="px-3 py-1 bg-[#003049] text-white rounded">
                                                Zapisz
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Email Section */}
                        <div>
                            <h3 className="text-[#264653] font-bold text-xl mb-3">E-mail</h3>
                            <div className="border-t border-b border-gray-200 py-4">
                                {activeEditSection !== 'email' ? (
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-semibold text-[#003049]">{userData.email}</p>
                                        <button
                                            onClick={() => handleStartEditing('email')}
                                            disabled={!!activeEditSection}
                                            className="px-4 py-2 bg-[#003049] text-white rounded-lg hover:scale-105 transition disabled:opacity-50"
                                        >
                                            Zmień
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleUpdateEmail}>
                                        <input
                                            type="email"
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded mb-3"
                                            placeholder="Nowy e-mail"
                                            required
                                        />
                                        {updateStatus && (
                                            <p className={`text-sm mb-2 ${updateStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                                                {updateStatus.message}
                                            </p>
                                        )}
                                        <div className="flex gap-2 justify-end">
                                            <button type="button" onClick={handleCancelEdit} className="px-3 py-1 bg-gray-300 rounded">
                                                Anuluj
                                            </button>
                                            <button type="submit" className="px-3 py-1 bg-[#003049] text-white rounded">
                                                Zapisz
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Password Section */}
                        <div>
                            <h3 className="text-[#264653] font-bold text-xl mb-3">Hasło</h3>
                            <div className="border-t border-b border-gray-200 py-4">
                                {activeEditSection !== 'password' ? (
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-semibold text-[#003049]">************</p>
                                        <button
                                            onClick={() => handleStartEditing('password')}
                                            disabled={!!activeEditSection}
                                            className="px-4 py-2 bg-[#003049] text-white rounded-lg hover:scale-105 transition disabled:opacity-50"
                                        >
                                            Zmień
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleUpdatePassword}>
                                        <input
                                            type="password"
                                            value={passwordInput}
                                            onChange={(e) => setPasswordInput(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded mb-3"
                                            placeholder="Nowe hasło"
                                            required
                                        />
                                        <input
                                            type="password"
                                            value={confirmPasswordInput}
                                            onChange={(e) => setConfirmPasswordInput(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded mb-3"
                                            placeholder="Potwierdź hasło"
                                            required
                                        />
                                        {updateStatus && (
                                            <p className={`text-sm mb-2 ${updateStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                                                {updateStatus.message}
                                            </p>
                                        )}
                                        <div className="flex gap-2 justify-end">
                                            <button type="button" onClick={handleCancelEdit} className="px-3 py-1 bg-gray-300 rounded">
                                                Anuluj
                                            </button>
                                            <button type="submit" className="px-3 py-1 bg-[#003049] text-white rounded">
                                                Zapisz
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Logout Button */}
                        <div className="pt-4">
                            <button
                                onClick={handleLogout}
                                disabled={!!activeEditSection}
                                className="hover:scale-105 transition disabled:opacity-50"
                            >
                                <Image src={Logout} alt="Wyloguj" width={40} height={40} />
                            </button>
                        </div>
                    </div>
                </div>

                <footer className="text-center text-sm text-[#264653] mt-8">
                    Od 2025© Twórcy: Pavlo Satsyk & Orest Muzyka<br />
                    <a href="mailto:Appointly.support.team@gmail.com" className="underline hover:text-[#3CA6A6]">
                        Appointly.support.team@gmail.com
                    </a>
                </footer>
            </section>
        </main>
    );
};

export default Account;
