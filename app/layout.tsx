import type { Metadata } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";

import "@/app/globals.css";
import { MusicPlayer } from "@/processes/MusicPlayer";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codex Luminara",
  description: "A living Renaissance manuscript that journeys through art history in cinematic form.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${ebGaramond.variable}`}>
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
