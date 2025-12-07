"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EyeOpen from "@/icons/eye_open.svg";
import EyeClose from "@/icons/eye_close.svg";
import { LOGIN_MUTATION } from "@/graphql/mutations";

// 2. Інтерфейси для типізації (Дуже важливо для TypeScript)
interface LoginData {
  login: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

interface LoginVars {
  loginInput: {
    email: string;
    password: string;
  };
}

type LogInProps = {
  onToggleForm: () => void;
};

const LogIn = ({ onToggleForm }: LogInProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  // 3. Передаємо Generic типи в useMutation <Data, Variables>
  const [loginUser, { loading }] = useMutation<LoginData, LoginVars>(
    LOGIN_MUTATION,
    {
      onError: (error) => {
        setMessage(error.message || "Błąd logowania");
        console.error(error);
      },
      onCompleted: (data) => {
        if (data?.login?.accessToken) {
          setMessage("Sukces! Przekierowywanie...");

          // Зберігаємо токен та дані користувача
          localStorage.setItem("token", data.login.accessToken);
          localStorage.setItem("user", JSON.stringify(data.login.user));

          // Переходимо на сторінку акаунту
          router.push("/Account");
        } else {
          setMessage("Błąd: Nie otrzymano tokena dostępu");
        }
      },
    }
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Logowanie...");

    try {
      // Тут TypeScript теж перевірить, чи правильно ми передаємо variables
      await loginUser({
        variables: {
          loginInput: {
            email: email,
            password: password,
          },
        },
      });
    } catch (e) {
      // Помилки вже обробляються в onError
      console.error("Submission error:", e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <h1 className="text-2xl md:text-5xl font-bold text-[#003147] mb-4 md:mb-8 text-center">
        Zaloguj się do konta
      </h1>
      <form
        onSubmit={handleLogin}
        className="bg-[#3FA1A9] p-6 md:p-8 rounded-xl shadow-lg flex flex-col items-center gap-4"
      >
        <div className="flex flex-col w-[300px] md:w-[280px]">
          <label className="text-custom1 font-bold mb-1">E-mail</label>
          <input
            type="email"
            name="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
            required
            className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
            placeholder="E-mail"
          />
        </div>

        <div className="relative flex flex-col w-[300px] md:w-[280px]">
          <label className="text-custom1 font-bold mb-1">Hasło</label>
          <span
            onClick={togglePasswordVisibility}
            className={"absolute top-7 right-0 p-2 cursor-pointer"}
          >
            <Image
              className={"w-8 h-8 "}
              src={showPassword ? EyeOpen : EyeClose}
              alt={"Pokaż hasło"}
            />
          </span>
          <input
            type={showPassword ? "password" : "text"}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
            required
            className="h-[45px] rounded-lg px-4 bg-custom1 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00545E]"
            placeholder="Hasło"
          />
        </div>

        <button
          type="button"
          onClick={onToggleForm}
          className="text-[14px] hover:text-[#012E40] mt-2 underline"
        >
          Nie masz konta? Zarejestruj się
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`bg-[#00545E] hover:bg-[#2D7C88] text-custom1 text-lg font-semibold py-2 px-10 rounded-xl mt-2 hover:scale-105 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logowanie..." : "Zaloguj"}
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

export default LogIn;
