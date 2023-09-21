import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
    title: "Nick Malmquist",
    description: "Technical Training for NextJS",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Sidebar />
                {children}
            </body>
        </html>
    );
}
