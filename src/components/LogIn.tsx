"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import EyeOpen from "@/icons/eye_open.svg";
import EyeClose from "@/icons/eye_close.svg";
import Image from "next/image";

type LogInProps = {
    onToggleForm: () => void;
};

const LogIn = ({onToggleForm}: LogInProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(true);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Logging')
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setMessage('Login error')
            console.log(res?.error)
        } else {
            window.location.reload();
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <>
            <h1 className="text-5xl font-bold text-[#003147] mb-8">Log in</h1>
            <form  onSubmit={handleLogin} className="bg-[#3FA1A9] p-8 rounded-xl shadow-lg flex flex-col items-center gap-4">
                <div className="flex flex-col w-[280px]">
                    <label className="text-custom1 font-bold mb-1">E-mail</label>
                    <input
                        type="email"
                        name="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="on"
                        required
                        className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                        placeholder="Enter your E-mail"
                    />
                </div>

                <div className="relative flex flex-col w-[280px]">
                    <label className="text-custom1 font-bold mb-1">Password</label>
                    <span onClick={togglePasswordVisibility} className={'absolute top-7 right-0 p-2 cursor-pointer'}>
                        <Image className={'w-8 h-8 '} src={showPassword? EyeOpen : EyeClose} alt={'Open Password'} />
                    </span>
                    <input
                        type={showPassword ? 'password' : 'text'}
                        name="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="on"
                        required
                        className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="button"
                    onClick={onToggleForm}
                    className="text-[14px] hover:text-[#012E40] mt-2 underline"
                >
                    You don`t have an account?
                </button>

                <button
                    type="submit"
                    className="bg-[#00545E] hover:bg-[#2D7C88] text-custom1 text-lg font-semibold py-2 px-10 rounded-xl mt-2 hover:scale-105 transition"
                >
                    Log In
                </button>
                <label className={'break-words text-center text-custom5 text-[14px] font-semibold mt-1 w-[300px]'}>{message}</label>
            </form>
        </>
    )
}

export default LogIn