import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memory Quest",
  description: "Learn new words everyday",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" expand visibleToasts={2} />
      </body>
    </html>
  );
}
