'use client'
import Menu from "@/components/Menu"
import { useState } from "react";
import Logout from "@/icons/Logout.svg"
import Image from "next/image";
import { signOut } from 'next-auth/react'


const Account = () => {
    const [userData, setUserData] = useState({
        name: "Jan Kowalski",
        email: "jan.kowal.pl@gmail.com",
        password: "************",
        address: {
            country: "Poland",
            city: "Lublin",
            street: "Czwartakow",
            zipCode: "20-034"
        }
    });

    return (
        <main className="flex">
            <Menu />
            <section className="flex-1 px-5 py-6">
                <div className="col-span-3 bg-white rounded-lg shadow-[0px_0px_12px_4px_rgba(0,0,0,0.30)] p-6">
                    <div className="flex flex-col">

                        <div className="flex items-start mb-8">
                            <div className="flex flex-col items-center">
                                <div className="w-50 h-50 bg-gray-500 rounded-full mb-2"></div>
                                <button className="px-4 py-2 bg-[#3CA6A6] text-[#E4F2E7] rounded-lg text-sm tracking-[0.08em]  hover:text-white hover:scale-105 transition">
                                    Change Foto
                                </button>
                            </div>

                            <div className="ml-10 flex-1">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-custom3 font-semibold text-xl">Name & Surname:</p>
                                        <h2 className="text-3xl font-bold text-custom5">{userData.name}</h2>
                                    </div>
                                    <button className="px-4 py-2 bg-custom5 text-[#FFFFFF] rounded-lg hover:scale-105 transition">
                                        Change Name
                                    </button>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-custom3 font-semibold text-lg">E-mail:</p>
                                        <p className="text-lg font-semibold text-custom5">{userData.email}</p>
                                    </div>
                                    <button className="px-4 py-2 bg-custom5 text-[#FFFFFF] rounded-lg hover:scale-105 transition">
                                        Change E-mail
                                    </button>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-custom3 font-semibold text-lg">Password:</p>
                                        <p className="text-lg font-semibold text-custom5 tracking-[0.08em] ">{userData.password}</p>
                                    </div>
                                    <button className="px-4 py-2 bg-custom5 text-[#FFFFFF] rounded-lg hover:scale-105 transition">
                                        Change password
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-custom2 font-bold text-3xl mb-3">Adres</h3>
                            <div className="border-t border-b border-black py-4 mb-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <p className="text-custom3 font-semibold text-xl mr-2">Country:</p>
                                        <p className="text-lg font-semibold text-custom5">{userData.address.country}</p>
                                    </div>

                                    <div className="flex items-center">
                                        <p className="text-custom3 font-semibold text-xl mr-2">City:</p>
                                        <p className="text-lg font-semibold text-custom5">{userData.address.city}</p>
                                    </div>

                                    <div className="flex items-center">
                                        <p className="text-custom3 font-semibold text-xl mr-2">Street:</p>
                                        <p className="text-lg font-semibold text-custom5">{userData.address.street}</p>
                                    </div>

                                    <div className="flex items-center">
                                        <p className="text-custom3 font-semibold text-xl mr-2">Zip-code:</p>
                                        <p className="text-lg font-semibold text-custom5">{userData.address.zipCode}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button className="px-4 py-2 bg-custom5 text-[#FFFFFF] rounded-lg hover:scale-105 transition">
                                        Change Adres
                                    </button>
                                </div>
                            </div>


                            <div className="flex justify-start">
                                <button onClick={() => signOut({callbackUrl: '/' })} className=" hover:scale-105 transition">
                                    <Image src={Logout} alt={'Buuton Log out'}></Image>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="text-center text-sm text-custom3.2 mt-4">
                    Since 2025© Creators: Pavlo Satsyk & Orest Muzyka<br />
                    <a href="mailto:Appointly.support.team@gmail.com" className="underline hover:text-custom3.1">
                        Appointly.support.team@gmail.com
                    </a>
                </footer>
            </section>
        </main>
    );
};

export default Account;