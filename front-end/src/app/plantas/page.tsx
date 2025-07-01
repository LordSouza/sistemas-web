"use client";

import { useState } from "react";
import { Header } from "../../components/header";
import FormAddPlanta from "./components/FormAddPlantas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FormEditarPlantas from "./components/FormEditarPlantas";

export default function Plantas() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [plantaParaRemover, setPlantaParaRemover] = useState<null | number>(
    null
  );
  const [plantaParaEditar, setPlantaParaEditar] = useState<null | any>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:8000/api/planta/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir a planta");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plantas"] });
      setPlantaParaRemover(null); // fecha o modal
    },
  });

  const {
    data: plantas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["plantas"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/planta", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar as plantas");
      }

      return response.json();
    },
  });

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["plantas"] });
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col min-h-screen gap-10 w-full">
      <Header />
      <section className="w-full px-[30px] ">
        <div className="flex justify-between">
          <h1 className="text-[24px] font-semibold">Plantas</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-700 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            Adicionar
          </button>
        </div>

        {isModalOpen && (
          <FormAddPlanta
            onClose={() => setIsModalOpen(false)}
            onSucess={handleSuccess}
          />
        )}

        <div className="mt-6">
          {isLoading && <p>Carregando plantas...</p>}
          {error && <p className="text-red-500">Erro ao carregar plantas</p>}

          {plantas && plantas.length > 0 ? (
            <table className="w-full border border-gray-300 rounded-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 border-b border-gray-300">
                    Nome
                  </th>
                  <th className="text-left px-4 py-2 border-b border-gray-300">
                    Adubo
                  </th>
                  <th className="text-left px-4 py-2 border-b border-gray-300">
                    Frequência
                  </th>
                  <th className="text-left px-4 py-2 border-b border-gray-300">
                    Quantidade
                  </th>
                  <th className="text-left px-4 py-2 border-b border-gray-300">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {plantas.map((planta: any) => (
                  <tr
                    key={planta.id}
                    className="hover:bg-gray-50 border-b border-gray-300"
                  >
                    <td className="px-4 py-2 border-gray-300">{planta.name}</td>
                    <td className="px-4 py-2 border-gray-300 capitalize">
                      {planta.adubo}
                    </td>
                    <td className="px-4 py-2 border-gray-300 capitalize">
                      {planta.frequencia}
                    </td>
                    <td className="px-4 py-2 border-gray-300">
                      {planta.quantidade_frequencia}
                    </td>
                    <td className="px-4 py-2 border-gray-300 space-x-8">
                      <button
                        className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        onClick={() => setPlantaParaEditar(planta)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        onClick={() => setPlantaParaRemover(planta.id)}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !isLoading && <p>Nenhuma planta cadastrada ainda.</p>
          )}

          {plantaParaEditar && (
            <FormEditarPlantas
              planta={plantaParaEditar}
              onClose={() => setPlantaParaEditar(null)}
              onSucess={() => {
                setPlantaParaEditar(null);
                queryClient.invalidateQueries({ queryKey: ["plantas"] });
              }}
            />
          )}

          {plantaParaRemover !== null && (
            <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50 ">
              <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg text-center">
                <p className="mb-4 text-gray-700">
                  Tem certeza que deseja remover esta planta?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setPlantaParaRemover(null)}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(plantaParaRemover)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Sim, remover
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
