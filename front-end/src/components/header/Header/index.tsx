"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); 

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer logout");
      }

      return response.json();
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      router.push("/");
    },
    onError: () => {
      localStorage.removeItem("token");
      router.push("/");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const linkClasses = (route: string) =>
    `hover:text-[#ffffff94] pb-1 ${
      pathname === route ? "border-b-2 border-white font-semibold" : ""
    }`;

  return (
    <section className="h-[100px] rounded-b-2xl gap-[50px] bg-[#3A5B22] w-full flex items-center px-[30px]">
      <img
        src="/logo.png"
        alt="Logo do projeto Flora Alert"
        className="w-[64px] h-[64px] rounded-4xl"
      />
      <div className="flex justify-between w-full items-center text-[#fff] ">
        <div className="flex justify-start w-full gap-[20px]">
          <Link href={"/home"} className={linkClasses("/home")}>
            Home
          </Link>
          <Link href={"/plantas"} className={linkClasses("/plantas")}>
            Plantas
          </Link>
        </div>
        <div>
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="text-nowrap hover:text-[#ffffff94] bg-transparent border-none text-white cursor-pointer"
          >
            {logoutMutation.isPending ? "Saindo..." : "Log out"}
          </button>
        </div>
      </div>
    </section>
  );
};
