import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../styles/globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Memory Quest",
    description: "Learn new words everyday",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>{children}</body>
        </html>
    );
}
