'use client';

import { useState } from 'react';

type RegistrationProps = {
    onToggleForm: () => void;
};

const Registration = ({onToggleForm}: RegistrationProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) =>{
        e.preventDefault();
        setMessage('Registration...');

        const res = await fetch(`/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, fullName })
        })

        const result = await res.json();

        if (!res.ok) {
            setMessage(`Error: ${result.error}`);
        } else {
            setMessage('Successful registration');
            setEmail('');
            setPassword('');
            setFullName('');
        }
    }
    return (
       <>
           <h1 className="text-5xl font-bold text-custom5 mb-8">Sign in</h1>

           <form onSubmit={handleRegister}  className="bg-[#3FA1A9] p-8 rounded-xl shadow-lg flex flex-col items-center gap-4">
               <div className="flex flex-col w-[280px]">
                   <label className="text-custom1 font-bold mb-1">Name&Surname</label>
                   <input
                       type="text"
                       name="Name&Surname"
                       autoComplete="on"
                       required
                       onChange={(e) => setFullName(e.target.value)}
                       className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                       placeholder="Enter your name & surname"
                   />
               </div>

               <div className="flex flex-col w-[280px]">
                   <label className="text-custom1 font-bold mb-1">E-mail</label>
                   <input
                       type="email"
                       name="E-mail"
                       autoComplete="on"
                       required
                       onChange={(e) => setEmail(e.target.value)}
                       className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                       placeholder="Enter your E-mail"
                   />
               </div>

               <div className="flex flex-col w-[280px]">
                   <label className="text-custom1 font-bold mb-1">Password</label>
                   <input
                       type="password"
                       name="Password"
                       autoComplete="on"
                       required
                       onChange={(e) => setPassword(e.target.value)}
                       className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                       placeholder="Enter your password"
                   />
               </div>

               <button
                   type="button"
                   onClick={onToggleForm}
                   className="text-[14px] hover:text-[#012E40] mt-2 underline"
               >
                   Already have an account?
               </button>

               <button
                   type="submit"
                   className="bg-[#00545E] hover:bg-[#2D7C88] text-custom1 text-lg font-semibold py-2 px-10 rounded-xl mt-2 hover:scale-105 transition"
               >
                   Sign In
               </button>
               <label className={'break-words text-center text-custom5 text-[14px] font-semibold mt-1 w-[300px]'}>{message}</label>
           </form>
       </>
   )
}

export default Registration