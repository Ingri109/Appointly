'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { REGISTER_MUTATION } from '@/graphql/mutations';
import Image from "next/image";
import EyeOpen from "@/icons/eye_open.svg";
import EyeClose from "@/icons/eye_close.svg";

type User = {
    id: string;
    email: string;
    name: string;
};

type RegisterResponse = {
    register: {
        accessToken: string;
        user: User;
    };
};

type RegistrationProps = {
    onToggleForm: () => void;
};

const Registration = ({onToggleForm}: RegistrationProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [register, { loading }] = useMutation<RegisterResponse>(REGISTER_MUTATION);

    const handleRegister = async (e: React.FormEvent) =>{
        e.preventDefault();
        setMessage('Rejestracja...');

        if (confirmPassword !== password) {
            setMessage('Hasła nie są takie same');
            return;
        }

        try {
            const result = await register({
                variables: {
                    registerInput: {
                        email,
                        password,
                        name: fullName
                    }
                }
            });

            if (result.data?.register?.accessToken) {
                setMessage('Rejestracja zakończona pomyślnie!');
                setEmail('');
                setPassword('');
                setFullName('');
                setConfirmPassword('');
                // Optionally auto-login
                localStorage.setItem('token', result.data.register.accessToken);
                localStorage.setItem('user', JSON.stringify(result.data.register.user));
                window.location.href = '/Account';
            }
        } catch (err) {
            console.error(err);
            setMessage('Błąd: Sprawdź dane lub użytkownik już istnieje');
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };
    return (
       <>
           <h1 className="text-2xl md:text-5xl font-bold text-custom5 mb-4 md:mb-8 text-center">Utwórz nowe konto</h1>

           <form onSubmit={handleRegister} className="bg-[#3FA1A9] p-6 md:p-8 rounded-xl shadow-lg flex flex-col items-center gap-4">
               <div className="flex flex-col w-[300px] md:w-[280px]">
                   <label className="text-custom1 font-bold mb-1">Imię i nazwisko</label>
                   <input
                       type="text"
                       name="Name&Surname"
                       value={fullName}
                       autoComplete="on"
                       required
                       onChange={(e) => setFullName(e.target.value)}
                       className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                       placeholder="Imię i nazwisko"
                   />
               </div>

               <div className="flex flex-col w-[300px] md:w-[280px]">
                   <label className="text-custom1 font-bold mb-1">E-mail</label>
                   <input
                       type="email"
                       name="E-mail"
                       value={email}
                       autoComplete="on"
                       required
                       onChange={(e) => setEmail(e.target.value)}
                       className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                       placeholder="E-mail"
                   />
               </div>

               <div className="relative flex flex-col w-[300px] md:w-[280px]">
                   <label className="text-custom1 font-bold mb-1">Hasło</label>
                   <span onClick={togglePasswordVisibility} className={'absolute top-7 right-0 p-2 cursor-pointer'}>
                        <Image className={'w-8 h-8 '} src={showPassword? EyeOpen : EyeClose} alt={'Pokaż hasło'} />
                    </span>
                   <input
                       type={showPassword ? 'password' : 'text'}
                       name="Password"
                       value={password}
                       autoComplete="on"
                       required
                       onChange={(e) => setPassword(e.target.value)}
                       className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                       placeholder="Hasło"
                   />
               </div>

               <div className="flex flex-col w-[300px] md:w-[280px]">
                   <label className="text-custom1 font-bold mb-1">Potwierdź hasło</label>
                   <input
                       type={showPassword ? 'password' : 'text'}
                       name="Confirm Password"
                       value={confirmPassword}
                       autoComplete="on"
                       required
                       onChange={(e) => setConfirmPassword(e.target.value)}
                       className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
                       placeholder="Potwierdź hasło"
                   />
               </div>

               <button
                   type="button"
                   onClick={onToggleForm}
                   className="text-[14px] hover:text-[#012E40] mt-2 underline"
               >
                   Masz już konto? Zaloguj się
               </button>

               <button
                   type="submit"
                   disabled={loading}
                   className="bg-[#00545E] hover:bg-[#2D7C88] text-custom1 text-lg font-semibold py-2 px-10 rounded-xl mt-2 hover:scale-105 transition disabled:opacity-50"
               >
                   {loading ? 'Rejestracja...' : 'Zarejestruj'}
               </button>
               <label className={'break-words text-center text-custom5 text-[14px] font-semibold mt-1 w-[300px]'}>{message}</label>
           </form>
       </>
   )
}

export default Registration