"use client";
import {useState} from 'react';
import LogIn from "@/components/LogIn";
import Registration from "@/components/Registration";
import LogoGif from "@/components/LogoGif";


const LoginPage = () => {
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
        <section className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#E6F1E8]">

            {/* Left visual panel: hidden on mobile, shows on md+ */}
            <div
                className={`hidden md:block md:w-[40%] h-[240px] md:h-screen bg-custom5 transition-all duration-500 ease-in-out ${
                    isAnimating ? (isLogin ? 'translate-x-full' : '-translate-x-full') : ''
                } ${isLogin ? 'order-last' : 'order-first'} `}
            >
                <LogoGif />
            </div>

            {/* Form panel: full width on mobile, 60% on desktop */}
            <div className="w-full md:w-[60%] flex flex-col justify-center items-center px-4 py-8 md:px-0 md:py-0 transition-all duration-500 ease-in-out">
                {!isLogin ? (
                    <Registration onToggleForm={toggleForm} />
                ) : (
                    <LogIn onToggleForm={toggleForm} />
                )}

                <footer className="text-center text-sm text-[#167A8B] mt-6">
                    Od 2025© Twórcy: Pavlo Satsyk & Orest Muzyka<br/>
                    <a href="mailto:Appointly.support.team@gmail.com" className="underline hover:text-[#00545E]">
                        Appointly.support.team@gmail.com
                    </a>
                </footer>
            </div>
        </section>
    );
};

export default LoginPage;