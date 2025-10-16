import "./globals.css";

export const metadata = {
  title: "Glycemic Map",
  description: "Controle e registro de medições de glicemia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
