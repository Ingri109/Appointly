"use client";

import { useState } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client/react"; 
import { useRouter } from "next/navigation"; // Використовуємо роутер Next.js

import EyeOpen from "@/icons/eye_open.svg";
import EyeClose from "@/icons/eye_close.svg";
import { REGISTER_MUTATION } from "@/graphql/mutations";

// --- ТИПІЗАЦІЯ ---
interface RegisterData {
  register: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

interface RegisterVars {
  registerInput: {
    email: string;
    password: string;
    name: string;
  };
}

type RegistrationProps = {
  onToggleForm: () => void;
};

const Registration = ({ onToggleForm }: RegistrationProps) => {
  const router = useRouter(); // Ініціалізуємо роутер
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  // Додаємо типи <RegisterData, RegisterVars>
  const [registerUser, { loading }] = useMutation<RegisterData, RegisterVars>(REGISTER_MUTATION, {
    onError: (error) => {
      setMessage(`Error: ${error.message}`);
    },
    onCompleted: (data) => {
      setMessage("Successful registration! Redirecting...");
      
      // 1. ЗБЕРІГАЄМО ТОКЕН
      // Використовуй одну назву ключа всюди (наприклад 'accessToken')
      if (data?.register?.accessToken) {
          localStorage.setItem('accessToken', data.register.accessToken);
      }

      // 2. ОЧИЩЕННЯ ПОЛІВ
      setEmail("");
      setPassword("");
      setFullName("");
      setConfirmPassword("");

      // 3. ПЕРЕАДРЕСАЦІЯ
      // router.push працює без перезавантаження сторінки (швидше)
      router.push('/Account'); 
    },
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Registration...");

    if (confirmPassword !== password) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        variables: {
          registerInput: {
            email: email,
            password: password,
            name: fullName,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <h1 className="text-2xl md:text-5xl font-bold text-custom5 mb-4 md:mb-8 text-center">
        Create your new account
      </h1>

      <form
        onSubmit={handleRegister}
        className="bg-[#3FA1A9] p-6 md:p-8 rounded-xl shadow-lg flex flex-col items-center gap-4"
      >
        <div className="flex flex-col w-[300px] md:w-[280px]">
          <label className="text-custom1 font-bold mb-1">Name & Surname</label>
          <input
            type="text"
            name="Name&Surname"
            autoComplete="on"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
            placeholder="Name & Surname"
          />
        </div>

        <div className="flex flex-col w-[300px] md:w-[280px]">
          <label className="text-custom1 font-bold mb-1">E-mail</label>
          <input
            type="email"
            name="E-mail"
            autoComplete="on"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
            placeholder="E-mail"
          />
        </div>

        <div className="relative flex flex-col w-[300px] md:w-[280px]">
          <label className="text-custom1 font-bold mb-1">Password</label>
          <span
            onClick={togglePasswordVisibility}
            className={"absolute top-7 right-0 p-2 cursor-pointer"}
          >
            <Image
              className={"w-8 h-8 "}
              src={showPassword ? EyeOpen : EyeClose}
              alt={"Open Password"}
            />
          </span>
          <input
            type={showPassword ? "password" : "text"}
            name="Password"
            autoComplete="on"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
            placeholder="Password"
          />
        </div>

        <div className="flex flex-col w-[300px] md:w-[280px]">
          <label className="text-custom1 font-bold mb-1">
            Confirm Password
          </label>
          <input
            type={showPassword ? "password" : "text"}
            name="Confirm Password"
            autoComplete="on"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
            placeholder="Confirm Password"
          />
        </div>

        <button
          type="button"
          onClick={onToggleForm}
          className="text-[14px] hover:text-[#012E40] mt-2 underline"
        >
          Already have an account? Log in
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`bg-[#00545E] hover:bg-[#2D7C88] text-custom1 text-lg font-semibold py-2 px-10 rounded-xl mt-2 hover:scale-105 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>
        <label
          className={
            "break-words text-center text-custom5 text-[14px] font-semibold mt-1 w-[300px]"
          }
        >
          {message}
        </label>
      </form>
    </>
  );
};

export default Registration;