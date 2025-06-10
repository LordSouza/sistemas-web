import React from "react";
import { Poppins } from "next/font/google";
import "./global.css";
import CoreProvider from "../components/core-provider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.className} antialiased`}>
        <CoreProvider>{children}</CoreProvider>
      </body>
    </html>
  );
}
