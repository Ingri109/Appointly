"use client";
import { useState } from 'react';

const Registration = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleForm = () => {
        setIsAnimating(true);

        setTimeout(() => {
            setIsLogin(!isLogin);
            setIsAnimating(false);
        }, 500);
    };

    return (
        <section className="min-h-screen flex overflow-hidden">

            <div
                className={`transition-all duration-500 ease-in-out ${
                    isAnimating ? (isLogin ? 'translate-x-full' : '-translate-x-full') : ''
                } ${isLogin ? 'order-last' : 'order-first'} w-1/2 h-screen`}
            >
                <img
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjFjOW56dGxnNGhlbmR6dTQ5OTZ4anJqaWhyMHg3aDV2bnE1ZHNwaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Opg1tjjdSUg7oHHa2s/giphy.gif"
                    alt="Motivational GIF"
                    className="w-full h-full object-cover"
                />
            </div>


            <div className="w-1/2 flex flex-col justify-center items-center bg-[#E6F1E8] transition-all duration-500 ease-in-out">
                {!isLogin ? (

                    <>
                        <h1 className="text-5xl font-bold text-[#003147] mb-8">Sign in</h1>

                        <form className="bg-[#3FA1A9] p-8 rounded-xl shadow-lg flex flex-col items-center gap-4">
                            <div className="flex flex-col w-[280px]">
                                <label className="text-white font-bold mb-1">Name&Surname</label>
                                <input
                                    type="text"
                                    name="Name&Surname"
                                    autoComplete="on"
                                    required
                                    className="h-[45px] rounded-lg px-4 bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                                    placeholder="Enter your name & surname"
                                />
                            </div>

                            <div className="flex flex-col w-[280px]">
                                <label className="text-white font-bold mb-1">E-mail</label>
                                <input
                                    type="email"
                                    name="E-mail"
                                    autoComplete="on"
                                    required
                                    className="h-[45px] rounded-lg px-4 bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                                    placeholder="Enter your E-mail"
                                />
                            </div>

                            <div className="flex flex-col w-[280px]">
                                <label className="text-white font-bold mb-1">Password</label>
                                <input
                                    type="password"
                                    name="Password"
                                    autoComplete="on"
                                    required
                                    className="h-[45px] rounded-lg px-4 bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={toggleForm}
                                className="text-[14px] hover:text-[#012E40] mt-2 underline"
                            >
                                Already have an account?
                            </button>

                            <button
                                type="submit"
                                className="bg-[#00545E] hover:bg-[#2D7C88] text-white text-lg font-semibold py-2 px-10 rounded-xl mt-2 hover:scale-105 transition"
                            >
                                Sign In
                            </button>
                        </form>
                    </>
                ) : (

                    <>
                        <h1 className="text-5xl font-bold text-[#003147] mb-8">Log in</h1>

                        <form className="bg-[#3FA1A9] p-8 rounded-xl shadow-lg flex flex-col items-center gap-4">
                            <div className="flex flex-col w-[280px]">
                                <label className="text-white font-bold mb-1">E-mail</label>
                                <input
                                    type="email"
                                    name="E-mail"
                                    autoComplete="on"
                                    required
                                    className="h-[45px] rounded-lg px-4 bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                                    placeholder="Enter your E-mail"
                                />
                            </div>

                            <div className="flex flex-col w-[280px]">
                                <label className="text-white font-bold mb-1">Password</label>
                                <input
                                    type="password"
                                    name="Password"
                                    autoComplete="on"
                                    required
                                    className="h-[45px] rounded-lg px-4 bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={toggleForm}
                                className="text-[14px] hover:text-[#012E40] mt-2 underline"
                            >
                                You don't have an account?
                            </button>

                            <button
                                type="submit"
                                className="bg-[#00545E] hover:bg-[#2D7C88] text-white text-lg font-semibold py-2 px-10 rounded-xl mt-2 hover:scale-105 transition"
                            >
                                Log In
                            </button>
                        </form>
                    </>
                )}

                <footer className="text-center text-sm text-[#167A8B] mt-4">
                    Since 2025© Creators: Pavlo Satsyk & Orest Muzyka<br />
                    <a href="mailto:Appointly.support.team@gmail.com" className="underline hover:text-[#00545E]">
                        Appointly.support.team@gmail.com
                    </a>
                </footer>
            </div>
        </section>
    );
};

export default Registration;