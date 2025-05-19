"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { InputEmail, InputNome, InputSenha } from "../../components/input";

interface ICadastroForm {
  nome: string;
  email: string;
  senha: string;
}

export default function Cadastrar() {
  const { register, handleSubmit } = useForm<ICadastroForm>();

  return (
    <div className="flex min-h-screen gap-10 w-full">
      <div className="w-full flex justify-center items-center">
        <img
          src="/logo.png"
          alt="Logo do projeto Flora Alert"
          className="w-[500px] h-[500px]"
        />
      </div>

      <form className="flex flex-col gap-4 w-full justify-center items-center">
        <h1 className="text-2xl">Login</h1>

        <div className="flex flex-col gap-[15px] w-[600px] px-[150px]">
          <div className="flex flex-col">
            <label htmlFor="email">Nome</label>
            <InputNome {...register("nome")} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">E-mail</label>
            <InputEmail {...register("email")} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="senha">Senha</label>
            <InputSenha {...register("senha")} />
          </div>

          <button className="bg-[#3A5B22] w-full text-white text-[14px] font-semibold py-[8px] rounded-[12px] mt-[20px]">
            Entrar
          </button>
        </div>

        <p className="text-sm">
          Tem uma conta?{" "}
          <Link href="/" className="text-[#3A5B22] no-underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
