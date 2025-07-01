"use client";

import { useForm } from "react-hook-form";
import {
  InputAdubo,
  InputDias,
  InputFrequencia,
  InputNomePlanta,
} from "../../../../components/input";
import Image from "next/image";
import iconClose from "../../../../assets/close.png"

interface IFormPlanta {
  nome: string;
  adubo: string;
  frequencia: number;
  dias: number;
}

interface FormAddPlantaProps {
  onClose: () => void;
}

export default function FormAddPlanta({ onClose }: FormAddPlantaProps) {
  const { register, handleSubmit, reset } = useForm<IFormPlanta>();

  const onSubmit = (data: IFormPlanta) => {
    console.log("Planta adicionada:", data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] rounded-xl p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 cursor-pointer right-4 text-gray-500 text-xl font-bold hover:text-red-500"
        >
          <Image src={iconClose} alt="Fechar" width={20} height={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Adicionar Planta
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label>Nome</label>
            <InputNomePlanta {...register("nome")} />
          </div>

          <div className="flex flex-col">
            <label>Adubo</label>
            <InputAdubo {...register("adubo")} />
          </div>

          <div className="flex flex-col">
            <label>Frequência</label>
            <InputFrequencia {...register("frequencia")} />
          </div>

          <div className="flex flex-col">
            <label>Dias</label>
            <InputDias {...register("dias")} />
          </div>

          <button
            type="submit"
            className="mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}
