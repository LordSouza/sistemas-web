import React from "react"

export const InputFrequencia =React.forwardRef<HTMLInputElement>( function InputNome(props, ref) {
    return (
      <input
        type="number"
        placeholder="5"
        ref={ref}
        {...props}
        className="border border-gray-400 rounded-[12px] py-[8px] px-[14px] text-gray text-[14px]"
      />
    );
});