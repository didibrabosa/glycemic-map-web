import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "./components/Header";

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
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en-US">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
