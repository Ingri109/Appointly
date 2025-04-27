"use client";
import Menu from "@/components/Menu"
import { useState } from "react";

const Account = () => {
    const count = 16;
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
            <section className="flex-1 px-5 py-3">
                <div className="col-span-3 bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col">

                        <div className="flex items-start mb-8">
                            <div className="flex flex-col items-center">
                                <div className="w-50 h-50 bg-gray-500 rounded-full mb-2"></div>
                                <button className="px-4 py-2 bg-[#3CA6A6] text-[#E4F2E7] rounded-lg text-sm  hover:text-white hover:scale-105 transition">
                                    Change Foto
                                </button>
                            </div>

                            <div className="ml-10 flex-1">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-teal-600 text-xl">Name & Surname:</p>
                                        <h2 className="text-3xl font-bold text-[#012E40]">{userData.name}</h2>
                                    </div>
                                    <button className="px-4 py-2 bg-[#012E40] text-[#FFFFFF] rounded-lg hover:scale-105 transition">
                                        Change Name
                                    </button>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-teal-600 text-lg">E-mail:</p>
                                        <p className="text-lg text-[#012E40]">{userData.email}</p>
                                    </div>
                                    <button className="px-4 py-2 bg-[#012E40] text-[#FFFFFF] rounded-lg hover:scale-105 transition">
                                        Change E-mail
                                    </button>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-teal-600 text-lg">Password:</p>
                                        <p className="text-lg">{userData.password}</p>
                                    </div>
                                    <button className="px-4 py-2 bg-[#012E40] text-[#FFFFFF] rounded-lg hover:scale-105 transition">
                                        Change password
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div>
                            <h3 className="text-[#3CA6A6] text-2xl font-medium mb-4">Adres</h3>
                            <div className="border-t border-b border-black py-4 mb-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <p className="text-teal-600 text-xl font-medium mr-2">Country:</p>
                                        <p className="text-lg text-[#012E40]">{userData.address.country}</p>
                                    </div>

                                    <div className="flex items-center">
                                        <p className="text-teal-600 text-xl font-medium mr-2">City:</p>
                                        <p className="text-lg text-[#012E40]">{userData.address.city}</p>
                                    </div>

                                    <div className="flex items-center">
                                        <p className="text-teal-600 text-xl font-medium mr-2">Street:</p>
                                        <p className="text-lg text-[#012E40]">{userData.address.street}</p>
                                    </div>

                                    <div className="flex items-center">
                                        <p className="text-teal-600 text-xl font-medium mr-2">Zip-code:</p>
                                        <p className="text-lg text-[#012E40]">{userData.address.zipCode}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button className="px-4 py-2 bg-[#012E40] text-[#FFFFFF] rounded-lg hover:scale-105 transition">
                                        Change Adres
                                    </button>
                                </div>
                            </div>


                            <div className="flex justify-start">
                                <button className="text-blue-900 hover:scale-105 transition">
                                    <svg width="45" height="45" viewBox="0 0 48 46" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M33.2304 22.9166C33.2304 22.4608 33.0494 22.0236 32.727 21.7013C32.4047 21.3789 31.9675 21.1979 31.5117 21.1979H6.36524L10.8592 17.3479C11.0307 17.201 11.1717 17.0218 11.2739 16.8205C11.3762 16.6191 11.4379 16.3996 11.4553 16.1745C11.4727 15.9493 11.4457 15.723 11.3756 15.5083C11.3056 15.2936 11.194 15.0948 11.0471 14.9233C10.9002 14.7517 10.721 14.6108 10.5197 14.5085C10.3184 14.4062 10.0989 14.3446 9.87374 14.3272C9.64859 14.3097 9.42222 14.3368 9.20754 14.4068C8.99285 14.4769 8.79407 14.5885 8.62253 14.7354L0.601695 21.6104C0.413011 21.7717 0.261523 21.972 0.157654 22.1975C0.0537848 22.423 0 22.6683 0 22.9166C0 23.1649 0.0537848 23.4102 0.157654 23.6357C0.261523 23.8612 0.413011 24.0615 0.601695 24.2229L8.62253 31.0979C8.96897 31.3945 9.41904 31.5413 9.87374 31.506C10.3284 31.4708 10.7505 31.2564 11.0471 30.9099C11.3437 30.5635 11.4905 30.1134 11.4553 29.6587C11.4201 29.204 11.2056 28.782 10.8592 28.4854L6.36753 24.6354H31.5117C31.9675 24.6354 32.4047 24.4543 32.727 24.1319C33.0494 23.8096 33.2304 23.3724 33.2304 22.9166Z"
                                              fill="#012E40"/>
                                        <path
                                            d="M17.7617 13.75C17.7617 15.3588 17.7617 16.1631 18.149 16.7429C18.3158 16.9922 18.5299 17.2063 18.7792 17.3731C19.359 17.7604 20.1634 17.7604 21.7721 17.7604H31.5117C32.8792 17.7604 34.1908 18.3037 35.1577 19.2706C36.1247 20.2376 36.668 21.5491 36.668 22.9167C36.668 24.2842 36.1247 25.5957 35.1577 26.5627C34.1908 27.5297 32.8792 28.0729 31.5117 28.0729H21.7721C20.1634 28.0729 19.359 28.0729 18.7792 28.4579C18.5297 28.6254 18.3156 28.8403 18.149 29.0904C17.7617 29.6702 17.7617 30.4746 17.7617 32.0833C17.7617 38.5642 17.7617 41.8069 19.7761 43.819C21.7882 45.8333 25.0286 45.8333 31.5094 45.8333H33.8011C40.2865 45.8333 43.5246 45.8333 45.539 43.819C47.5534 41.8069 47.5534 38.5642 47.5534 32.0833V13.75C47.5534 7.26917 47.5534 4.02646 45.539 2.01437C43.5246 0.00229144 40.2842 0 33.8034 0H31.5117C25.0286 0 21.7882 -2.38419e-07 19.7761 2.01437C17.7617 4.02646 17.7617 7.26917 17.7617 13.75Z"
                                            fill="#012E40"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-3 flex flex-col items-center justify-center">
                    <footer className="text-center text-sm text-[#167A8B] mt-4">
                        Since 2025© Creators: Pavlo Satsyk & Orest Muzyka<br />
                        <a href="mailto:Appointly.support.team@gmail.com" className="underline hover:text-[#00545E]">
                            Appointly.support.team@gmail.com
                        </a>
                    </footer>
                </div>
            </section>
        </main>
    );
};

export default Account;