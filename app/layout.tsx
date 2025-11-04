import "./globals.css";

export const metadata = {
  title: "Glycemic Map",
  description: "Control and recording of glycemie measurements",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <body>{children}</body>
    </html>
  );
}
