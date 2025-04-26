import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "予約システム",
  description: "モダンな予約管理システム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="h-full bg-background text-foreground">
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-primary">予約システム</h1>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
