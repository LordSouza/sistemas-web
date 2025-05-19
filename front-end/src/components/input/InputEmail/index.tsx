import React from "react"

export const InputEmail =React.forwardRef<HTMLInputElement>( function InputEmail(props, ref) {
    return (
      <input
        type="email"
        inputMode="email"
        placeholder="exemplo@gmail.com"
        ref={ref}
        {...props}
        className="border border-gray-400 rounded-[12px] py-[8px] px-[14px] text-gray text-[14px]"
      />
    );
});