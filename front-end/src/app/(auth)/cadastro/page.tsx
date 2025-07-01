"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { InputEmail, InputNome, InputSenha } from "../../../components/input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface ICadastroForm {
  name: string;
  email: string;
  password: string;
}

export default function Cadastrar() {
  const { register, handleSubmit } = useForm<ICadastroForm>();
  const router = useRouter();

  const { mutate, error } = useMutation({
    mutationFn: async (user: ICadastroForm) => {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || "Erro ao cadastrar",
          errors: data.errors,
        };
      }

      return data;
    },
    onSuccess: () => {
      router.push("/");
      window.alert("Usuário cadastrado com sucesso!")
    },
    meta: {
      messageError: false,
    },
  });

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
        onSubmit={handleSubmit((data) => mutate(data))}
        className="flex flex-col gap-4 w-full justify-center items-center"
      >
        <h1 className="text-2xl">Cadastro</h1>

        <div className="flex flex-col gap-[15px] w-[600px] px-[150px]">
          {error && (
            <p className="p-2 bg-red-100 text-red-700 text-sm rounded text-center">
              {error.message}
            </p>
          )}

          <div className="flex flex-col">
            <label htmlFor="email">Nome</label>
            <InputNome {...register("name")} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">E-mail</label>
            <InputEmail {...register("email")} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="senha">Senha</label>
            <InputSenha {...register("password")} />
          </div>

          <button className="bg-[#3A5B22] hover:bg-[#3a5b22dd] cursor-pointer w-full text-white text-[14px] font-semibold py-[8px] rounded-[12px] mt-[20px]">
            Cadastrar
          </button>
        </div>

        <p className="text-sm">
          Tem uma conta?{" "}
          <Link
            href="/"
            className="text-[#3A5B22] hover:text-[#3a5b22dd] font-semibold no-underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
