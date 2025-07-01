"use client";

import { useState } from "react";
import { Header } from "../../components/header";
import FormAddPlanta from "./components/FormAddPlantas";  

export default function Plantas() {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen gap-10 w-full">
      <Header />
      <section className="w-full px-[30px]">
        <div className="flex justify-between">
          <h1 className="text-[24px] font-semibold">Plantas</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-700 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            Adicionar
          </button>
        </div>

        {isModalOpen && <FormAddPlanta onClose={() => setIsModalOpen(false)} />}

        <div></div>
      </section>
    </div>
  );
}
