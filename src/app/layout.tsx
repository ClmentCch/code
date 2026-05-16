import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={nunito.className}>
        {/* Wrap the children with ClientProvider to manage session state */}
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
