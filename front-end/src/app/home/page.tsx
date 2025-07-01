"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../../components/header";
import CalendarioHome from "./components/Calendario";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen gap-10 w-full">
      <Header />
      <section className="w-full flex justify-around">
        <CalendarioHome/>
      </section>
    </div>
  );
}
