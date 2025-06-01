import Link from "next/link";

export const Footer = () => {
  return (
    <section className="h-[100px] rounded-b-2xl gap-[50px] bg-[#3A5B22] w-full flex items-center px-[30px]">
      <img
        src="/logo.png"
        alt="Logo do projeto Flora Alert"
        className="w-[64px] h-[64px] rounded-4xl"
      />
      <div className="flex justify-between w-full items-center text-[#fff] ">
        <div className="flex justify-start w-full gap-[20px]">
          <Link href={"/home"} className="hover:text-[#ffffff94]">
            Home
          </Link>
          <Link href={"/home"} className="hover:text-[#ffffff94]">
            Plantas
          </Link>
        </div>
        <div>
          <Link href={"/"} className="text-nowrap hover:text-[#ffffff94]">
            Log out
          </Link>
        </div>
      </div>
    </section>
  );
};
