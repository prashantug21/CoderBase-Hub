import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./css/globals.css";
import  Navbar  from "./component/navbar"
// import {NextUIProvider} from "@nextui-org/react"
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
