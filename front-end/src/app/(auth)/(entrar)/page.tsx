"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { InputEmail, InputSenha } from "../../../components/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramRedirect = searchParams.get("redirect") || "/home";

  const { register, handleSubmit } = useForm<ILoginForm>();
  const [loginError, setLoginError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ILoginForm) => {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Erro ao fazer login");
      }

      return resData.data.token;
    },
    onSuccess: (token) => {
      localStorage.setItem("token", token);
      router.push(paramRedirect);
    },
    onError: (error: any) => {
      setLoginError(error.message || "Erro ao fazer login");
    },
  });

  const onSubmit = (data: ILoginForm) => {
    setLoginError(null);
    mutate(data);
  };

  return (
    <div className="flex min-h-screen gap-10 w-full">
      <div className="w-full flex justify-center items-center">
        <img
          src="/logo.png"
          alt="Logo do projeto Flora Alert"
          className="w-[500px] h-[500px]"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full justify-center items-center"
      >
        <h1 className="text-2xl">Login</h1>

        <div className="flex flex-col gap-[15px] w-[600px] px-[150px]">
          {loginError && (
            <p className="p-2 bg-red-100 text-red-700 text-sm rounded text-center">
              {loginError}
            </p>
          )}

          <div className="flex flex-col">
            <label htmlFor="email">E-mail</label>
            <InputEmail {...register("email")} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="senha">Senha</label>
            <InputSenha {...register("password")} />
          </div>

          <button
            type="submit"
            className="bg-[#3A5B22] hover:bg-[#3a5b22dd] cursor-pointer w-full text-white text-[14px] font-semibold py-[8px] rounded-[12px] mt-[20px]"
          >
            Entrar
          </button>
        </div>

        <p className="text-sm">
          Não tem uma conta?{" "}
          <Link
            href="/cadastro"
            className="text-[#3A5B22] hover:text-[#3a5b22dd] font-semibold no-underline"
          >
            Cadastrar
          </Link>
        </p>
      </form>
    </div>
  );
}
