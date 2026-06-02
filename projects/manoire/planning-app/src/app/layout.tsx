import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Le Manoïre - Planning & Équipe",
  description: "Application de gestion d'équipe et planification par IA pour le restaurant Le Manoïre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
