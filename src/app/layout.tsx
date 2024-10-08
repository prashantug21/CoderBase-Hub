import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./css/globals.css";
import  Navbar  from "./component/navbar"
import {UserProvider} from "./context/UserContext"
// import {NextUIProvider} from "@nextui-org/react"
const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "CoderBase Hub",
  description: "All coding profiles in one place",
  icons: {
    icon: {
      url: "./logo.svg",
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
        <div className="min-h-screen w-full flex flex-col">
            <Navbar />
            <main className="flex justify-center">{children}</main>
          </div>
        </UserProvider>
        </body>
    </html>
  );
}
