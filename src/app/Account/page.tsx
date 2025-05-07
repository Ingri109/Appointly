'use client'
import Menu from "@/components/Menu"
import { useState, useEffect, FormEvent } from "react";
import Logout from "@/icons/Logout.svg"
import Image from "next/image";
import { signOut } from 'next-auth/react'

interface UserData {
    full_name: string
    email: string
    password: string
    country: string
    city: string
    street: string
    zip_code: string
}

interface AddressInputs {
    country: string
    city: string
    street: string
    zip_code: string
}

const Account: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        full_name: "",
        email: "",
        password: "************",
        country: "",
        city: "",
        street: "",
        zip_code: ""
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Edit states
    const [editingName, setEditingName] = useState<boolean>(false);
    const [editingEmail, setEditingEmail] = useState<boolean>(false);
    const [editingPassword, setEditingPassword] = useState<boolean>(false);
    const [editingAddress, setEditingAddress] = useState<boolean>(false);

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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData({
                    full_name: data.full_name || "",
                    email: data.email || "",
                    password: "************",
                    country: data.country || "",
                    city: data.city || "",
                    street: data.street || "",
                    zip_code: data.zip_code || ""
                });
                setNameInput(data.full_name || "");
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

    const handleUpdateName = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ full_name: nameInput }),
            });
            if (!response.ok) throw new Error('Failed to update name');
            const updatedData = await response.json();
            setUserData(prev => ({ ...prev, full_name: updatedData.full_name }));
            setEditingName(false);
        } catch (err: unknown) {
            console.error("Error updating name:", err);
            alert(err instanceof Error ? err.message : 'Failed to update name. Please try again.');
        }
    };

    const handleUpdateEmail = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput }),
            });
            if (!response.ok) throw new Error('Failed to update email');
            const updatedData = await response.json();
            setUserData(prev => ({ ...prev, email: updatedData.email }));
            setEditingEmail(false);
        } catch (err: unknown) {
            console.error("Error updating email:", err);
            alert(err instanceof Error ? err.message : 'Failed to update email. Please try again.');
        }
    };

    const handleUpdatePassword = async (e: FormEvent) => {
        e.preventDefault();
        if (passwordInput !== confirmPasswordInput) {
            alert("Passwords don't match!");
            return;
        }
        try {
            alert("Password updated successfully!");
            setEditingPassword(false);
            setPasswordInput("");
            setConfirmPasswordInput("");
        } catch (err: unknown) {
            console.error("Error updating password:", err);
            alert(err instanceof Error ? err.message : 'Failed to update password. Please try again.');
        }
    };

    const handleUpdateAddress = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addressInputs),
            });
            if (!response.ok) throw new Error('Failed to update address');
            const updatedData = await response.json();
            setUserData(prev => ({
                ...prev,
                country: updatedData.country,
                city: updatedData.city,
                street: updatedData.street,
                zip_code: updatedData.zip_code
            }));
            setEditingAddress(false);
        } catch (err: unknown) {
            console.error("Error updating address:", err);
            alert(err instanceof Error ? err.message : 'Failed to update address. Please try again.');
        }
    };

    if (loading) {
        return (
            <main className="flex">
                <Menu />
                <section className="flex-1 flex items-center justify-center">
                    <p>Loading user data...</p>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex">
                <Menu />
                <section className="flex-1 flex items-center justify-center">
                    <p className="text-red-500">Error loading user data: {error}</p>
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
                                <button className="px-4 py-2 bg-[#3CA6A6] text-[#E4F2E7] rounded-lg text-sm tracking-[0.08em] hover:text-white hover:scale-105 transition">
                                    Change Foto
                                </button>
                            </div>

                            <div className="ml-10 flex-1">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-[#264653] font-semibold text-xl">Name & Surname:</p>
                                        <h2 className="text-3xl font-bold text-[#003049]">{userData.full_name}</h2>
                                    </div>
                                    {!editingName ? (
                                        <button
                                            onClick={() => setEditingName(true)}
                                            className="px-4 py-2 bg-[#003049] text-[#FFFFFF] rounded-lg hover:scale-105 transition"
                                        >
                                            Change Name
                                        </button>
                                    ) : (
                                        <form onSubmit={handleUpdateName} className="w-full mt-2">
                                            <input
                                                type="text"
                                                value={nameInput}
                                                onChange={(e) => setNameInput(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded mb-2"
                                                placeholder="Enter new name"
                                                required
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingName(false)}
                                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-3 py-1 bg-[#003049] text-white rounded"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-[#264653] font-semibold text-lg">E-mail:</p>
                                        <p className="text-lg font-semibold text-[#003049]">{userData.email}</p>
                                    </div>
                                    {!editingEmail ? (
                                        <button
                                            onClick={() => setEditingEmail(true)}
                                            className="px-4 py-2 bg-[#003049] text-[#FFFFFF] rounded-lg hover:scale-105 transition"
                                        >
                                            Change E-mail
                                        </button>
                                    ) : (
                                        <form onSubmit={handleUpdateEmail} className="w-full mt-2">
                                            <input
                                                type="email"
                                                value={emailInput}
                                                onChange={(e) => setEmailInput(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded mb-2"
                                                placeholder="Enter new email"
                                                required
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingEmail(false)}
                                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-3 py-1 bg-[#003049] text-white rounded"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[#264653] font-semibold text-lg">Password:</p>
                                        <p className="text-lg font-semibold text-[#003049] tracking-[0.08em]">{userData.password}</p>
                                    </div>
                                    {!editingPassword ? (
                                        <button
                                            onClick={() => setEditingPassword(true)}
                                            className="px-4 py-2 bg-[#003049] text-[#FFFFFF] rounded-lg hover:scale-105 transition"
                                        >
                                            Change password
                                        </button>
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
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingPassword(false)}
                                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-3 py-1 bg-[#003049] text-white rounded"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[#264653] font-bold text-3xl mb-3">Adres</h3>
                            <div className="border-t border-b border-black py-4 mb-4">
                                {!editingAddress ? (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center">
                                                <p className="text-[#264653] font-semibold text-xl mr-2">Country:</p>
                                                <p className="text-lg font-semibold text-[#003049]">{userData.country}</p>
                                            </div>

                                            <div className="flex items-center">
                                                <p className="text-[#264653] font-semibold text-xl mr-2">City:</p>
                                                <p className="text-lg font-semibold text-[#003049]">{userData.city}</p>
                                            </div>

                                            <div className="flex items-center">
                                                <p className="text-[#264653] font-semibold text-xl mr-2">Street:</p>
                                                <p className="text-lg font-semibold text-[#003049]">{userData.street}</p>
                                            </div>

                                            <div className="flex items-center">
                                                <p className="text-[#264653] font-semibold text-xl mr-2">Zip-code:</p>
                                                <p className="text-lg font-semibold text-[#003049]">{userData.zip_code}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <button
                                                onClick={() => setEditingAddress(true)}
                                                className="px-4 py-2 bg-[#003049] text-[#FFFFFF] rounded-lg hover:scale-105 transition"
                                            >
                                                Change Adres
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
                                                    placeholder="Enter country"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[#264653] font-semibold block mb-1">City:</label>
                                                <input
                                                    type="text"
                                                    value={addressInputs.city}
                                                    onChange={(e) => setAddressInputs({...addressInputs, city: e.target.value})}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                    placeholder="Enter city"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[#264653] font-semibold block mb-1">Street:</label>
                                                <input
                                                    type="text"
                                                    value={addressInputs.street}
                                                    onChange={(e) => setAddressInputs({...addressInputs, street: e.target.value})}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                    placeholder="Enter street"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[#264653] font-semibold block mb-1">Zip-code:</label>
                                                <input
                                                    type="text"
                                                    value={addressInputs.zip_code}
                                                    onChange={(e) => setAddressInputs({...addressInputs, zip_code: e.target.value})}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                    placeholder="Enter zip code"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditingAddress(false)}
                                                className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-3 py-1 bg-[#003049] text-white rounded"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>

                            <div className="flex justify-start">
                                <button onClick={() => signOut({callbackUrl: '/' })} className="hover:scale-105 transition">
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