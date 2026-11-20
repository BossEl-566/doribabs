import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Doribabs School Complex",
  description: "Welcome to Doribabs School Complex, a premier educational institution dedicated to nurturing young minds and fostering academic excellence. Explore our website to learn more about our programs, achievements, and community.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
  <body className={`${roboto.className} ${roboto.variable} antialiased`}>
    {children}
  </body>
</html>
  );
}
