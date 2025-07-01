import React from "react";

export const SelectFrequencia = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function SelectFrequencia(props, ref) {
  return (
    <select
      ref={ref}
      {...props}
      className="border border-gray-400 rounded-[12px] py-[8px] px-[8px] text-gray text-[14px]"
    >
      <option value="dia">Dia</option>
      <option value="semana">Semana</option>
      <option value="mes">Mês</option>
    </select>
  );
});
