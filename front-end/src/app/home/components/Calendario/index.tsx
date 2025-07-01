"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Planta {
  id: number;
  name: string;
  created_at: string;
  frequencia: "dia" | "semana" | "mes";
  quantidade_frequencia: number;
}

type CalendarValue = CalendarProps["value"];

function normalizeDate(date: Date): string {
  return date.toISOString().split("T")[0]; 
}

export default function CalendarioHome() {
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [date, setDate] = useState<Date>(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  });

  useEffect(() => {
    async function fetchPlantas() {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/api/planta", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setPlantas(data);
      } else {
        console.error("Erro ao buscar plantas");
      }
    }
    fetchPlantas();
  }, []);

  function onChange(value: CalendarValue) {
    if (value instanceof Date) {
      setDate(new Date(value.getFullYear(), value.getMonth(), value.getDate()));
    } else if (typeof value === "string") {
      setDate(new Date(value));
    } else if (Array.isArray(value) && value.length > 0) {
      const first = value[0];
      if (first) {
        setDate(new Date(first));
      }
    }
  }

  function tileContent({ date, view }: { date: Date; view: string }) {
    if (view !== "month") return null;

    const diaAtual = normalizeDate(date);

    const plantasNoDia = plantas.filter((p) => {
      const dataInicial = new Date(p.created_at);

      for (let i = 0; i < p.quantidade_frequencia; i++) {
        const dataRepetida = new Date(dataInicial);

        if (p.frequencia === "dia") {
          dataRepetida.setDate(dataInicial.getDate() + i);
        } else if (p.frequencia === "semana") {
          dataRepetida.setDate(dataInicial.getDate() + i * 7);
        } else if (p.frequencia === "mes") {
          dataRepetida.setMonth(dataInicial.getMonth() + i);
        }

        if (normalizeDate(dataRepetida) === diaAtual) {
          return true;
        }
      }

      return false;
    });

    if (plantasNoDia.length > 0) {
      return (
        <ul className="text-xs mt-1">
          {plantasNoDia.map((p) => (
            <li key={p.id} className="bg-[#8daf89] rounded py-1 my-0.5">
              {p.name}
            </li>
          ))}
        </ul>
      );
    }

    return null;
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">Calendário</h2>
      <Calendar
        onChange={onChange}
        value={date}
        tileContent={tileContent}
        locale="pt-BR"
      />
    </div>
  );
}
