import React from "react"

export const InputNome =React.forwardRef<HTMLInputElement>( function InputNome(props, ref) {
    return (
      <input
        type="text"
        placeholder="João Santos"
        ref={ref}
        {...props}
        className="border border-gray-400 rounded-[12px] py-[8px] px-[14px] text-gray text-[14px]"
      />
    );
});