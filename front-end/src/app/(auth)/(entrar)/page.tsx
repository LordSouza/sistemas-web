"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { useSearchParams } from "next/navigation";
import { InputEmail, InputSenha } from "../../../components/input";

interface ILoginForm {
  email: string;
  senha: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<ILoginForm>();
  const searchParams = useSearchParams();
  const paramRedirect = searchParams.get("redirect") || "/home";

  const onSubmit = (data: ILoginForm) => {
    console.log("Dados do formulário:", data);
    window.location.href = paramRedirect;
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
          <div className="flex flex-col">
            <label htmlFor="email">E-mail</label>
            <InputEmail {...register("email")} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="senha">Senha</label>
            <InputSenha {...register("senha")} />
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
