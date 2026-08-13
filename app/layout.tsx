import type { Metadata } from "next";
import { Inter, Bebas_Neue, JetBrains_Mono, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["500"],
  variable: "--font-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dharmaGothic = localFont({
  src: [
    {
      path: "../public/DharmaGothicE_ExLight_R.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/DharmaGothicE_ExLight_I.woff",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/DharmaGothicE_Light_R.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/DharmaGothicE_Light_I.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/DharmaGothicE_Regular_R.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/DharmaGothicE_Regular_I.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/DharmaGothicE_Bold_R.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/DharmaGothicE_ExBold_R.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/DharmaGothicE_ExBold_I.woff",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/DharmaGothicE_Heavy_R.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/DharmaGothicE_Heavy_I.woff",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-dharma",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ultrahuman — Performance Lab",
  description:
    "Experience the Future Of Human Performance with Ultrahuman Performance Lab, Ring AIR, and M1.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} ${dharmaGothic.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
