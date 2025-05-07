'use client'
import Menu from "@/components/Menu"
import { useState, useEffect, FormEvent } from "react";
import Logout from "@/icons/Logout.svg"
import Image from "next/image";
import { signOut } from 'next-auth/react'

interface UserData {
    id: string
    fullName: string
    email: string
    password: string
    country: string
    city: string
    street: string
    zip_code: string
    created_at?: string
    updated_at?: string
}

interface AddressInputs {
    country: string
    city: string
    street: string
    zip_code: string
}

const Account: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        id: "",
        fullName: "",
        email: "",
        password: "************",
        country: "",
        city: "",
        street: "",
        zip_code: ""
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [updateStatus, setUpdateStatus] = useState<{ success: boolean, message: string } | null>(null);

    // Edit states
    const [activeEditSection, setActiveEditSection] = useState<string | null>(null);

    // Form states
    const [nameInput, setNameInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
    const [addressInputs, setAddressInputs] = useState<AddressInputs>({
        country: "",
        city: "",
        street: "",
        zip_code: ""
    });

    // Fetch user data from Supabase through the API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/users');

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch user data');
                }

                const responseData = await response.json();
                const data = responseData.user;

                if (!data) {
                    throw new Error('No user data found');
                }

                setUserData({
                    id: data.id || "",
                    fullName: data.fullName || "",
                    email: data.email || "",
                    password: "************", // Password is always masked
                    country: data.country || "",
                    city: data.city || "",
                    street: data.street || "",
                    zip_code: data.zip_code || ""
                });

                // Initialize form inputs with current data
                setNameInput(data.fullName || "");
                setEmailInput(data.email || "");
                setAddressInputs({
                    country: data.country || "",
                    city: data.city || "",
                    street: data.street || "",
                    zip_code: data.zip_code || ""
                });
            } catch (err: unknown) {
                console.error("Error fetching user data:", err);
                const message = err instanceof Error ? err.message : String(err);
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Helper to handle form editing
    const handleStartEditing = (section: string) => {
        setActiveEditSection(section);
        setUpdateStatus(null);

        // Reset form states to current values
        if (section === 'name') {
            setNameInput(userData.fullName);
        } else if (section === 'email') {
            setEmailInput(userData.email);
        } else if (section === 'password') {
            setPasswordInput("");
            setConfirmPasswordInput("");
        } else if (section === 'address') {
            setAddressInputs({
                country: userData.country,
                city: userData.city,
                street: userData.street,
                zip_code: userData.zip_code
            });
        }
    };

    const handleCancelEdit = () => {
        setActiveEditSection(null);
        setUpdateStatus(null);
    };

    // Handle updating user's name in Supabase
    const handleUpdateName = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setUpdateStatus(null);

            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName: nameInput }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update name');
            }

            const updatedData = await response.json();

            // Update local state with new data
            setUserData(prev => ({
                ...prev,
                fullName: updatedData.user?.fullName || nameInput
            }));

            setUpdateStatus({
                success: true,
                message: 'Name updated successfully!'
            });

            // Close the edit form
            setTimeout(() => {
                setActiveEditSection(null);
                setUpdateStatus(null);
            }, 2000);
        } catch (err: unknown) {
            console.error("Error updating name:", err);
            const message = err instanceof Error ? err.message : 'Failed to update name';
            setUpdateStatus({
                success: false,
                message
            });
        }
    };

    // Handle updating user's email in Supabase
    const handleUpdateEmail = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setUpdateStatus(null);

            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update email');
            }

            const updatedData = await response.json();

            // Update local state with new data
            setUserData(prev => ({
                ...prev,
                email: updatedData.user?.email || emailInput
            }));

            setUpdateStatus({
                success: true,
                message: 'Email updated successfully!'
            });

            // Close the edit form
            setTimeout(() => {
                setActiveEditSection(null);
                setUpdateStatus(null);
            }, 2000);
        } catch (err: unknown) {
            console.error("Error updating email:", err);
            const message = err instanceof Error ? err.message : 'Failed to update email';
            setUpdateStatus({
                success: false,
                message
            });
        }
    };

    // Handle updating user's password in Supabase
    const handleUpdatePassword = async (e: FormEvent) => {
        e.preventDefault();

        if (passwordInput !== confirmPasswordInput) {
            setUpdateStatus({
                success: false,
                message: "Passwords don't match!"
            });
            return;
        }

        if (passwordInput.length < 6) {
            setUpdateStatus({
                success: false,
                message: "Password must be at least 6 characters long"
            });
            return;
        }

        try {
            setUpdateStatus(null);

            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: passwordInput }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update password');
            }

            setUpdateStatus({
                success: true,
                message: 'Password updated successfully!'
            });

            // Reset password fields
            setPasswordInput("");
            setConfirmPasswordInput("");

            // Close the edit form after a delay
            setTimeout(() => {
                setActiveEditSection(null);
                setUpdateStatus(null);
            }, 2000);
        } catch (err: unknown) {
            console.error("Error updating password:", err);
            const message = err instanceof Error ? err.message : 'Failed to update password';
            setUpdateStatus({
                success: false,
                message
            });
        }
    };

    // Handle updating user's address in Supabase
    const handleUpdateAddress = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setUpdateStatus(null);

            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addressInputs),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update address');
            }

            const updatedData = await response.json();

            // Update local state with new data
            setUserData(prev => ({
                ...prev,
                country: updatedData.user?.country || addressInputs.country,
                city: updatedData.user?.city || addressInputs.city,
                street: updatedData.user?.street || addressInputs.street,
                zip_code: updatedData.user?.zip_code || addressInputs.zip_code
            }));

            setUpdateStatus({
                success: true,
                message: 'Address updated successfully!'
            });

            // Close the edit form
            setTimeout(() => {
                setActiveEditSection(null);
                setUpdateStatus(null);
            }, 2000);
        } catch (err: unknown) {
            console.error("Error updating address:", err);
            const message = err instanceof Error ? err.message : 'Failed to update address';
            setUpdateStatus({
                success: false,
                message
            });
        }
    };

    if (loading) {
        return (
            <main className="flex">
                <Menu />
                <section className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-[#3CA6A6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p>Loading user data...</p>
                    </div>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex">
                <Menu />
                <section className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">Error loading user data: {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-[#003049] text-white rounded-lg hover:scale-105 transition"
                        >
                            Try Again
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="flex">
            <Menu />
            <section className="flex-1 px-5 py-6">
                <div className="col-span-3 bg-white rounded-lg shadow-[0px_0px_12px_4px_rgba(0,0,0,0.30)] p-6">
                    <div className="flex flex-col">

                        <div className="flex items-start mb-8">
                            <div className="flex flex-col items-center">
                                <div className="w-48 h-48 bg-gray-500 rounded-full mb-2"></div>
                                <button
                                    className={`px-4 py-2 bg-[#3CA6A6] text-[#E4F2E7] rounded-lg text-sm tracking-[0.08em] 
                                    ${activeEditSection ? 'opacity-50 cursor-not-allowed' : 'hover:text-white hover:scale-105 transition'}`}
                                    disabled={!!activeEditSection}
                                >
                                    Zmień zdjęcie
                                </button>
                            </div>

                            <div className="ml-10 flex-1">
                                {/* Name Section */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-full">
                                        <p className="text-[#264653] font-semibold text-xl">Imię i nazwisko:</p>
                                        {activeEditSection !== 'name' ? (
                                            <h2 className="text-3xl font-bold text-[#003049]">{userData.fullName}</h2>
                                        ) : (
                                            <form onSubmit={handleUpdateName} className="w-full mt-2">
                                                <input
                                                    type="text"
                                                    value={nameInput}
                                                    onChange={(e) => setNameInput(e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                                    placeholder={userData.fullName}
                                                    required
                                                />
                                                {updateStatus && (
                                                    <p className={`text-sm mb-2 ${updateStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                                                        {updateStatus.message}
                                                    </p>
                                                )}
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={handleCancelEdit}
                                                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="px-3 py-1 bg-[#003049] text-white rounded"
                                                    >
                                                        Apply Change
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                    {activeEditSection !== 'name' && (
                                        <button
                                            onClick={() => handleStartEditing('name')}
                                            className={`px-4 py-2 bg-[#003049] text-[#FFFFFF] rounded-lg
                                                ${activeEditSection ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition'}`}
                                            disabled={!!activeEditSection}
                                        >
                                            Zmień
                                        </button>
                                    )}
                                </div>

                                {/* Email Section */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-full">
                                        <p className="text-[#264653] font-semibold text-lg">E-mail:</p>
                                        {activeEditSection !== 'email' ? (
                                            <p className="text-lg font-semibold text-[#003049]">{userData.email}</p>
                                        ) : (
                                            <form onSubmit={handleUpdateEmail} className="w-full mt-2">
                                                <input
                                                    type="email"
                                                    value={emailInput}
                                                    onChange={(e) => setEmailInput(e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                                    placeholder={userData.email}
                                                    required
                                                />
                                                {updateStatus && (
                                                    <p className={`text-sm mb-2 ${updateStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                                                        {updateStatus.message}
                                                    </p>
                                                )}
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={handleCancelEdit}
                                                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="px-3 py-1 bg-[#003049] text-white rounded"
                                                    >
                                                        Apply Change
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                    {activeEditSection !== 'email' && (
                                        <button
                                            onClick={() => handleStartEditing('email')}
                                            className={`px-4 py-2 bg-[#003049] text-[#FFFFFF] rounded-lg
                                                ${activeEditSection ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition'}`}
                                            disabled={!!activeEditSection}
                                        >
                                            Zmień
                                        </button>
                                    )}
                                </div>

                                {/* Password Section */}
                                <div className="flex justify-between items-center">
                                    <div className="w-full">
                                        <p className="text-[#264653] font-semibold text-lg">Hasło:</p>
                                        {activeEditSection !== 'password' ? (
                                            <p className="text-lg font-semibold text-[#003049] tracking-[0.08em]">**************</p>
                                        ) : (
                                            <form onSubmit={handleUpdatePassword} className="w-full mt-2">
                                                <input
                                                    type="password"
                                                    value={passwordInput}
                                                    onChange={(e) => setPasswordInput(e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                                    placeholder="Enter new password"
                                                    required
                                                />
                                                <input
                                                    type="password"
                                                    value={confirmPasswordInput}
                                                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                                    placeholder="Confirm new password"
                                                    required
                                                />
                                                {updateStatus && (
                                                    <p className={`text-sm mb-2 ${updateStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                                                        {updateStatus.message}
                                                    </p>
                                                )}
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={handleCancelEdit}
                                                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="px-3 py-1 bg-[#003049] text-white rounded"
                                                    >
                                                        Apply Change
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                    {activeEditSection !== 'password' && (
                                        <button
                                            onClick={() => handleStartEditing('password')}
                                            className={`px-4 py-2 bg-[#003049] text-[#FFFFFF] rounded-lg
                                                ${activeEditSection ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition'}`}
                                            disabled={!!activeEditSection}
                                        >
                                            Zmień
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div>
                            <h3 className="text-[#264653] font-bold text-3xl mb-3">Address</h3>
                            <div className="border-t border-b border-black py-4 mb-4">
                                {activeEditSection !== 'address' ? (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center">
                                                <p className="text-[#264653] font-semibold text-xl mr-2">Country:</p>
                                                <p className="text-lg font-semibold text-[#003049]">{userData.country || "-"}</p>
                                            </div>

                                            <div className="flex items-center">
                                                <p className="text-[#264653] font-semibold text-xl mr-2">City:</p>
                                                <p className="text-lg font-semibold text-[#003049]">{userData.city || "-"}</p>
                                            </div>

                                            <div className="flex items-center">
                                                <p className="text-[#264653] font-semibold text-xl mr-2">Street:</p>
                                                <p className="text-lg font-semibold text-[#003049]">{userData.street || "-"}</p>
                                            </div>

                                            <div className="flex items-center">
                                                <p className="text-[#264653] font-semibold text-xl mr-2">Zip-code:</p>
                                                <p className="text-lg font-semibold text-[#003049]">{userData.zip_code || "-"}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <button
                                                onClick={() => handleStartEditing('address')}
                                                className={`px-4 py-2 bg-[#003049] text-[#FFFFFF] rounded-lg 
                                                    ${activeEditSection ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition'}`}
                                                disabled={!!activeEditSection}
                                            >
                                                Zmień adres
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <form onSubmit={handleUpdateAddress} className="w-full">
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="text-[#264653] font-semibold block mb-1">Country:</label>
                                                <input
                                                    type="text"
                                                    value={addressInputs.country}
                                                    onChange={(e) => setAddressInputs({...addressInputs, country: e.target.value})}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                    placeholder={userData.country || "Enter country"}
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[#264653] font-semibold block mb-1">City:</label>
                                                <input
                                                    type="text"
                                                    value={addressInputs.city}
                                                    onChange={(e) => setAddressInputs({...addressInputs, city: e.target.value})}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                    placeholder={userData.city || "Enter city"}
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[#264653] font-semibold block mb-1">Street:</label>
                                                <input
                                                    type="text"
                                                    value={addressInputs.street}
                                                    onChange={(e) => setAddressInputs({...addressInputs, street: e.target.value})}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                    placeholder={userData.street || "Enter street"}
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[#264653] font-semibold block mb-1">Zip-code:</label>
                                                <input
                                                    type="text"
                                                    value={addressInputs.zip_code}
                                                    onChange={(e) => setAddressInputs({...addressInputs, zip_code: e.target.value})}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                    placeholder={userData.zip_code || "Enter zip code"}
                                                />
                                            </div>
                                        </div>

                                        {updateStatus && (
                                            <p className={`text-sm mb-2 ${updateStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                                                {updateStatus.message}
                                            </p>
                                        )}

                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={handleCancelEdit}
                                                className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-3 py-1 bg-[#003049] text-white rounded"
                                            >
                                                Apply Change
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>

                            <div className="flex justify-start">
                                <button
                                    onClick={() => signOut({callbackUrl: '/' })}
                                    className={`hover:scale-105 transition ${activeEditSection ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!!activeEditSection}
                                >
                                    <Image src={Logout} alt={'Button Log out'}></Image>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="text-center text-sm text-[#264653] mt-4">
                    Since 2025© Creators: Pavlo Satsyk & Orest Muzyka<br />
                    <a href="mailto:Appointly.support.team@gmail.com" className="underline hover:text-[#3CA6A6]">
                        Appointly.support.team@gmail.com
                    </a>
                </footer>
            </section>
        </main>
    );
};

export default Account;