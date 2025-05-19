import React, { useState } from "react";
import Image from "next/image";
import visibility from "../../../../public/visibility.png";
import visibilityOff from "../../../../public/visibility_off.png";

export const InputSenha = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function InputSenha(props, ref) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  return (
    <div className="relative flex items-center">
      <input
        type={senhaVisivel ? "text" : "password"}
        placeholder="senha"
        ref={ref}
        {...props}
        className="border border-gray-400 rounded-[12px] py-[8px] px-[14px] text-gray text-[14px] w-full pr-10"
      />

      <button
        type="button"
        onClick={() => setSenhaVisivel(!senhaVisivel)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <Image
          src={senhaVisivel ? visibility : visibilityOff}
          alt="Toggle visibility"
          width={15}
          height={15}
        />
      </button>
    </div>
  );
});
