import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./css/globals.scss";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import ReduxProvider from "./Components/ReduxProvider";
import QueryProvider from "./Components/QueryProvider";
import Navbar from "./Components/Navbar";


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
    <ClerkProvider>

      <html lang="en">
        <body >
          <ReduxProvider>
            <QueryProvider>
              <Navbar />
              {children}
            </QueryProvider>
          </ReduxProvider>
        </body>
      </html >
    </ClerkProvider >
  );
}
