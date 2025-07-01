import React from "react";

export const SelectAdubo = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function SelectAdubo(props, ref) {
  return (
    <select
      ref={ref}
      {...props}
      className="border border-gray-400 rounded-[12px] py-[8px] px-[14px] text-gray text-[14px]"
    >
      <option value="organico">Orgânico</option>
      <option value="organomineral">Organomineral</option>
      <option value="mineral">Mineral</option>
    </select>
  );
});
